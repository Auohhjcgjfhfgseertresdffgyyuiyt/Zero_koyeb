import fetch from 'node-fetch'
import FormData from 'form-data'
import { fileTypeFromBuffer } from 'file-type'

let handler = async (m) => {
  let q = m.quoted ? m.quoted : m
  let mime = (q.msg || q).mimetype || ''
  if (!mime) throw '❌ Tidak ada media ditemukan. Balas gambar/video/audio.'

  let media = await q.download()
  if (!media) throw '❌ Gagal mengunduh media.'

  let { ext, mime: mimeType } = await fileTypeFromBuffer(media)
  let form = new FormData()
  form.append('reqtype', 'fileupload') // WAJIB
  form.append('fileToUpload', media, { filename: `file.${ext}`, contentType: mimeType })

  let res = await fetch('https://catbox.moe/user/api.php', {
    method: 'POST',
    body: form,
    headers: form.getHeaders()
  })

  let result = await res.text()
  if (!result.startsWith('https://')) throw `❌ Upload gagal:\n${result}`

  await m.reply(`📮 *L I N K :*\n${result}\n📊 *S I Z E :* ${media.length} Byte\n📛 *E x p i r e d :* Tidak diketahui`)
}

handler.help = ['upload (reply media)']
handler.tags = ['tools']
handler.command = /^upload$/i

export default handler