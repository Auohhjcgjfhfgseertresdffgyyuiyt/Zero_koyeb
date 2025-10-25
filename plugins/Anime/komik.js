/*
 • Fitur By Anomaki Team
 • Created : Nazand Code
 • Contributor : selxyz (scrape)
 • Komikcast Search 
 • Jangan Hapus Wm
 • https://whatsapp.com/channel/0029Vaio4dYC1FuGr5kxfy2l
 
   note: ini simple, 
*/

import axios from "axios";
import {load} from 'cheerio'
let handler = async (m, {
    text
}) => {
    if (!text) return m.reply("Masukkan nama komik yang ingin dicari.");

    try {
        const {
            data
        } = await axios.get(`https://komikcast.bz/?s=${text}`);
        const $ = cheerio.load(data);
        const results = [];

        $(".list-update_item").each((_, element) => {
            const title = $(element).find(".title").text().trim();
            const url = $(element).find("a").attr("href");
            const imageUrl = $(element).find(".list-update_item-image img").attr("src");
            const chapter = $(element).find(".chapter").text().trim();
            const rating = $(element).find(".numscore").text().trim();

            results.push({
                title,
                url,
                imageUrl,
                chapter,
                rating
            });
        });

        if (results.length === 0) {
            return m.reply("Tidak ditemukan komik dengan nama tersebut.");
        }

        let response = "Hasil pencarian:\n\n";
        results.forEach((result, index) => {
            response += `*${index + 1}.*\n`;
            response += `Title: ${result.title}\n`;
            response += `Chapter: ${result.chapter}\n`;
            response += `Rating: ${result.rating}\n`;
            response += `Link: ${result.url}\n\n`;
        });

        m.reply(response);
    } catch (error) {
        console.error("Error fetching data:", error.message);
        m.reply("Terjadi kesalahan saat mengambil data. Silakan coba lagi.");
    }
};

handler.help = ["komik"];
handler.tags = ["search"];
handler.command = /^(komik)$/i;
export default handler;