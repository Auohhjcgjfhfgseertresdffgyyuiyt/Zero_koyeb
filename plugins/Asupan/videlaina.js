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

// Gantikan googleImage dari bochilteam
async function googleImageScrape(query) {
    try {
        const { data } = await axios.get('https://www.google.com/search', {
            params: {
                q: query,
                tbm: 'isch'
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
        case 'elaina':
            await conn.reply(m.chat, 'Searching for Elaina images...', m);
            const res = await googleImageScrape('Elaina');
            if (!res.length) return m.reply('Gagal mendapatkan gambar.');
            let link = res[Math.floor(Math.random() * res.length)];
            conn.sendFile(m.chat, link, 'google.jpg', 'R A N D O M - E L A I N A', m);
            break;

        case 'videlaina':
            m.reply('_Mohon tunggu..._');
            ttSearch('amv elaina').then(results => {
                let videos = results.videos;
                if (!videos || !videos.length) return m.reply('Tidak ada video ditemukan.');
                let randomVideo = videos[Math.floor(Math.random() * videos.length)];
                let caption = 'made by © Vynaa Valerie\nResults Video Amv Elaina';
                let videoUrl = 'https://tikwm.com/' + randomVideo.play;
                conn.sendMessage(m.chat, { video: { url: videoUrl }, caption: caption }, { quoted: m });
            }).catch(err => {
                m.reply('_Terjadi kesalahan saat mencari video._');
            });
            break;
    }
};

handler.help = ['videlaina','elaina'];
handler.tags = ['anime'];
handler.command = /^(videlaina|elaina)$/i;
handler.limit = true;
handler.register = true;

export default handler;

/*
SCRIPT BY © VYNAA VALERIE 
•• recode kasih credits 
•• contacts: (t.me/VLShop2)
•• instagram: @vynaa_valerie 
•• (github.com/VynaaValerie) 
•• Jangan di hapus ini 
*/