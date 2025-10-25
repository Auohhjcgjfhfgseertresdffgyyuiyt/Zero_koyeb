const { igdl } = require('ruhend-scraper')

let handler = async (m, { command, q, conn, prefix, setReply }) => {
  if (!q || !q.startsWith("https"))
    return setReply(
      `Linknya?\nContoh: ${
        prefix + command
      } https://www.instagram.com/p/CKXZ1Z1JZK/`
    );
  
  setReply(mess.wait);

  let res = await igdl(q);
  let data = res.data;  // FIX

  for (let media of data) {
    await new Promise(resolve => setTimeout(resolve, 2000)); // kasih jeda beneran
    if (media.url.startsWith('https://d.rapidcdn.app')) {
      await conn.sendMessage(m.chat, { video: { url: media.url } }, { quoted: m });
    } else {
      await conn.sendMessage(m.chat, { image: { url: media.url } }, { quoted: m });
    }
  }
};

handler.help = ["instagram"];
handler.tags = ["downloader"];
handler.command = ['ig']

export default handler;