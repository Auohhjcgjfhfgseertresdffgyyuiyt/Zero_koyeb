import { fileTypeFromBuffer } from 'file-type'

const handler = async (m, { conn, args,q, usedPrefix, command }) => {
  const type = args[0]
  const quoted = m.quoted ? m.quoted : m.msg === undefined ? m : m.msg;
  const isVideo = m.type === "videoMessage";
  const isImage = m.type === "imageMessage";
  const isAudio = m.type === "audioMessage";
  const isQuotedVideo = m.type === "extendedTextMessage" && m.content.includes("videoMessage");
  const isQuotedImage = m.type === "extendedTextMessage" && m.content.includes("imageMessage");
  const isQuotedAudio = m.type === "extendedTextMessage" && m.content.includes("audioMessage");
   
  const statusJidList =  Object.keys(db.data.users)

  if (!q) {
    //return m.reply(`Usage:\n${usedPrefix + command} text <isi>\n${usedPrefix + command} media (reply media)\n${usedPrefix + command} audio (reply audio)`)
  }

  if (m.type === "conversation") {
    const text = args.slice(1).join(' ')
    if (!q) return m.reply('Masukkan teks statusnya.')

    await conn.sendMessage('status@broadcast', {
      text,
    }, {
      backgroundColor: '#29509D',
      font: 3,
      statusJidList
    })
    return m.reply('Status teks berhasil dikirim.')
  }

  if (isQuotedVideo||isQuotedImage||isQuotedAudio||isVideo||isImage||isAudio) {
    log('ada')
    let media = await conn.downloadAndSaveMediaMessage(quoted, makeid(5));
 //   const media = await quoted.download()
    if (!media) return m.reply('Reply media yang ingin dikirim ke status.')

    const fileInfo = await fileTypeFromBuffer(media)
    await conn.sendMessage('status@broadcast', {
      [fileInfo.mime.startsWith('image/') ? 'image' : 'video']: media,
      caption: quoted.text || '',
      mimetype: fileInfo.mime
    }, {
      backgroundColor: '#24292E',
      statusJidList
    })
    return m.reply('Status media berhasil dikirim.')
  }

  if (type === 'audio') {
    const audio = await quoted.download()
    if (!audio) return m.reply('Reply audio yang ingin dijadikan status.')

    await conn.sendMessage('status@broadcast', {
      audio,
      ptt: true,
      mimetype: 'audio/mp4'
    }, {
      backgroundColor: '#1B2E35',
      statusJidList
    })
    return m.reply('Status audio berhasil dikirim.')
  }

  return m.reply('Tipe tidak dikenali. Gunakan text, media, atau audio.')
}

handler.command = ['upstory','upsw']
handler.tags = ['owner']
handler.owner = true
handler.help = ['upstory text <isi>', 'upstory media', 'upstory audio']
handler.description = 'Kirim status WhatsApp (teks, media, audio dengan waveform) via bot'

export default handler
