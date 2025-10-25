import ffmpegPath from "ffmpeg-static";

import fs from 'fs';

const handler = async (m, { conn }) => {

  try {

    const who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender;

    const name = await conn.getName(who);

    const q = m.quoted ? m.quoted : m;

    const mime = (q.msg || q).mimetype || '';

    if (!mime) throw 'Video tidak ditemukan';

    const videoData = await q.download();

    await conn.sendMessage(m.chat, {

      react: {

        text: '🕒',

        key: m.key,

      }

    });

    const outputPath = `./tmp/video_${Date.now()}.mp4`;

    fs.writeFileSync(outputPath, videoData);

    ffmpeg.ffprobe(outputPath, async (err, metadata) => {

      if (err) {

        console.error(err);

        m.reply('Terjadi kesalahan saat memeriksa metadata video. ' + err);

        return;

      }

      const width = metadata.streams[0].width;

      const height = metadata.streams[0].height;

      const aspectRatio = width > height ? 'landscape' : 'portrait';

      const outputSize = aspectRatio === 'landscape' ? '1280x720' : '720x1280';

      ffmpeg(outputPath)

        .outputOptions('-s', outputSize)

        .outputOptions('-crf', '10') // Atur nilai crf sesuai kebutuhan (semakin rendah, semakin tinggi kualitas)

        .save(outputPath.replace('.mp4', '_hd.mp4'))

        .on('end', () => {

          conn.sendFile(m.chat, outputPath.replace('.mp4', '_hd.mp4'), '', 'Sudah kak', m);

        })

        .on('error', (err) => {

          console.error(err);

          m.reply('Terjadi kesalahan saat meningkatkan resolusi video. ' + err);

        });

    });

  } catch (error) {

    console.error(error);

    m.reply('Terjadi kesalahan. ' + error);

  }

};

handler.help = ['hdvideo'];

handler.command = ['hdvideo'];

handler.tags = ['hd'];

handler.premium = true;

export default handler