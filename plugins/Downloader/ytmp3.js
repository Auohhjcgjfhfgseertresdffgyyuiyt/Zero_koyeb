import { oceansaver } from '../../lib/ocean.js'
import savetube from '../../lib/savetube.js'

async function ytdownloader(url, format = 'mp3') {
  try {
    const result = await oceansaver(url, format)
    return { ...result, from: 'oceansaver' }
  } catch (e) {
    console.warn('[OceanSaver gagal]', e.message)
  }

  try {
    const result = await savetube.download(url, format)
    if (!result.status || !result.result?.download) throw 'Invalid response'
    return {
      title: result.result.title,
      thumbnail: result.result.thumbnail,
      link: result.result.download,
      from: 'savetube'
    }
  } catch (e) {
    console.warn('[SaveTube gagal]', e.message)
    throw '❌ Gagal mengunduh dari semua server.'
  }
}

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text || !/^https?:\/\/(www\.)?(youtube\.com|youtu\.be)\//i.test(text))
    throw `Masukkan URL YouTube!\nContoh: *${usedPrefix + command}* https://youtu.be/dQw4w9WgXcQ`

  await m.reply('🎧 Mengambil audio...')

  try {
    const res = await ytdownloader(text, 'mp3')

    await conn.sendMessage(m.chat, {
      audio: { url: res.link },
      mimetype: 'audio/mpeg',
      fileName: res.title.replace(/[^\w\-\.]/g, '_') + '.mp3',
      ptt: false,
      contextInfo: {
        externalAdReply: {
          title: res.title,
          body: `MP3 via ${res.from}`,
          thumbnailUrl: res.thumbnail,
          sourceUrl: text,
          mediaType: 1,
          renderLargerThumbnail: true
        }
      }
    }, { quoted: m })

    await m.reply('✅ Audio berhasil dikirim!')
  } catch (e) {
    console.error(e)
    throw e.toString()
  }
}

handler.help = ['ytmp3 <url>']
handler.tags = ['downloader']
handler.command = /^ytmp3$/i
handler.register = true
handler.limit = true
export default handler