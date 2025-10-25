let handler = async (m, { conn, usedPrefix, command, text }) => {
  if (!m.isGroup) return m.reply('Fitur ini hanya bisa digunakan di grup!');
  if (!text) return m.reply(`Contoh: ${usedPrefix + command} pengcoli`);

  let groupMetadata = await conn.groupMetadata(m.chat).catch(() => null)
  if (!groupMetadata?.participants) return m.reply('Gagal mengambil data grup. Pastikan bot adalah admin!')

  let user = db.data.users
  let participants = groupMetadata.participants.map(p => p.id).filter(Boolean)

  if (participants.length < 10)
    return m.reply('Minimal harus ada 10 anggota grup!');

  // Ambil 10 peserta unik secara acak
  let top10 = []
  while (top10.length < 10) {
    let id = pickRandom(participants)
    if (!top10.includes(id)) top10.push(id)
  }

  let emoji = pickRandom(['😨', '😅', '😂', '😳', '😎', '🥵', '😱', '🐦', '🙄', '🐤', '🗿', '🤨', '🥴', '😐', '👆', '😔', '👀', '👎'])

  let top = `*${emoji} Top 10 ${text} ${emoji}*\n\n`
  for (let i = 0; i < 10; i++) {
    let id = top10[i]
    let name = user?.[id]?.registered ? user[id].name : await conn.getName(id)
    top += `*${i + 1}. ${name}*\n`
  }

  m.reply(top.trim())
}

handler.help = ['top']
handler.tags = ['fun']
handler.command = /^top$/i
handler.group = true
export default handler

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)]
}