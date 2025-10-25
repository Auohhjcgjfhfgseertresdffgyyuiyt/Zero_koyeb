let handler = async (m, { conn, isRowner }) => {
  let _muptime

  if (process.send) {
    process.send('uptime')
    _muptime = await new Promise(resolve => {
      process.once('message', resolve)
      setTimeout(() => resolve(process.uptime()), 1000)
    }) * 1000
  } else {
    _muptime = process.uptime() * 1000
  }

  let muptime = clockString(_muptime)
  conn.sendMessage(m.chat, {
    text: `Aktif Selama: ${muptime}`,
    contextInfo: {
      externalAdReply: {
        title: `Runtime ${muptime}`,
        body: "✔ Online",
        thumbnailUrl: "https://telegra.ph/file/3fac5f6e38249f912435e.jpg",
        sourceUrl: "https://chat.whatsapp.com/KdB6LAIqGY871MzP89om45",
        mediaType: 1,
        renderLargerThumbnail: true
      }
    }
  })
}
handler.command = /^(p|bot|zero)$/i
export default handler

function clockString(ms) {
  let d = isNaN(ms) ? '--' : Math.floor(ms / 86400000)
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000) % 24
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return `${d.toString().padStart(2, '0')} Hari ${h.toString().padStart(2, '0')} Jam ${m.toString().padStart(2, '0')} Menit ${s.toString().padStart(2, '0')} Detik`
}