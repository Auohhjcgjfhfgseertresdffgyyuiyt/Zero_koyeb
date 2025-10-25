import { load as cheerioLoad } from 'cheerio';
import axios from 'axios';

let handler = async (m, { conn, text, args, command, usedPrefix }) => {
    let input = `[!] *wrong input*
    
Ex : ${usedPrefix + command} https://vt.tiktok.com/ZSYgBPSLD/`;

    if (!text) return m.reply(input);

    if (!(text.includes('http://') || text.includes('https://'))) 
        return m.reply(`URL invalid, please input a valid URL. Try adding http:// or https://`);
    if (!text.includes('tiktok.com')) return m.reply(`Invalid TikTok URL.`);

    try {
        const { isSlide, result, title, author } = await tiktok(text);
        let no = 1;
        if (isSlide == true) {
            await m.reply('Detected TikTok slide URL\nImages will be sent to your private chat.');
            for (let img of result) {
                const response = await axios.get(img, { responseType: 'arraybuffer' });
                await conn.sendMessage(m.sender, {
                    image: response.data
                });
                await sleep(1000);
            }
        } else {
            await m.reply('Detected TikTok video URL\nVideo will be sent to your private chat.');
            const response = await axios.get(result, { responseType: 'arraybuffer' });
            await conn.sendMessage(m.sender, {
                video: response.data,
                caption: `*${title}*`
            });
        }
    } catch (e) {
        throw e;
    }
};

handler.help = ['tiktok <url>'];
handler.tags = ['downloader'];
handler.command =  ["ttslide"]
handler.limit = true;

export default handler;

async function tiktok(url) {
    try {
        const data = new URLSearchParams({
            'id': url,
            'locale': 'id',
            'tt': 'RFBiZ3Bi'
        });

        const headers = {
            'HX-Request': true,
            'HX-Trigger': '_gcaptcha_pt',
            'HX-Target': 'target',
            'HX-Current-URL': 'https://ssstik.io/id',
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Mobile Safari/537.36',
            'Referer': 'https://ssstik.io/id'
        };

        const response = await axios.post('https://ssstik.io/abc?url=dl', data, { headers });
        const html = response.data;

        const $ = cheerioLoad(html);

        const author = $('#avatarAndTextUsual h2').text().trim();
        const title = $('#avatarAndTextUsual p').text().trim();
        const video = $('.result_overlay_buttons a.download_link').attr('href');
        const audio = $('.result_overlay_buttons a.download_link.music').attr('href');
        const imgLinks = [];
        $('img[data-splide-lazy]').each((index, element) => {
            const imgLink = $(element).attr('data-splide-lazy');
            imgLinks.push(imgLink);
        });

        return {
            isSlide: video ? false : true,
            author,
            title,
            result: video || imgLinks,
            audio
        };
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}