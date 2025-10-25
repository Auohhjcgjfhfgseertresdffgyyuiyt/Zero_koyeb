import axios from 'axios';

export async function ttSearch(query) {
    return new Promise((resolve, reject) => {
        axios.post("https://tikwm.com/api/feed/search", {
            keywords: query,
            count: 12,
            cursor: 0,
            web: 1,
            hd: 1
        }, {
            headers: {
                "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                "cookie": "current_language=en",
                "User-Agent": "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36"
            }
        }).then(res => { 
            resolve(res.data.data); 
        }).catch(err => {
            reject(err);
        });
    });
}

// Fungsi pengganti googleImage
async function googleImageScrape(query) {
    try {
        const url = 'https://www.google.com/search';
        const { data } = await axios.get(url, {
            params: {
                q: query,
                tbm: 'isch' // image search
            },
            headers: {
                'User-Agent': 'Mozilla/5.0'
            }
        });

        const imageRegex = /"ou":"(.*?)"/g;
        const images = [];
        let match;
        while ((match = imageRegex.exec(data)) !== null) {
            images.push(match[1]);
        }

        return images;
    } catch (err) {
        return [];
    }
}

let handler = async (m, { conn, args, text, usedPrefix, command }) => {
    switch (command) {
        case 'zerotwo':
            await conn.reply(m.chat, 'Searching for Zero images...', m);
            const res = await googleImageScrape('Zerotwo');
            if (!res.length) return m.reply('Tidak ditemukan gambar.');
            let image = res[Math.floor(Math.random() * res.length)];
            conn.sendFile(m.chat, image, 'google.jpg', 'R A N D O M', m);
            break;

        case 'vidzero':
            m.reply('_Mohon tunggu..._');
            ttSearch('amv zerotwo').then(results => {
                let videos = results.videos;
                let randomIndex = Math.floor(Math.random() * videos.length);
                let randomVideo = videos[randomIndex];
                let caption = 'made by © ᴢᴇʀᴏ ʙᴏᴛ ᴀɪ \nResults Video Amv Zero';
                let videoUrl = 'https://tikwm.com/' + randomVideo.play;
                conn.sendMessage(m.chat, { video: { url: videoUrl }, caption: caption }, { quoted: m });
            }).catch(err => {
                m.reply('_Terjadi kesalahan saat mencari video._');
            });
            break;
    }
};

handler.help = ['vidzero','zerotwo'];
handler.tags = ['anime'];
handler.command = /^(vidzero|zerotwo)$/i;
handler.limit = true;
handler.register = true;

export default handler;