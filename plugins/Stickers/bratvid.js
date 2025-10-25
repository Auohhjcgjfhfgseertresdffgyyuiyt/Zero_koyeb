import axios from 'axios';

// Daftar API fallback
const apis = [
  (q) => `https://fastrestapis.fasturl.cloud/maker/brat/animated?text=${encodeURIComponent(q)}&mode=animated`,
  (q) => `https://aqul-bratvid.hf.space/?text=${encodeURIComponent(q)}`,
  (q) => `https://velyn.vercel.app/api/maker/bratvid?text=${encodeURIComponent(q)}&mode=animated`,
  (q) => `https://apizell.web.id/tools/bratvid?q=${encodeURIComponent(q)}`
];

const tryFetchBuffer = async (q) => {
  for (const api of apis) {
    const url = api(q);
    try {
      const { data } = await axios.get(url, { responseType: 'arraybuffer' });
      return Buffer.from(data);
    } catch (err) {
      console.log(`Gagal dari: ${url} -> ${err.message}`);
    }
  }
  throw new Error("Semua API gagal dijalankan.");
};

let handler = async (m, { q, conn, command, setReply, usedPrefix }) => {
  setReply("Sedang diproses, tunggu sebentar...");
  if (!q) return m.reply(`Kirim perintah ${usedPrefix + command} text\ncontoh: ${usedPrefix + command} ${setting.botName}`);

  try {
    const result = await tryFetchBuffer(q);
    conn.toSticker(m.chat, result, m);
  } catch (e) {
    m.reply("Gagal mendapatkan stiker animasi dari semua API.");
  }
};

handler.help = ["bratvid"];
handler.tags = ["tools"];
handler.command = ["bratvid"];

export default handler;