import fetch from 'node-fetch'
import { load } from 'cheerio'

const handler = async (m, { conn }) => {
  try {
    const res = await fetch('https://myanimelist.net/anime/season')
    const html = await res.text()
    const $ = load(html)

    const latestAnime = []

    $('.seasonal-anime').each((_, el) => {
      const title = $(el).find('.title').text().trim()
      const image = $(el).find('img').attr('data-src') || $(el).find('img').attr('src')
      const link = $(el).find('a').attr('href')
      const synopsis = $(el).find('.synopsis').text().trim()
      const studio = $(el).find('.studio').text().trim() || 'Studio tidak tersedia'
      const rating = $(el).find('.score').text().trim() || 'Rating tidak tersedia'

      if (title && image && link) {
        latestAnime.push({ title, image, link, synopsis, studio, rating })
      }
    })

    if (!latestAnime.length) {
      return conn.reply(m.chat, '❗ Tidak ada anime baru yang ditemukan.', m)
    }

    const anime = latestAnime[Math.floor(Math.random() * latestAnime.length)]

    const message = `
✨ *Anime Baru Rilis: ${anime.title}* ✨

🔗 *Link*: ${anime.link}
🖼️ *Gambar*: ${anime.image}

📝 *Deskripsi*: ${anime.synopsis}

🏢 *Studio*: ${anime.studio}
⭐ *Rating*: ${anime.rating}

🔍 *Selamat menonton! Enjoy!* 🎉`.trim()

    await conn.sendMessage(m.chat, { text: message }, { quoted: m })
  } catch (e) {
    console.error('❌ Error:', e)
    await conn.sendMessage(m.chat, { text: '❗ Terjadi kesalahan saat mengambil informasi anime.' }, { quoted: m })
  }
}

handler.command = /^newanime$/i
handler.tags = ['internet']
handler.help = ['newanime']

export default handler