import path from 'path'
import { spawn } from 'child_process'
import fs from 'fs'

let handler = async (m, { conn, args, command, setReply, prefix }) => {
  const p = m.quoted ? m.quoted : m
  const isVideo = p?.mimetype?.includes("video") || false
  if (!isVideo) return setReply("Reply video yang mau dipotong!")

  const inputPath = await p.download(true)
  if (!inputPath || !fs.existsSync(inputPath)) return setReply("Gagal download video")

  const outputPath = path.join('./', `cut-${Date.now()}.mp4`)
  let start = 0, duration = 0

  if (args.length === 1) {
    duration = parseInt(args[0])
  } else if (args.length === 2) {
    start = parseInt(args[0])
    duration = parseInt(args[1]) - start
  } else {
    return setReply(`Format salah!\nContoh: ${prefix + command} 10\natau: ${prefix + command} 5 15`)
  }

  if (isNaN(start) || isNaN(duration)) return setReply("Start/duration tidak valid")

  setReply("⏳ Memotong video...")

  const ffmpeg = spawn('ffmpeg', [
    '-ss', `${start}`,
    '-i', inputPath,
    '-t', `${duration}`,
    '-c:v', 'copy',
    '-c:a', 'copy',
    outputPath
  ])

  ffmpeg.on('close', async (code) => {
    if (fs.existsSync(inputPath)) fs.unlinkSync(inputPath)
    if (!fs.existsSync(outputPath)) return setReply("❌ Gagal proses, output tidak ditemukan.")

    try {
      await conn.sendFile(m.chat, outputPath, 'cut.mp4', `🎬 Potongan dari detik ${start} selama ${duration} detik`, m)
    } catch (e) {
      setReply(`❌ Gagal kirim video: ${e.message}`)
    } finally {
      if (fs.existsSync(outputPath)) fs.unlinkSync(outputPath)
    }
  })
}

handler.help = ["cut [durasi]", "cut [start] [end]"]
handler.tags = ["tools"]
handler.command = ["cut", "cutvid"]

export default handler