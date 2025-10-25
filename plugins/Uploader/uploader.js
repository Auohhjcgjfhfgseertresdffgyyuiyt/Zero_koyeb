import fetch from 'node-fetch'
import axios from 'axios'
import FormData from 'form-data'
import { fileTypeFromBuffer } from 'file-type'

const supa = async (buffer) => {
  const { ext } = await fileTypeFromBuffer(buffer)
  const form = new FormData()
  form.append("file", buffer, `file.${ext}`)
  const res = await fetch("https://i.supa.codes/api/upload", {
    method: "POST",
    body: form,
  })
  const data = await res.json()
  return data.link
}

const quax = async (buffer) => {
  const { ext, mime } = await fileTypeFromBuffer(buffer)
  const form = new FormData()
  form.append('files[]', buffer, {
    filename: `upload.${ext}`,
    contentType: mime,
  })
  const { data } = await axios.post("https://qu.ax/upload.php", form, {
    headers: form.getHeaders(),
  })
  return data.files[0].url
}

const fileIO = async (buffer) => {
  const { ext } = await fileTypeFromBuffer(buffer)
  const form = new FormData()
  form.append('file', buffer, `tmp.${ext}`)
  const res = await fetch('https://file.io/?expires=1d', {
    method: 'POST',
    body: form,
  })
  const json = await res.json()
  if (!json.success) throw json
  return json.link
}

const handler = async (m) => {
  const q = m.quoted ? m.quoted : m
  const mime = (q.msg || q).mimetype || ''
  if (!mime) throw '❌ Balas media (gambar/video/dokumen) yang ingin diupload.'

  const media = await q.download()
  if (!media) throw '❌ Gagal mengunduh media.'

  const fileSizeLimit = 5 * 1024 * 1024
  if (media.length > fileSizeLimit) throw '❌ Ukuran maksimal hanya 5MB.'

  m.reply('📡 Mengunggah file ke 3 server...')

  const [supaRes, quaxRes, fileioRes] = await Promise.allSettled([
    supa(media),
    quax(media),
    fileIO(media)
  ])

  let hasil = ''
  hasil += supaRes.status === 'fulfilled' 
    ? `🔹 *Supa.codes:*\n${supaRes.value}\n\n` 
    : '🔹 *Supa.codes:* ❌ Gagal upload\n\n'

  hasil += quaxRes.status === 'fulfilled' 
    ? `🔸 *Qu.ax:*\n${quaxRes.value}\n\n` 
    : '🔸 *Qu.ax:* ❌ Gagal upload\n\n'

  hasil += fileioRes.status === 'fulfilled' 
    ? `🕑 *File.io (24h):*\n${fileioRes.value}\n\n` 
    : '🕑 *File.io:* ❌ Gagal upload\n\n'

  await m.reply(`📤 *Hasil Upload:*\n\n${hasil.trim()}\n📦 Ukuran: ${media.length} Byte`)
}

handler.help = ['uploader (reply media)']
handler.tags = ['tools']
handler.command = /^uploader$/i
handler.limit = true

export default handler