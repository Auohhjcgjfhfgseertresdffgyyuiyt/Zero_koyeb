/*
 • Fitur By Anomaki Team
 • Created : Nazand Code
 • Contributor by : shannz (scrape)
 • Dongeng list & Dongeng Get
 • Jangan Hapus Wm
 • https://whatsapp.com/channel/0029Vaio4dYC1FuGr5kxfy2l
*/

import axios from 'axios';
import {load} from 'cheerio';
const dongeng = {
  list: async () => {
    let nextPageUrl = 'https://www.1000dongeng.com/';
    const posts = [];

    try {
      while (nextPageUrl) {
        const { data } = await axios.get(nextPageUrl);
        const $ = cheerio.load(data);

        $('.date-outer .date-posts .post-outer').each((index, element) => {
          const title = $(element).find('.post-title a').text();
          const link = $(element).find('.post-title a').attr('href');
          const author = $(element).find('.post-author .fn').text().trim();
          const date = $(element).find('.post-timestamp .published').text();
          const image = $(element).find('.post-thumbnail amp-img').attr('src') || 'Image not available';

          posts.push({
            title,
            link,
            author,
            date,
            image
          });
        });

        const nextLink = $('.blog-pager-older-link').attr('href');
        nextPageUrl = nextLink ? nextLink : null;
      }

      return {
        total: posts.length,
        posts
      };
    } catch (error) {
      throw new Error('Error fetching the website: ' + error.message);
    }
  },

  getDongeng: async (url) => {
    try {
      const { data } = await axios.get(url);
      const $ = cheerio.load(data);

      const title = $('h1.post-title.entry-title').text().trim();
      const author = $('.post-author .fn').text().trim();
      const storyContent = $('.superarticle').find('div').map((i, el) => {
        return $(el).text().trim();
      }).get().join('\n');

      return {
        title,
        author,
        storyContent
      };
    } catch (error) {
      throw new Error('Error fetching the dongeng: ' + error.message);
    }
  }
};
const handler = async (m, { args, command }) => {
  if (command === 'dongenglist') {
    try {
      const { total, posts } = await dongeng.list();
      const message = `✅ *Daftar Dongeng* (${total} total)\n\n` +
        posts.slice(0, 10).map((post, i) => `${i + 1}. ${post.title}\nLink: ${post.link}\n`).join('\n') +
        `\nKetik *.dongeng link* untuk membaca dongeng.`;

      m.reply(message);
    } catch (error) {
      m.reply(`gagwl: ${error.message}`);
    }
  }

  if (command === 'dongeng') {
    if (!args.length) {
      return m.reply('masukkan link dsri dongeng list.');
    }

    const url = args[0];
    try {
      const { title, author, storyContent } = await dongeng.getDongeng(url);
      const message = `📖 *${title}*\n✍️ *Penulis*: ${author}\n\n${storyContent.slice(0, 2000)}...\n\n` +
        'Cerita terlalu panjang? Buka di link berikut:\n' + url;
      
      m.reply(message);
    } catch (error) {
      m.reply(`${error.message}`);
    }
  }
};
handler.command = ['dongenglist', 'dongeng'];
handler.tags = ['internet'];
handler.help = ['dongenglist', 'dongeng link'];
export default handler;
