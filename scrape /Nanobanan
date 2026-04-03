import axios from "axios"

async function Nbanana(imageBuffer, prompt) {
  const { data: uploadInfo } = await axios.post(
    "https://imgeditor.co/api/get-upload-url",
    {
      fileName: "image.jpg",
      contentType: "image/jpeg",
      fileSize: imageBuffer.length
    },
    {
      headers: {
        accept: "*/*",
        "content-type": "application/json"
      }
    }
  )

  await axios.put(uploadInfo.uploadUrl, imageBuffer, {
    headers: {
      "content-type": "image/jpeg"
    },
    maxBodyLength: Infinity,
    maxContentLength: Infinity
  })

  const { data: generate } = await axios.post(
    "https://imgeditor.co/api/generate-image",
    {
      prompt,
      styleId: "realistic",
      mode: "image",
      imageUrl: uploadInfo.publicUrl,
      imageUrls: [uploadInfo.publicUrl],
      numImages: 1,
      outputFormat: "png",
      model: "nano-banana"
    },
    {
      headers: {
        accept: "*/*",
        "content-type": "application/json"
      }
    }
  )

  let result
  while (true) {
    await new Promise(resolve => setTimeout(resolve, 2000))

    const { data: status } = await axios.get(
      "https://imgeditor.co/api/generate-image/status",
      {
        params: { taskId: generate.taskId },
        headers: { accept: "*/*" }
      }
    )

    if (status.status === "completed") {
      result = status.imageUrl
      break
    }
  }

  return result
}

let handler = async (m, { conn, text, setReply }) => {
  let q = m.quoted ? m.quoted : m
  let mime = (q.msg || q).mimetype || ""

  if (!/image/.test(mime)) {
    return setReply("Reply gambar dengan prompt")
  }

  if (!text) {
    return setReply("Masukkan prompt")
  }

  try {
    await conn.sendReact?.(m.chat, "⏳", m.key)

    const buffer = await q.download()

    const result = await Nbanana(buffer, text)

    await conn.sendMessage(
      m.chat,
      {
        image: { url: result },
        caption: `🍌 *Nano Banana AI*

📝 Prompt : ${text}`
      },
      { quoted: m }
    )

    await conn.sendReact?.(m.chat, "✅", m.key)

  } catch (err) {
    console.error(err)
    setReply("Terjadi kesalahan")
  }
}

handler.help = ["nanobanana"]
handler.tags = ["ai"]
handler.command = ["nanobanana", "nb", "banana"]

export default handler
