import axios from 'axios'
import { load } from 'cheerio'

const BASE = 'https://www.liputan6.com'

async function getHomeNews() {
  const { data } = await axios.get(BASE)
  const $ = load(data)
  const articles = []

  $('.articles--iridescent-list--text-item').each((_, el) => {
    const title = $(el).find('.articles--iridescent-list--text-item__title-link').text().trim()
    const link = $(el).find('.articles--iridescent-list--text-item__title-link').attr('href')
    const thumb = $(el).find('img').attr('data-src') || $(el).find('img').attr('src')
    const summary = $(el).find('.articles--iridescent-list--text-item__summary').text().trim()

    if (title && link) {
      articles.push({
        title,
        link: link.startsWith('http') ? link : BASE + link,
        thumb,
        summary
      })
    }
  })

  return articles
}

async function searchNews(query) {
  const { data } = await axios.get(`${BASE}/search?q=${encodeURIComponent(query)}`)
  const $ = load(data)
  const results = []

  $('.articles--iridescent-list--text-item').each((_, el) => {
    const a = $(el).find('.articles--iridescent-list--text-item__title-link')
    const title = a.text().trim()
    const href = a.attr('href')
    const link = href?.startsWith('http') ? href : BASE + href

    if (title && link && title.toLowerCase().includes(query.toLowerCase())) {
      results.push({ title, link })
    }
  })

  return results
}

async function getNewsDetail(url) {
  let currentPage = 1
  let fullHtml = ''
  const baseUrl = url.split('?')[0]
  let hasNextPage = true

  while (hasNextPage) {
    const pageUrl = currentPage === 1 ? baseUrl : `${baseUrl}?page=${currentPage}`
    const { data } = await axios.get(pageUrl)
    fullHtml += data
    const $ = load(data)
    hasNextPage = $('.paging__link--next').length > 0
    currentPage++
  }

  const $ = load(fullHtml)

  const title = $('meta[property="og:title"]').attr('content') || $('title').text()
  const description = $('meta[name="description"]').attr('content')
  const image = $('meta[property="og:image"]').attr('content')
  const published = $('meta[property="article:published_time"]').attr('content') || $('time').text()
  const author = $('meta[name="author"]').attr('content') || $('a[href*="/penulis/"]').text().trim()

  const content = []
  $('.article-content-body__item-page p').each((_, el) => {
    const text = $(el).text().trim()
    if (text) content.push(text)
  })

  return {
    title,
    description,
    image,
    published,
    author,
    content: content.join('\n\n')
  }
}

let handler = async (m, { conn, text, usedPrefix, command }) => {
  try {
    await conn.sendMessage(m.chat, { react: { text: '⏳', key: m.key } })

    if (command === 'liputan6') {
      const news = await getHomeNews()
      if (!news.length) return m.reply('😢 Tidak ada berita ditemukan.')

      let caption = `📰 *Berita Terbaru dari Liputan6:*\n`
      for (const [i, a] of news.entries()) {
        caption += `\n🔹 *${i + 1}. ${a.title}*\n📝 ${a.summary}\n🔗 ${a.link}\n`
      }

      if (news[0]?.thumb) {
        await conn.sendMessage(m.chat, {
          image: { url: news[0].thumb },
          caption
        })
      } else {
        await m.reply(caption)
      }

    } else if (command === 'liputan6search') {
      if (!text) return m.reply(`🔍 Masukkan kata kunci pencarian!\nContoh: *${usedPrefix + command} politik*`)
      const results = await searchNews(text)
      if (!results.length) return m.reply(`😢 Tidak ada hasil ditemukan untuk "${text}".`)

      let caption = `🔍 *Hasil Pencarian untuk "${text}"*:\n`
      for (const [i, r] of results.entries()) {
        caption += `\n🔹 *${i + 1}. ${r.title}*\n🔗 ${r.link}\n`
      }

      await m.reply(caption)

    } else if (command === 'liputan6detail') {
      if (!text || !text.startsWith('http')) return m.reply(`📚 Masukkan URL berita Liputan6 yang valid!\nContoh: *${usedPrefix + command} https://www.liputan6.com/news/read/...*`)
      const d = await getNewsDetail(text)

      let cap = `✨ *${d.title}*\n`
      cap += `🖋️ Penulis: ${d.author || 'Tidak diketahui'}\n`
      cap += `⏰ Tanggal: ${d.published || 'Tidak diketahui'}\n`
      cap += `📌 Deskripsi: ${d.description || 'Tidak tersedia'}\n\n📄 *Isi Berita:*\n${d.content}`

      if (d.image) {
        await conn.sendMessage(m.chat, {
          image: { url: d.image },
          caption: cap
        })
      } else {
        await m.reply(cap)
      }
    }

    await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
  } catch (e) {
    console.error(e)
    await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
    await m.reply(`⚠️ Ups, terjadi kesalahan.\nCoba lagi nanti ya!`)
  }
}

handler.help = ['liputan6', 'liputan6search <kata kunci>', 'liputan6detail <url>']
handler.tags = ['internet']
handler.command = /^(liputan6|liputan6search|liputan6detail)$/i

export default handler