import yt from 'yt-search'
import fetch from 'node-fetch'
import { fileTypeFromBuffer } from 'file-type'
import savetube from '../../lib/savetube.js'
import { oceansaver } from '../../lib/ocean.js'

async function fetchAudioBuffer(link) {
  const res = await fetch(link)
  if (!res.ok) throw '❌ Gagal mengakses file audio.'
  const buffer = await res.buffer()
  if (buffer.length < 10000) throw '❌ File audio terlalu kecil.'
  const type = await fileTypeFromBuffer(buffer)
  if (!type || !type.mime.startsWith('audio/')) throw '❌ File bukan audio.'
  return { buffer, type }
}

async function tryDownload(url, source = 'savetube') {
  try {
    if (source === 'savetube') {
      const res = await savetube.download(url, 'mp3')
      const info = res.result
      const { buffer, type } = await fetchAudioBuffer(info.download)
      return {
        buffer,
        title: info.title,
        thumbnail: info.thumbnail,
        filename: info.title.replace(/[^\w\-\.]/g, '_') + '.' + type.ext,
        mimetype: type.mime,
        source: 'SaveTube'
      }
    }

    if (source === 'oceansaver') {
      const res = await oceansaver(url, 'mp3')
      const { buffer, type } = await fetchAudioBuffer(res.link)
      return {
        buffer,
        title: res.title,
        thumbnail: res.thumbnail,
        filename: res.title.replace(/[^\w\-\.]/g, '_') + '.' + type.ext,
        mimetype: type.mime,
        source: 'OceanSaver'
      }
    }
  } catch (e) {
    console.warn(`[${source} gagal]`, e)
    return null
  }
}

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `Masukkan judul lagu!\nContoh: *${usedPrefix + command}* dj tirani`

  await m.reply('🔍 Mencari lagu...')
  try {
    const search = await yt.search(text)
    const video = search.videos[0]
    if (!video) throw '❌ Video tidak ditemukan.'

    await m.reply('🎧 Mengunduh audio...')

    let audio = await tryDownload(video.url, 'savetube')
    if (!audio) audio = await tryDownload(video.url, 'oceansaver')
    if (!audio) throw '❌ Terjadi kesalahan saat mengambil lagu, coba lagi nanti.'

    await conn.sendMessage(m.chat, {
      audio: audio.buffer,
      mimetype: audio.mimetype,
      fileName: audio.filename,
      ptt: false,
      contextInfo: {
        externalAdReply: {
          title: audio.title,
          body: `Play via ${audio.source}`,
          thumbnailUrl: audio.thumbnail,
          sourceUrl: video.url,
          mediaType: 1,
          renderLargerThumbnail: true
        }
      }
    }, { quoted: m })

    await m.reply('✅ Lagu berhasil dikirim!')
  } catch (e) {
    console.error(e)
    throw typeof e === 'string' ? e : '❌ Gagal memproses permintaan.'
  }
}

handler.help = ['play <judul>']
handler.tags = ['downloader']
handler.command = /^play$/i
handler.register = true
handler.limit = true

export default handler