/**
 * 
 * [ *MEGANEI LATEST, SEARCH, DOWNLOAD* ]
 * Yuki Ainz
 */

import axios from "axios";
import {load} from 'cheerio'

let handler = async (m, { text }) => {
    let teks;
    if (text) {
        teks = text.trim();
    } else if (m.quoted && m.quoted.text) {
        teks = m.quoted.text.trim(); 
    } else {
        throw `Penggunaan Opsi:\n1. /meganei latest\n2. /meganei <query>\n3. /meganei <download>`;
    }
    
    let w = "`";

    if (teks === "latest") {
    m.reply(wait)
        try {
            let latestManga = await meganeiLatest();
            let latestMessage = `${w}Update Komik Terbaru${w}\n\n`;
            for (const manga of latestManga) {
                latestMessage += `Title: ${manga.title}\n`;
                latestMessage += `Date: ${manga.date}\n`;
                latestMessage += `Category: ${manga.category}\n`;
                latestMessage += `Url: ${manga.url}\n\n`;
            }
            await conn.sendMessage(m.chat, {
                text: latestMessage.trim(),
                mentions: [m.sender],
                contextInfo: {
                    forwardingScore: 9999999,
                    isForwarded: false,
                    mentionedJid: [m.sender],
                    externalAdReply: {
                        showAdAttribution: false,
                        renderLargerThumbnail: true,
                        title: "Meganei Latest",
                        body: "By Ainurridha",
                        containsAutoReply: true,
                        mediaType: 1,
                        thumbnailUrl: `https://telegra.ph/file/ec07fa18a4694f9cf829a.jpg`,
                        mediaUrl: ``,
                        sourceUrl: ``,
                    },
                },
            }, { quoted: m });
        } catch (error) {
            console.error("Terjadi kesalahan:", error);
            m.reply("Oops! Terjadi kesalahan saat mengambil data.");
        }
    } else if (teks.startsWith("https://meganei.net")) {
    m.reply(wait)
        try {
            let detailManga = await meganeiDownload(teks);
            if (!detailManga) {
                throw "Data manga tidak ditemukan.";
            }

            let detailMessage = `${w}Informasi Lengkap Komik${w}\n\n`;
            detailMessage += `Alternative: ${detailManga.detailKomik.alternative}\n`;
            detailMessage += `Type: ${detailManga.detailKomik.type}\n`;
            detailMessage += `Status: ${detailManga.detailKomik.status}\n`;
            detailMessage += `Genre: ${detailManga.detailKomik.genre}\n`;
            detailMessage += `Author: ${detailManga.detailKomik.author}\n`;
            detailMessage += `Artist: ${detailManga.detailKomik.artist}\n`;
            detailMessage += `Rating: ${detailManga.detailKomik.rating}\n`;
            detailMessage += `Release: ${detailManga.detailKomik.released}\n`;
            detailMessage += `Credit: ${detailManga.detailKomik.credit}\n\n`;
            detailMessage += `Chapter Yang Tersedia:\n`;
            for (const mega of detailManga.chapters) {
                detailMessage += `- ${mega.chapter}\n${mega.date}\n${mega.acefile}\n${mega.mirrored}\n`;
            }
            await conn.sendMessage(m.chat, {
                text: detailMessage.trim(),
                mentions: [m.sender],
                contextInfo: {
                    forwardingScore: 9999999,
                    isForwarded: false,
                    mentionedJid: [m.sender],
                    externalAdReply: {
                        showAdAttribution: false,
                        renderLargerThumbnail: true,
                        title: "Meganei Download",
                        body: "By Ainurridha",
                        containsAutoReply: true,
                        mediaType: 1,
                        thumbnailUrl: `https://telegra.ph/file/ec07fa18a4694f9cf829a.jpg`,
                        mediaUrl: ``,
                        sourceUrl: ``,
                    },
                },
            }, { quoted: m });
        } catch (error) {
            console.error("Terjadi kesalahan:", error);
            m.reply("Oops! Terjadi kesalahan saat mengambil data.");
        }
    } else {
    m.reply(wait)
        try {
            let searchResults = await meganeiSearch(teks);
            if (searchResults.length === 0) {
                let searchMessage = `${w}Hasil Pencarian: "${teks}"${w}\n\nMaaf, tidak ada hasil yang ditemukan.`;
                await conn.sendMessage(m.chat, {
                    text: searchMessage.trim(),
                    mentions: [m.sender],
                    contextInfo: {
                        forwardingScore: 9999999,
                        isForwarded: false,
                        mentionedJid: [m.sender],
                        externalAdReply: {
                            showAdAttribution: false,
                            renderLargerThumbnail: true,
                            title: "Meganei Search",
                            body: "By Ainurridha",
                            containsAutoReply: true,
                            mediaType: 1,
                            thumbnailUrl: `https://telegra.ph/file/ec07fa18a4694f9cf829a.jpg`,
                            mediaUrl: ``,
                            sourceUrl: ``,
                        },
                    },
                }, { quoted: m });
            } else {
                let searchMessage = `${w}Hasil Pencarian: "${teks}"${w}\n\n`;
                for (const manga of searchResults) {
                    searchMessage += `Title: ${manga.title}\n`;
                    searchMessage += `Url: ${manga.link}\n\n`;
                }
                await conn.sendMessage(m.chat, {
                    text: searchMessage.trim(),
                    mentions: [m.sender],
                    contextInfo: {
                        forwardingScore: 9999999,
                        isForwarded: false,
                        mentionedJid: [m.sender],
                        externalAdReply: {
                            showAdAttribution: false,
                            renderLargerThumbnail: true,
                            title: "Meganei Search",
                            body: "By Ainurridha",
                            containsAutoReply: true,
                            mediaType: 1,
                            thumbnailUrl: `https://telegra.ph/file/ec07fa18a4694f9cf829a.jpg`,
                            mediaUrl: ``,
                            sourceUrl: ``,
                        },
                    },
                }, { quoted: m });
            }
        } catch (error) {
            console.error("Terjadi kesalahan:", error);
            m.reply("Oops! Terjadi kesalahan saat mengambil data.");
        }
    }
};

handler.help = ["meganei"];
handler.tags = ["anime"];
handler.command = /^(meganei)$/i;

handler.limit = true;
handler.group = true;

export default handler;

async function meganeiLatest() {
  try {
    const { data } = await axios.get('https://meganei.net/');

    const $ = cheerio.load(data);
    
    const posts = [];

    $('article.small-archive-post').each((index, element) => {
      const title = $(element).find('h2.entry-title a').text().trim();
      const url = $(element).find('h2.entry-title a').attr('href');
      const date = $(element).find('time.entry-date').text().trim();
      const author = $(element).find('.meta-author .author.vcard a').text().trim();
      const category = $(element).find('.meta-category a').map((i, el) => $(el).text()).get().join(', ');

      posts.push({ title, url, date, author, category });
    });

    return posts;
  } catch (error) {
    console.error('Error:', error);
  }
}

async function meganeiDownload(url) {
    try {
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);
        
        let creator = "Ainurridha"
        
        let detailKomik = {
            alternative: $('li:contains("Alternative") span').text().trim(),
            type: $('li:contains("Type") span a').text().trim(),
            status: $('li:contains("Status") span a').text().trim(),
            genre: $('li:contains("Genre") span').text().trim(),
            author: $('li:contains("Author") span').text().trim(),
            artist: $('li:contains("Artist") span').text().trim(),
            rating: $('li:contains("Rating") span').text().trim(),
            released: $('li:contains("Released") span').text().trim(),
            credit: $('li:contains("Credit") span').text().trim(),
        };

        let passwordPDF = 'meganei.net';

        let results = [];

        $('.dwnld li').each((index, element) => {
            let chapter = $(element).find('.chapter-range font').text().trim();
            let acefile = $(element).find('.the-link a').first().attr('href');
            let mirrored = $(element).find('.the-link a').eq(1).attr('href');
            let date = $(element).find('.date').text().trim();

            results.push({
                chapter,
                acefile,
                mirrored,
                date
            });
        });

        return {
            creator,
            detailKomik,
            passwordPDF,
            chapters: results
        };
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}

async function meganeiSearch(query) {
    try {
        const url = `https://meganei.net/?s=${query}`
        
        const { data } = await axios.get(url);
        
        const $ = cheerio.load(data);
        
        const searchResults = [];
        
        $('article.small-archive-post').each((i, elem) => {
            const title = $(elem).find('h2.entry-title a').text().trim();
            const link = $(elem).find('h2.entry-title a').attr('href');
            const imageUrl = $(elem).find('img.wp-post-image').attr('src');

            searchResults.push({
                title,
                link,
                imageUrl
            });
        });

        return searchResults;
        
    } catch (error) {
        console.error('Error:', error);
    }
}