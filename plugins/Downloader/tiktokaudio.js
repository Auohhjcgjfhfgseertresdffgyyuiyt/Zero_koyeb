import { ttdl } from 'ruhend-scraper'

let handler = async (m, { command, q, conn, prefix, setReply }) => {
  if (!q || !q.startsWith("https://") || !q.includes('tiktok'))
    return setReply(`Linknya?\nContoh: ${prefix + command} https://vt.tiktok.com/ZSjn1h8my/`)
  setReply(mess.wait)

  try {
    const { music } = await ttdl(q)

    const res = await fetch(music)
    const arrayBuffer = await res.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    if (!buffer || buffer.length === 0) return m.reply('❌ Gagal mengunduh audio.')

    await conn.sendMessage(m.chat, {
      audio: buffer,
      mimetype: 'audio/mpeg'
    }, { quoted: m })

  } catch (e) {
    console.error(e)
    m.reply('❌ Terjadi kesalahan saat mengambil audio.')
  }
}

handler.help = ["ttaudio"]
handler.tags = ["downloader"]
handler.command = ["ttaudio", "ttmp3", "tiktokaudio", "tiktokmusik"]

export default handler