import axios from 'axios';

const apis = [
  (q) => `https://brat.caliphdev.com/api/brat?text=${encodeURIComponent(q)}`,
  (q) => `https://kepolu-brat.hf.space/brat?q=${encodeURIComponent(q)}`,
  (q) => `https://velyn.vercel.app/api/maker/brat?text=${encodeURIComponent(q)}`,
  (q) => `https://apizell.web.id/tools/brat?q=${encodeURIComponent(q)}`
];

const tryFetchBuffer = async (q) => {
  for (const api of apis) {
    const url = api(q);
    try {
      const { data } = await axios.get(url, { responseType: 'arraybuffer' });
      return Buffer.from(data);
    } catch (err) {
      console.log(`Gagal dari: ${url} -> ${err.message}`);
      // lanjut ke API berikutnya
    }
  }
  throw new Error("Semua API gagal dijalankan.");
};

let handler = async (m, { q, conn, command, setReply, usedPrefix }) => {
  setReply("Sedang diproses, tunggu sebentar...");
  if (!q) return m.reply(`Kirim perintah ${usedPrefix + command} text\ncontoh: ${usedPrefix + command} ${setting.botName}`);

  try {
    const result = await tryFetchBuffer(q);
    conn.toSticker(m.chat, result, m);
  } catch (e) {
    m.reply("Gagal mendapatkan stiker dari semua API.");
  }
};

handler.help = ["brat"];
handler.tags = ["tools"];
handler.command = ["brat"];

export default handler;