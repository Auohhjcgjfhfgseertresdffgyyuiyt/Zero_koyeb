 import { mongoDB } from '../modules/mongoDB.js';

const isRegistered = (user) => {
  return user?.name || user?.registered || user?.premiumTime;
};

export async function getUser(jid) {
  if (!jid) return null;

  // Cek lokal dulu
  if (global.db?.data?.users?.[jid]) {
    return global.db.data.users[jid];
  }

  // Kalau ada MongoDB, cek di sana
  if (global.mongodb && typeof global.mongodb === 'string') {
    const mongo = new mongoDB(global.mongodb, global.dbName);
    await mongo.read();
    return mongo.data?.users?.[jid] || null;
  }

  return null;
}

export async function saveUser(jid, userData = {}) {
  if (!jid || typeof jid !== 'string') return;

  const reg = isRegistered(userData);

  if (reg && global.mongodb && typeof global.mongodb === 'string') {
    const mongo = new mongoDB(global.mongodb, global.dbName);
    await mongo.read();
    mongo.data ||= {};
    mongo.data.users ||= {};
    mongo.data.users[jid] = userData;
    await mongo.write();

    // Pastikan dihapus dari local JSON
    if (global.db?.data?.users?.[jid]) {
      delete global.db.data.users[jid];
      await global.db.write();
    }
  } else {
    global.db.data ||= {};
    global.db.data.users ||= {};
    global.db.data.users[jid] = userData;
    await global.db.write();
  }
}


export async function getChat(chatId) {
  // Prioritas: dari global.db (lokal JSON)
  if (global.db.data.chats?.[chatId]) {
    return global.db.data.chats[chatId];
  }

  // Kalau Mongo aktif, cari di Mongo
  if (global.mongodb && typeof global.mongodb === 'string') {
    const mongo = new mongoDB(global.mongodb, global.dbName);
    await mongo.read();

    if (mongo.data.chats?.[chatId]) {
      // Simpan juga ke JSON lokal agar bisa cache
      global.db.data.chats[chatId] = mongo.data.chats[chatId];
      return mongo.data.chats[chatId];
    }
  }

  return null;
}

export async function saveChat(chatId, data) {
  // Simpan ke JSON lokal
  global.db.data.chats[chatId] = data;

  // Simpan ke MongoDB hanya jika expired !== 0
  if (data?.expired && data.expired !== 0 && global.mongodb) {
    const mongo = new mongoDB(global.mongodb, global.dbName);
    await mongo.read();

    mongo.data.chats ||= {};
    mongo.data.chats[chatId] = data;

    await mongo.write(); // Simpan perubahan
  }
}
