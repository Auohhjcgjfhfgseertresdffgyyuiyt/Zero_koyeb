let handler = async (m, { conn, text, command, usedPrefix }) => {
  if (!text) return m.reply(`Masukkan judul lagu!\n\nContoh:\n${usedPrefix + command} serana`)

  await m.reply('🎧 Sedang mencari lagu di Spotify...')

  try {
    let res = await fetch('https://api.siputzx.my.id/api/s/spotify', {
      method: 'POST',
      headers: {
        'accept': '*/*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ query: text })
    })

    let data = await res.json()
    if (!data.status || !data.data || data.data.length === 0)
      return m.reply('❌ Lagu tidak ditemukan.')

    let teks = `🎶 *Hasil Pencarian Spotify*\n\n`
    for (let i of data.data.slice(0, 10)) {
      teks += `🎵 *Judul:* ${i.title}\n`
      teks += `👤 *Artis:* ${i.artist}\n`
      teks += `💽 *Album:* ${i.album}\n`
      teks += `🕒 *Durasi:* ${i.duration}\n`
      teks += `📅 *Rilis:* ${i.release_date}\n`
      teks += `🎧 *Preview:* ${i.preview_url}\n`
      teks += `🔗 *Link:* ${i.track_url}\n`
      teks += `──────────────────────\n`
    }

    const first = data.data[0]

    await conn.sendMessage(m.chat, {
      text: teks.trim(),
      contextInfo: {
        externalAdReply: {
          title: first.title,
          body: `Artis: ${first.artist}`,
          thumbnailUrl: first.thumbnail,
          sourceUrl: first.track_url,
          mediaType: 1,
          renderLargerThumbnail: true
        }
      }
    })
  } catch (e) {
    console.error(e)
    m.reply('⚠️ Terjadi kesalahan saat menghubungi API Spotify.')
  }
}

handler.help = ['spotify']
handler.tags = ['search']
handler.command = /^(spotify|spotifys)$/i

export default handler