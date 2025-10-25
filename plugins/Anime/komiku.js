/**
 * 
 * [ *KOMIKU LATEST, POPULER, SEARCH, DETAIL, DOWNLOAD* ]
 * Yuki Ainz
 */

import axios from "axios";
import * as cheerio from "cheerio";
import PDFDocument from 'pdfkit'

let handler = async (m, { text }) => {
    let teks;
    if (text) {
        teks = text.trim();
    } else if (m.quoted && m.quoted.text) {
        teks = m.quoted.text.trim();
    } else {
        throw `Penggunaan Opsi:\n1. /komiku latest\n2. /komiku populer\n3. /komiku <query>\n4. /komiku <detail manga>\n5. /komiku <chapter>`;
    }
    
    let w = "`"

    if (teks === "latest") {
    m.reply(wait)
        try {
            let latestManga = await komikuLatest();
            let latestMessage = `${w}Update Komik Terbaru${w}\n\n`;
            for (const manga of latestManga) {
                latestMessage += `Title: ${manga.title}\n`;
                latestMessage += `Genre: ${manga.genre}\n`.trim()
                latestMessage += `Chapter: ${manga.chapter}\n`;
                latestMessage += `Link: ${manga.link}\n\n`;
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
					    title: "Komiku Latest",
					    body: "By Ainurridha",
					    containsAutoReply: true,
					    mediaType: 1,
					    thumbnailUrl: `https://telegra.ph/file/3b97c7b2d2d9cff1ded58.jpg`,
					    mediaUrl: ``,
					    sourceUrl: ``,
				    },
			    },
            }, { quoted: m });
        } catch (error) {
            console.error("Terjadi kesalahan:", error);
            m.reply("Oops! Terjadi kesalahan saat mengambil data.");
        }
            } else if (teks === "populer") {
            m.reply(wait)
        try {
            let populerManga = await komikuPopuler();
            let populerMessage = `${w}Update Komik Populer${w}\n\n`;
            for (const popular of populerManga) {
                populerMessage += `Title: ${popular.title}\n`;
                populerMessage += `Genre: ${popular.genre}\n`.trim()
                populerMessage += `Chapter: ${popular.chapter}\n`;
                populerMessage += `Link: ${popular.link}\n\n`;
            }
            await conn.sendMessage(m.chat, {
            text: populerMessage.trim(),
            mentions: [m.sender],
				contextInfo: {
					forwardingScore: 9999999,
					isForwarded: false,
					mentionedJid: [m.sender],
					    externalAdReply: {
					    showAdAttribution: false,
					    renderLargerThumbnail: true,
					    title: "Komiku Latest",
					    body: "By Ainurridha",
					    containsAutoReply: true,
					    mediaType: 1,
					    thumbnailUrl: `https://telegra.ph/file/3b97c7b2d2d9cff1ded58.jpg`,
					    mediaUrl: ``,
					    sourceUrl: ``,
				    },
			    },
            }, { quoted: m });
        } catch (error) {
            console.error("Terjadi kesalahan:", error);
            m.reply("Oops! Terjadi kesalahan saat mengambil data.");
        }
        
    } else if (teks.match(/https:\/\/komiku\.id\/.+chapter-\d+/)) {
        try {
            let result = await komikuDownload(teks);
            if (result) {
                m.reply("Sedang convert semua gambar menjadi PDF...")
                let imagepdf = await toPDF(result.images.map(img => img.url));

                await conn.sendMessage(
                    m.chat,
                    {
                        document: imagepdf,
                        fileName: result.title + '.pdf',
                        mimetype: 'application/pdf',
                    },
                    { quoted: m }
                );
            } else {
                m.reply('Gagal mengambil data dari link tersebut.');
            }
        } catch (error) {
            console.error("Terjadi kesalahan:", error);
            m.reply("Oops! Terjadi kesalahan saat mengambil data.");
        }
    } else if (teks.startsWith("https://komiku.id/manga")) {
    m.reply(wait)
        try {
            let detailManga = await komikuDetail(teks);
            let detailMessage = `${w}Informasi Lengkap Komik${w}\n\n`;
            detailMessage += `Title: ${detailManga.info.title}\n`;
            detailMessage += `Title Indonesia: ${detailManga.info.indo}\n`
            detailMessage += `Format: ${detailManga.info.jenis}\n`
            detailMessage += `Genre: ${detailManga.info.genre}\n`
            detailMessage += `Author: ${detailManga.info.pengarang}\n`
            detailMessage += `Status: ${detailManga.info.status}\n`
            detailMessage += `Rating: ${detailManga.info.umur}\n`
            detailMessage += `Cara Baca: ${detailManga.info.caraBaca}\n\n`
            detailMessage += `Sinopsis:\n${detailManga.synopsis}\n\n`;
            detailMessage += `Chapter Yang Tersedia:\n`;
            for (const chapter of detailManga.chapters) {
                detailMessage += `  - ${chapter.title} (${chapter.date}): ${chapter.link}\n`;
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
					    title: "Komiku Detail",
					    body: "By Ainurridha",
					    containsAutoReply: true,
					    mediaType: 1,
					    thumbnailUrl: `https://telegra.ph/file/3b97c7b2d2d9cff1ded58.jpg`,
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
            let searchResults = await komikuSearch(teks);
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
                title: "komiku Search",
                body: "By Ainurridha",
                containsAutoReply: true,
                mediaType: 1,
                thumbnailUrl: `https://telegra.ph/file/3b97c7b2d2d9cff1ded58.jpg`,
                mediaUrl: ``,
                sourceUrl: ``,
            },
        },        
    }, { quoted: m });
} else {
    let searchMessage = `${w}Hasil Pencarian: "${teks}"${w}\n\n`;
    for (const manga of searchResults) {
        searchMessage += `Title: ${manga.title}\n`;
        searchMessage += `Genre: ${manga.genre}\n`;
        searchMessage += `Chapter Terbaru: ${manga.latestChapter}\n`;
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
                title: "komiku Search",
                body: "By Ainurridha",
                containsAutoReply: true,
                mediaType: 1,
                thumbnailUrl: `https://telegra.ph/file/3b97c7b2d2d9cff1ded58.jpg`,
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

handler.help = ["komiku"];
handler.tags = ["anime"];
handler.command = /^(komiku)$/i;

handler.limit = true;
handler.group = true;

export default handler

async function komikuPopuler() {
  try {
    const response = await axios.get('https://komiku.id/');
    const html = response.data;
    const $ = cheerio.load(html);

    const mangas = $('.ls12 .ls2').map((index, element) => {
      const title = $(element).find('.ls2j h3 a').text().trim();
      const genre = $(element).find('.ls2t').text().trim();
      const chapter = $(element).find('.ls2l').text().trim();
      
      // Hapus parameter 'resize' dari URL gambar
      const imageUrl = $(element)
        .find('.ls2v a img')
        .attr('data-src')
        .replace(/\?resize=\d+,\d+$/, '');

      const link = `https://komiku.id${$(element).find('.ls2j h3 a').attr('href')}`;

      return {
        title,
        genre,
        chapter,
        imageUrl,
        link,
      };
    }).get();

    return mangas;
  } catch (error) {
    console.error('Error fetching manga data:', error);
    return [];
  }
}

async function komikuLatest() {
    try {
        const response = await axios.get('https://komiku.id/');
        const html = response.data;
        const $ = cheerio.load(html);

        const latestReleases = [];

        $('#Terbaru .ls4').each((index, element) => {
            const title = $(element).find('.ls4j h3 a').text().trim();
            const genre = $(element).find('.ls4s').text().trim();
            const chapter = $(element).find('.ls24').text().trim();

            const link = `https://komiku.id${$(element).find('.ls4j h3 a').attr('href')}`;

            latestReleases.push({
                title,
                genre,
                chapter,
                link,
            });
        });

        return latestReleases;
    } catch (error) {
        console.error('Error fetching latest releases:', error);
        return [];
    }
}

async function komikuSearch(query) {
    try {
        const response = await axios.get(`https://api.komiku.id/?post_type=manga&s=${query}`);
        const data = response.data;

        const $ = cheerio.load(data);
        const mangas = [];

        $('.bge').each((index, element) => {
            const title = $(element).find('h3').text().trim();
            const relativeLink = $(element).find('a').attr('href');
            const genre = $(element).find('.tpe1_inf b').text().trim();
            const latestChapter = $(element).find('.new1').last().find('span').last().text().trim();
            const fullLink = `https://komiku.id${relativeLink}`;

            mangas.push({
                title,
                link: fullLink,
                genre,
                latestChapter,
            });
        });

        return mangas;
    } catch (error) {
        console.error('Error scraping manga:', error);
        return [];
    }
}

async function komikuDetail(url) {
    try {
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);

        const title = $('span[itemprop="name"]').text().trim();
        const description = $('p[itemprop="description"]').text().trim();
        const synopsis = $('p.desc').text().trim();
        const imageUrl = $('img[itemprop="image"]').attr('src');

        // Mapping hasil info ke dalam format yang diinginkan
        const info = {};
        $('table.inftable tr').each((i, el) => {
            const key = $(el).find('td:first-child').text().trim();
            const value = $(el).find('td:last-child').text().trim();

            switch (key) {
                case 'Judul Komik':
                    info.title = value;
                    break;
                case 'Judul Indonesia':
                    info.indo = value;
                    break;
                case 'Jenis Komik':
                    info.jenis = value;
                    break;
                case 'Konsep Cerita':
                    info.genre = value;
                    break;
                case 'Pengarang':
                    info.pengarang = value;
                    break;
                case 'Status':
                    info.status = value;
                    break;
                case 'Umur Pembaca':
                    info.umur = value;
                    break;
                case 'Cara Baca':
                    info.caraBaca = value;
                    break;
                default:
                    break;
            }
        });

        const chapters = [];
        $('tr').each((i, el) => {
            const chapterLink = $(el).find('td.judulseries a').attr('href');
            const chapterTitle = $(el).find('td.judulseries a span').text().trim();
            const chapterDate = $(el).find('td.tanggalseries').text().trim();

            if (chapterLink && chapterTitle && chapterDate) {
                chapters.push({
                    title: chapterTitle,
                    link: `https://komiku.id${chapterLink}`,
                    date: chapterDate,
                });
            }
        });

        chapters.sort((a, b) => {
            const numA = parseInt(a.title.match(/\d+/)[0]);
            const numB = parseInt(b.title.match(/\d+/)[0]);
            return numA - numB;
        });

        return {
            title,
            description,
            synopsis,
            imageUrl,
            info,
            chapters,
        };
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}

async function komikuDownload(url) {
    try {
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);

        const title = $('table.tbl tbody[data-test="informasi"] tr:contains("Judul") td:nth-child(2)').text().trim() ||
                      $('table.tbl tr:contains("Judul") td:nth-child(2)').text().trim();

        const releaseDate = $('table.tbl tbody[data-test="informasi"] tr:contains("Tanggal Rilis") td:nth-child(2)').text().trim() ||
                            $('table.tbl tr:contains("Tanggal Rilis") td:nth-child(2)').text().trim();

        const readDirection = $('table.tbl tbody[data-test="informasi"] tr:contains("Arah Baca") td:nth-child(2)').text().trim() ||
                              $('table.tbl tr:contains("Arah Baca") td:nth-child(2)').text().trim();

        const images = $('#Baca_Komik img, #Baca_Manga img, .content-comic img').map((_, el) => ({
            id: $(el).attr('id'),
            url: $(el).attr('src')
        })).get();

        if (!title || !releaseDate || !readDirection || images.length === 0) {
            throw new Error('Data tidak ditemukan atau struktur halaman tidak sesuai');
        }

        return { title, releaseDate, readDirection, images };
    } catch (error) {
        console.error(`Error: ${url}`, error.message);
        return null;
    }
}

function isSupportedFormat(buffer) {
    const fileSignature = buffer.toString('hex', 0, 4).toUpperCase();
    return fileSignature === 'FFD8FFE0' || fileSignature === 'FFD8FFE1' || fileSignature === '89504E47';
}

async function toPDF(images, opt = {}) {
    return new Promise(async (resolve, reject) => {
        if (!Array.isArray(images)) images = [images];
        let buffs = [],
            doc = new PDFDocument({ margin: 0, size: 'A4' });

        for (let x = 0; x < images.length; x++) {
            try {
                let data = (await axios.get(images[x], { responseType: 'arraybuffer', ...opt })).data;
                
                if (!isSupportedFormat(data)) continue;

                doc.image(data, 0, 0, { fit: [595.28, 841.89], align: 'center', valign: 'center' });

                if (images.length != x + 1) doc.addPage();
            } catch (err) {
                console.error(`Error processing image: ${images[x]}`, err.message);
            }
        }

        doc.on('data', (chunk) => buffs.push(chunk));
        doc.on('end', () => resolve(Buffer.concat(buffs)));
        doc.on('error', (err) => reject(err));
        doc.end();
    });
}