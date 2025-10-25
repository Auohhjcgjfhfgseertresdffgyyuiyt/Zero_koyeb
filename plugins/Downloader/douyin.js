import axios from "axios";
import {load} from 'cheerio';
import FormData from "form-data";

let handler = async (m, { conn, usedPrefix, command, text }) => {
    if (!text) return m.reply(`Contoh: ${usedPrefix + command} https://v.douyin.com/iXpBGvx/`);
    
    m.reply(wait);

    try {
        let res = await douyin.download(text);
        
        if (res.length < 3) {
            return m.reply("Tidak ada cukup tautan unduhan yang tersedia.");
        }
        
        let videoUrl = res[2].link;
        await conn.sendMessage(m.chat, { video: { url: videoUrl }, mimetype: 'video/mp4' }, { quoted: m });
    } catch (e) {
        m.reply('Lagi error bang fitur nya :)');
    }
};

handler.help = ["douyin"];
handler.tags = ["downloader"];
handler.command = /^(douyin)$/i;
handler.limit = true;

export default handler;

const douyin = {
    download: async (url) => {
        if (!url) throw new Error("Invalid URL");

        const apiURL = "https://savetik.co/api/ajaxSearch";
        const form = new FormData();
        form.append("q", url);
        form.append("lang", "id");
        form.append("cftoken", "");

        const headers = { headers: { ...form.getHeaders() } };
        const { data } = await axios.post(apiURL, form, headers);

        const $ = cheerio.load(data.data);
        const downloadLinks = [];
        $(".dl-action a").each((i, el) => {
            const link = $(el).attr("href");
            const quality = $(el).text().trim();
            if (link) {
                downloadLinks.push({ quality, link });
            }
        });

        if (downloadLinks.length === 0) {
            throw new Error("No download links found");
        }
        
        return downloadLinks;
    },
};