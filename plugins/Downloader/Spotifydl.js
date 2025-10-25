let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text || !text.includes('spotify.com/track/'))
    return m.reply(`Masukkan link lagu Spotify!\n\nContoh:\n${usedPrefix + command} https://open.spotify.com/track/4iV5W9uYEdYUVa79Axb7Rh`)

  await m.reply('🎵 Sedang memproses lagu dari Spotify...')

  try {
    const res = await fetch('https://api.siputzx.my.id/api/d/spotifyv2', {
      method: 'POST',
      headers: {
        'accept': '*/*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ url: text })
    })

    const json = await res.json()
    if (!json.status || !json.data) return m.reply('❌ Gagal mendapatkan data lagu.')

    const { title, artist, coverImage, mp3DownloadLink, coverDownloadLink, songTitle } = json.data

    await conn.sendMessage(m.chat, {
      text: `🎧 *Spotify Music Downloader*\n\n🎵 *Judul:* ${title}\n👤 *Artis:* ${artist}\n📀 *Lagu:* ${songTitle}\n🔗 *Link:* ${text}`,
      contextInfo: {
        externalAdReply: {
          title: title,
          body: artist,
          thumbnailUrl: coverImage,
          sourceUrl: text,
          mediaType: 1,
          renderLargerThumbnail: true
        }
      }
    })

    await conn.sendMessage(m.chat, {
      audio: { url: mp3DownloadLink },
      mimetype: 'audio/mpeg',
      fileName: `${songTitle || title}.mp3`,
      ptt: false
    }, { quoted: m })

  } catch (err) {
    console.error(err)
    m.reply('⚠️ Terjadi kesalahan saat mengunduh lagu Spotify.')
  }
}

handler.help = ['spotifydl']
handler.tags = ['downloader']
handler.command = /^(spotifydl|spotidown|spotifydownload)$/i

export default handler