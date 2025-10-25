import { ttdl } from 'ruhend-scraper'

function extractTikTokLink(text) {
  const regex = /(https?:\/\/(?:www\.|vm\.|vt\.)?tiktok\.com\/[^\s]+)/i
  const match = text.match(regex)
  return match ? match[1] : null
}

let handler = async (m, { command, q, conn, prefix, setReply }) => {
  const url = extractTikTokLink(q)
  if (!url)
    return setReply(
      `Link TikTok tidak valid!\nContoh: ${prefix + command} https://vt.tiktok.com/ZSjn1h8my/`
    )

  setReply(mess.wait)

  try {
    let {
      title,
      author,
      username,
      published,
      like,
      comment,
      share,
      views,
      bookmark,
      video,
      cover,
      music,
      video_hd,
      profilePicture
    } = await ttdl(url)

    let text = transformText(`   
*TIKTOK DOWNLOADER*

Judul: ${title}
Author: ${author}
Username: ${username}
Comment: ${comment}
Views: ${views}
Like: ${like}
Published: ${published}
`)

    await conn.sendMessage(m.chat, {
      caption: text,
      video: { url: video }
    }, { quoted: m })

  } catch (e) {
    console.error(e)
    setReply('Terjadi kesalahan saat mengunduh video TikTok.')
  }
}

handler.help = ["tt"]
handler.tags = ["downloader"]
handler.command = ['tt', 'tiktok']

export default handler