import { createRequire } from "module";
import { fileURLToPath } from "url";
import fs from 'fs-extra'
import chalk from './modules/chalk.js';
const require = createRequire(import.meta.url);
const version = require("baileys/package.json").version;
import stringSimilarity from './modules/stringSimilarity.js'
 

//======== OWNER SETTINGS =======\\
global.nomerOwner = "6285701414272";
global.nomerOwner2 = "";
global.ownerName = "ᴍᴀsᴛɪʀᴏ 𖣘";
global.gender = 'Boys'
global.agama = 'Islam'
global.tanggalLahir = '17/12/1998' // contoh '25/11/1993'
global.hobi = 'ngoding'
global.sifat ='tukang satir'
global.tempatTinggal = 'karangayar-Jogja'
global.waifu = ''

//======= BOT SETTINGS ======\\
global.pairingCode = true // true / false
global.nomerBot = "6283879106234"
global.botName = "ᴢᴇʀᴏ ʙᴏᴛ ᴀɪ"
global.session = "session" 
global.runWith = "google"
global.language = "id"
global.Qoted = "ftoko" 
global.baileysMd = true
global.antiSpam = true
global.fake = botName
global.Console = false
global.print = true
global.copyright = `© ${botName}`
global.fake1 = "Extream"
global.packName = "+48699548681"
global.authorName = ''
global.autoblockcmd = false;
global.ownerBot = `${nomerOwner}@s.whatsapp.net`
global.gamewaktu = 60;
global.limitCount = 300;
global.Intervalmsg = 1000; //detik
global.mongodb ="mongodb+srv://zero:nfsmwrock123@zero.xb7cayv.mongodb.net/?retryWrites=true&w=majority"
global.dbName = "zero_koyeb"
global.redisdb = ''//'default:h9uWVPicTOatFOmZHsmyO4YJb83X5Pgy@redis-10292.c1.ap-southeast-1-1.ec2.cloud.redislabs.com:10292'//'default:nfsmwROCK909@redis-10292.c1.ap-southeast-1-1.ec2.cloud.redislabs.com:10292'
global.myUrl = "https://chat.whatsapp.com/LgFbUwdVzZz0KqyNHRJmnr"
global.newsletterJid = "120363307019082653@newsletter"
global.newsletterName = "ʙᴏᴛ ᴢᴇʀᴏ ᴀɪ"
global.gcounti = {
  prem: 600,
  user: 200,
};


global.Exif = {
  packId: "https://chat.whatsapp.com/LgFbUwdVzZz0KqyNHRJmnr",
  packName: "+48699548681",
  packPublish: `Open sewa bot 
  7 hari  = Rp 3k 
  15 hari = Rp 5k
  1 bulan = Rp 10k
  2 bulan = Rp 20k
  4 bulan = Rp 40k
  6 bulan = Rp 50k
  `,
  packEmail: "okeae2410@gmail.com",
  packWebsite: "https://dikaardnt.my.id",
  androidApp: "https://play.google.com/store/apps/details?id=com.bitsmedia.android.muslimpro",
  iOSApp: "https://apps.apple.com/id/app/muslim-pro-al-quran-adzan/id388389451?|=id",
  emojis: [],
  isAvatar: 0,
}

global.fotoRandom = [
  "https://telegra.ph/file/92faddad0ca3281bc460b.jpg",
  "https://telegra.ph/file/108e518694bc8eea2ade5.jpg",
  "https://telegra.ph/file/c69cbb374df4135f3ecf9.jpg",
  "https://telegra.ph/file/d1663c68b95c26863b32c.jpg",
  "https://telegra.ph/file/0bf48c29870522a4322ea.jpg",
  "https://telegra.ph/file/f958decfed51f8c190257.jpg",
  "https://telegra.ph/file/035cd0d0612512337dc9d.jpg",
  "https://telegra.ph/file/7359de8aa2446deb4f54c.jpg",
  "https://telegra.ph/file/c6b6d91683a0c60889171.jpg",
  "https://telegra.ph/file/6d2745e1fee36334650a8.jpg",
  "https://telegra.ph/file/ac77e1581a31f7fb49153.jpg",
];


global.apiMiftah = 'free'
global.apiNazmy = 'uhnKkdVjsVeICuI'
global.apiLolhuman = 'b94fcccb672a15cb7d58ee8f'
global.apiNekohime = '1bd7401d'
global.fileStackApi = "AlDgaKtdiT1iL6CwlXMpWz"; //daftar di filestack.com,api untuk menyimpan file
global.apiflash = "39fc26a0f40048eb838b8c35e0789947"; //
global.lolkey = 'b94fcccb672a15cb7d58ee8f'
global.xkey = 'b8040941f7'
global.rose = 'Rk-SkynktRS'
global.itsrose = 'Rk-SkynktRS' 
global.ibeng = 'FNqeWxPLJ6'
global.xyro = 'RrgGWkiUip'
global.neoxr = 'VCvULp'
global.zen = 'zenzkey_0eee9c69acbc'



global.multiplier = 38

/*============== EMOJI ==============*/
global.rpg = {
  emoticon(string) {
    string = string.toLowerCase();
    let emot = {
      level: "📊",
      limit: "🎫",
      health: "❤️",
      stamina: "⚡",
      exp: "✨",
      atm: "💳",
      money: "💰",
      bank: "🏦",
      potion: "🥤",
      diamond: "💎",
      rawdiamond: "💠",
      common: "📦",
      uncommon: "🛍️",
      mythic: "🎁",
      legendary: "🗃️",
      superior: "💼",
      pet: "🔖",
      trash: "🗑",
      armor: "🥼",
      sword: "⚔️",
      pickaxe: "⛏️",
      axe: "🪓",
      fishingrod: "🎣",
      kondom: "🎴",
      coal: "⬛",
      wood: "🪵",
      rock: "🪨",
      string: "🕸️",
      horse: "🐴",
      cat: "🐱",
      dog: "🐶",
      fox: "🦊",
      robo: "🤖",
      dragon: "🐉",
      petfood: "🍖",
      iron: "⛓️",
      rawiron: "◽",
      gold: "🪙",
      rawgold: "🔸",
      emerald: "❇️",
      upgrader: "🧰",
      bibitanggur: "🌱",
      bibitjeruk: "🌿",
      bibitapel: "☘️",
      bibitmangga: "🍀",
      bibitpisang: "🌴",
      anggur: "🍇",
      jeruk: "🍊",
      apel: "🍎",
      mangga: "🥭",
      pisang: "🍌",
      botol: "🍾",
      kardus: "📦",
      kaleng: "🏮",
      plastik: "📜",
      gelas: "🧋",
      chip: "♋",
      umpan: "🪱",
      skata: "🧩",
      defense: "🛡️",
      strength: "💪🏻",
      speed: "🏃",
      tbox: "🗄️",
    };
    let results = Object.keys(emot)
      .map((v) => [v, new RegExp(v, "gi")])
      .filter((v) => v[1].test(string));
    if (!results.length) return "";
    else return emot[results[0][0]];
  },
};



//============================================\\




async function similarity(one,two) {
const treshold = stringSimilarity.compareTwoStrings(one, two)
return treshold.toFixed(2)
}


async function reloadFile(file) {
file = file.url || file;
let fileP = fileURLToPath(file);
fs.watchFile(fileP, () => {
fs.unwatchFile(fileP);
console.log(
chalk.bgGreen(chalk.black("[ UPDATE ]")),
chalk.white(`${fileP}`)
);
import(`${file}?update=${Date.now()}`);
});
}

reloadFile(import.meta.url);


function transformText(text) {
  const charMap = {
    'A': 'ᴀ', 'B': 'ʙ', 'C': 'ᴄ', 'D': 'ᴅ', 'E': 'ᴇ', 'F': 'ғ', 'G': 'ɢ', 'H': 'ʜ', 'I': 'ɪ',
    'J': 'ᴊ', 'K': 'ᴋ', 'L': 'ʟ', 'M': 'ᴍ', 'N': 'ɴ', 'O': 'ᴏ', 'P': 'ᴘ', 'Q': 'ǫ', 'R': 'ʀ',
    'S': 's', 'T': 'ᴛ', 'U': 'ᴜ', 'V': 'ᴠ', 'W': 'ᴡ', 'X': 'x', 'Y': 'ʏ', 'Z': 'ᴢ',
    '0': '𝟶', '1': '𝟷', '2': '𝟸', '3': '𝟹', '4': '𝟺', '5': '𝟻', '6': '𝟼', '7': '𝟽', '8': '𝟾', '9': '𝟿'
  };

  return text.toUpperCase().split('').map(char => {
    return charMap[char] || char;
  }).join('');
}

function transformText2(text) {
  const charMap = {
    'A': 'ᴀ', 'B': 'ʙ', 'C': 'ᴄ', 'D': 'ᴅ', 'E': 'ᴇ', 'F': 'ғ', 'G': 'ɢ', 'H': 'ʜ', 'I': 'ɪ',
    'J': 'ᴊ', 'K': 'ᴋ', 'L': 'ʟ', 'M': 'ᴍ', 'N': 'ɴ', 'O': 'ᴏ', 'P': 'ᴘ', 'Q': 'ǫ', 'R': 'ʀ',
    'S': 's', 'T': 'ᴛ', 'U': 'ᴜ', 'V': 'ᴠ', 'W': 'ᴡ', 'X': 'x', 'Y': 'ʏ', 'Z': 'ᴢ',
    '0': '𝟶', '1': '𝟷', '2': '𝟸', '3': '𝟹', '4': '𝟺', '5': '𝟻', '6': '𝟼', '7': '𝟽', '8': '𝟾', '9': '𝟿'
  };

  return text.split('').map(char => {
    return charMap[char.toUpperCase()] || char;
  }).join(' ');
}


 


 


function getRandomFile (ext){
  return `${Math.floor(Math.random() * 10000)}${ext}`;
};

 function makeid(length){
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};



async function totalCase(filePath, command) {
  try {
    const data = await fs.readFile(filePath, 'utf8');

    let found = false;
    const lines = data.split('\n');
    lines.forEach((line) => {
      const caseMatch = line.match(/case\s+['"]([^'"]+)['"]/);
      if (caseMatch && caseMatch[1] === command) {
        found = true;
      }
    });

    return found;
  } catch (err) {
    throw err;
  }
}





const toFirstCase = (str) => {
  let first = str
  .split(" ") // Memenggal nama menggunakan spasi
  .map((nama) => nama.charAt(0).toUpperCase() + nama.slice(1)) // Ganti huruf besar kata-kata pertama
  .join(" ");
  
  return first;
  }

  const sleep = async (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  
  
  function tmp(file) {
    return file + ".tmp";
    }
    
    const Log = (text) => {
      console.log(text);
      };
      
      let d = new Date();
      let locale = "id";
      let gmt = new Date(0).getTime() - new Date("1 Januari 2021").getTime();
      let week = d.toLocaleDateString(locale, { weekday: "long" });
      const calender = d.toLocaleDateString("id", {
      day: "numeric",
      month: "long",
      year: "numeric",
      });
      
      function clockString(ms) {
        let months = isNaN(ms) ? "--" : Math.floor(ms / (86400000 * 30.44));
        let d = isNaN(ms) ? "--" : Math.floor(ms / 86400000);
        let h = isNaN(ms) ? "--" : Math.floor(ms / 3600000) % 24;
        let m = isNaN(ms) ? "--" : Math.floor(ms / 60000) % 60;
        let s = isNaN(ms) ? "--" : Math.floor(ms / 1000) % 60;
        let monthsDisplay = months > 0 ? months + " bulan, " : "";
        let dDisplay = d > 0 ? d + " hari, " : "";
        let hDisplay = h > 0 ? h + " jam, " : "";
        let mDisplay = m > 0 ? m + " menit, " : "";
        let sDisplay = s > 0 ? s + " detik" : "";
        let time = months > 0 ? monthsDisplay + dDisplay : d > 0 ? dDisplay + hDisplay : h > 0 ? hDisplay + mDisplay  : mDisplay + sDisplay
      
        return time;
      }
      
      
      
      
      
     
   



global.require = require;
global.reloadFile = (file) => reloadFile(file);
global.baileysVersion = `Baileys ${version}`;
global.similarity = (one,two) => similarity(one,two);
global.transformText = transformText
global.transformText2 = transformText2
global.getRandomFile = getRandomFile
global.makeid = makeid
global.totalCase = totalCase
global.toFirstCase = toFirstCase;
global.sleep = sleep;
global.tmp = tmp;
global.clockString = clockString;
global.week = week;
global.calender = calender;
global.Log = Log;
global.log = Log;   













