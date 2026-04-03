// Simpan semua plugin kamu di sini
const myPlugins = [
    {
        name: "aapldown.js",
        category: "Downloader",
        author: "ZennzXD",
        code: `/* 
 * Base : https://aapimusicdownloader.com
 * By : ZennzXD
 */

const axios = require('axios');
const headers = {
    'User-Agent': 'Mozilla/5.0 (Android 10; K)',
    'Accept': 'application/json'
};

async function aapldown(url) {
    // Isi kode scraper kamu...
    console.log("Downloading: " + url);
}`
    },
    {
        name: "tiktok.js",
        category: "Scraper",
        author: "ZennzXD",
        code: `// Kode TikTok Scraper
async function tiktok(url) {
    const res = await fetch(url);
    return res.json();
}`
    }
];
