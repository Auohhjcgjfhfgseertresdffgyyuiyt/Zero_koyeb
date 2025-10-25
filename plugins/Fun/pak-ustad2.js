let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) return m.reply(`Example :\n${usedPrefix + command} Makan Sambil Kuyang Bisa Gak Pak Ustad`)
  
  await conn.sendMessage(m.chat, {
    image: { url: 'https://api.taka.my.id/pak-ustadv2?text=' + encodeURIComponent(text) }
  }, { quoted: m })
}
 
handler.command = ['pak-ustad2']
handler.tags = ['fun']
handler.help = ['pak-ustad2']
 
export default handler