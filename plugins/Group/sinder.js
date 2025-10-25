let handler = async (m, { conn, text }) => {
  if (!m.isGroup) return conn.reply(m.chat, '❌ Hanya bisa dijalankan di grup!', m)

  await conn.sendPresenceUpdate('composing', m.chat)

  let groupMetadata = await conn.groupMetadata(m.chat)
  let member = groupMetadata.participants.map(v => v.id)

  const lama = 86400000 * 7 // 7 hari dalam milidetik
  const now = new Date().toLocaleString("en-US", { timeZone: "Asia/Jakarta" })
  const milliseconds = new Date(now).getTime()

  let pesan = text || "Harap aktif di grup karena akan ada pembersihan member setiap saat"
  let total = 0
  let sider = []

  for (let id of member) {
    let userDb = global.db.data.users[id]
    let users = groupMetadata.participants.find(u => u.id === id) || {}

    let lastSeen = userDb?.lastseen || 0
    let isInactive = (milliseconds - lastSeen > lama)
    let isBanned = userDb?.banned === true

    if ((!userDb || isInactive) && !users?.admin && !users?.isSuperAdmin) {
      if (userDb && isBanned) {
        total++
        sider.push(id)
      } else if (!userDb) {
        total++
        sider.push(id)
      }
    }
  }

  if (total === 0) {
    return conn.reply(m.chat, `✅ Tidak ada anggota yang terdeteksi sebagai sider.`, m)
  }

  let groupName = await conn.getName(m.chat)
  let listSider = sider.map(v => {
    let last = global.db.data.users[v]?.lastseen || 0
    return `○ @${v.split('@')[0]} (${msToDate(milliseconds - last)})`
  }).join('\n')

  conn.reply(m.chat, `*${total}/${member.length}* anggota grup *${groupName}* terdeteksi sebagai *sider* dengan kriteria:\n1. Tidak aktif selama lebih dari 7 hari\n2. Baru join tapi tidak pernah nimbrung\n\n_“${pesan}”_\n\n*LIST SIDER :*\n${listSider}`, m, {
    contextInfo: {
      mentionedJid: sider
    }
  })
}

handler.help = ['gcsider']
handler.tags = ['group']
handler.command = /^(gcsider|sider|getsider)$/i
handler.group = true
handler.admin = true

export default handler

function msToDate(ms) {
  let d = isNaN(ms) ? '--' : Math.floor(ms / 86400000)
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000) % 24
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  if (d === 0 && h === 0 && m === 0) return "Baru Saja"
  return `${String(d).padStart(2, '0')}H ${String(h).padStart(2, '0')}J`
}