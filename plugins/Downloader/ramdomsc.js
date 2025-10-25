// * Code By Nazand Code
// * Fitur Mengambil Script Bot Secara Acak (Dibuat Krn Gabut)
// * Hapus Wm Denda 500k Rupiah
// * https://whatsapp.com/channel/0029Vaio4dYC1FuGr5kxfy2l

import axios from 'axios';
import {load} from 'cheerio';
import path from 'path';

async function getRandomZipFile() {
  try {
    const url = 'https://script.nazandcode.xyz/';
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    
    const zipLinks = [];
    $('a').each((index, element) => {
      const link = $(element).attr('href');
      if (link && link.endsWith('.zip')) {
        const fullLink = link.startsWith('http') ? link : `https://script.nazandcode.xyz/${link}`;
        zipLinks.push(fullLink);
      }
    });
    if (zipLinks.length === 0) throw new Error('Tidak ada file ZIP ditemukan.');
    const randomIndex = Math.floor(Math.random() * zipLinks.length);
    const randomZipUrl = zipLinks[randomIndex];
    const fileName = path.basename(randomZipUrl);
    return { url: randomZipUrl, name: fileName };
  } catch (error) {
    console.error('Error saat mengambil file ZIP:', error.message);
    throw new Error('Gagal mengambil file ZIP secara acak.');
  }
}

const handler = async (m, { conn }) => {
  try {
    const { url: zipFileUrl, name: zipFileName } = await getRandomZipFile();
    const caption = `📦 Hasil Pencarian Secara Acak Script Bot Wangsaf😋`;
    await conn.sendMessage(m.chat, {
      document: { url: zipFileUrl },
      mimetype: 'application/zip',
      fileName: zipFileName,
      caption: caption
    }, { quoted: m });

  } catch (error) {
    console.error('Error:', error.message);
    await conn.sendMessage(m.chat, { text: `⚠️ Error: ${error.message}` }, { quoted: m });
  }
};

handler.help = ['randomsc'];
handler.tags = ['tools'];
handler.command = /^randomsc$/i;
handler.owner = false;

export default handler;