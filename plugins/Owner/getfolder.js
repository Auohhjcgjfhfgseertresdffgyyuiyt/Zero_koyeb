import fs from 'fs-extra'
import path from 'path'
import { exec } from 'child_process'

let handler = async (m, { text: q, conn, setReply }) => {
  if (!q) return setReply('Nama foldernya apa?')

  const folderPath = path.resolve(`./${q}`)
  const zipPath = path.resolve(`./${q}.zip`)
  const name = `${q}.zip`
  const mimetype = 'application/zip'
  const jpegThumbnail = fs.existsSync('./media/thumbnaildokumen.jpg') ? fs.readFileSync('./media/thumbnaildokumen.jpg') : null

  try {
    const folderExists = await fs.pathExists(folderPath)
    if (!folderExists) return setReply('Folder tidak ditemukan')

    const stats = await fs.stat(folderPath)
    if (!stats.isDirectory()) return setReply('Path tersebut bukan folder')

    setReply(mess.wait)

    await new Promise((resolve, reject) => {
      exec(`zip -r ${name} ${q}`, (err, stdout, stderr) => {
        if (err) return reject(new Error(stderr))
        resolve(stdout)
      })
    })

    await conn.sendMessage(
      m.chat,
      {
        document: await fs.readFile(zipPath),
        fileName: name,
        mimetype,
        jpegThumbnail,
      },
      { quoted: m }
    )

    await fs.unlink(zipPath)
  } catch (e) {
    console.error(e)
    setReply('❌ Terjadi kesalahan:\n' + e.message)
  }
}

handler.help = ['getfolder']
handler.tags = ['internet']
handler.command = /^(getfolder|gfo)$/i
handler.owner = true

export default handler