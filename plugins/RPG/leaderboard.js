import { areJidsSameUser } from "baileys"

const leaderboards = [
  "level", "exp", "limit", "money", "iron", "gold", "diamond", "emerald", "trash", "joinlimit",
  "potion", "petFood", "wood", "rock", "string", "common", "uncommon", "mythic", "legendary",
  "pet", "bank", "chip", "skata", "strength", "speed", "defense",
]

const fallbackThumb = 'https://qu.ax/mrjTz.jpg'

let handler = async (m, { conn, args, participants = [], usedPrefix, command }) => {
  if (!global.db?.data?.users) return m.reply("❌ Database pengguna tidak tersedia.")

  let users = Object.entries(global.db.data.users).map(([key, value]) => ({
    ...value,
    jid: key,
  }))

  let leaderboard = leaderboards.filter(v => v && users.some(user => user && user[v]))
  let type = (args[0] || "").toLowerCase()
  const getPage = (item) => Math.ceil(users.filter(user => user && user[item]).length / 5)

  let wrong = `🔖 ᴛʏᴩᴇ ʟɪsᴛ :
${leaderboard.map(v => `⮕ ${rpg.emoticon(v)} - ${v}`).join("\n")}
––––––––––––––––––––––––
💁🏻‍♂ ᴛɪᴩ :
⮕ ᴛᴏ ᴠɪᴇᴡ ᴅɪғғᴇʀᴇɴᴛ ʟᴇᴀᴅᴇʀʙᴏᴀʀᴅ:
${usedPrefix}${command} [type]
★ ᴇxᴀᴍᴩʟᴇ:
${usedPrefix}${command} legendary`.trim()

  let res = await fetch(fallbackThumb)
  let thumb = Buffer.from(await res.arrayBuffer())

  if (!leaderboard.includes(type)) {
    return await conn.reply(m.chat, "*––––『 𝙻𝙴𝙰𝙳𝙴𝚁𝙱𝙾𝙰𝚁𝙳 』––––*\n" + wrong, m, {
      contextInfo: {
        externalAdReply: {
          showAdAttribution: true,
          mediaType: 1,
          title: "",
          thumbnail: thumb,
          renderLargerThumbnail: true,
          sourceId: botName,
          sourceUrl: "",
        },
      },
    })
  }

  let page = isNumber(args[1]) ? Math.min(Math.max(parseInt(args[1]), 0), getPage(type)) : 0
  let sortedItem = users.map(toNumber(type)).sort(sort(type))
  let userItem = sortedItem.map(enumGetKey)

  let text = `
🏆 ᴘᴇʀɪɴɢᴋᴀᴛ: ${userItem.indexOf(m.sender) + 1} ᴅᴀʀɪ ${userItem.length} ᴜsᴇʀ

                *• ${rpg.emoticon(type)} ${type} •*

${sortedItem.slice(page * 5, page * 5 + 5).map((user, i) => {
  let nama = (user.registered ? user.name : conn.getName(user.jid)) || 'User'
  let link = `wa.me/${user.jid.split`@`[0]}`
  let isFromGroup = (Array.isArray(participants) ? participants : []).some(p => areJidsSameUser(user.jid, p.id))
  return `${i + 1}.*﹙${user[type]}﹚*- ${isFromGroup ? `${nama}\n${link}` : "ғʀᴏᴍ ᴏᴛʜᴇʀ ɢʀᴏᴜᴩ\n@" + user.jid.split`@`[0]}`
}).join`\n\n`}`.trim()

  return await conn.reply(m.chat, text, m, {
    contextInfo: {
      mentionedJid: [...userItem.slice(page * 5, page * 5 + 5)].filter(
        v => !(Array.isArray(participants) ? participants : []).some(p => areJidsSameUser(v, p.id))
      ),
      externalAdReply: {
        showAdAttribution: true,
        mediaType: 1,
        title: "",
        thumbnail: thumb,
        renderLargerThumbnail: true,
        sourceId: botName,
        sourceUrl: "",
      },
    },
  })
}

handler.help = ["leaderboard"].map(v => v + " <item>")
handler.tags = ["xp"]
handler.command = /^(leaderboard|lb|peringkat)$/i
handler.register = true
handler.group = true
handler.rpg = true

export default handler

function sort(property, ascending = true) {
  if (property)
    return (...args) =>
      args[ascending & 1][property] - args[!ascending & 1][property]
  else return (...args) => args[ascending & 1] - args[!ascending & 1]
}

function toNumber(property, _default = 0) {
  if (property)
    return (a, i, b) => ({
      ...b[i],
      [property]: a[property] === undefined ? _default : a[property],
    })
  else return (a) => (a === undefined ? _default : a)
}

function enumGetKey(a) {
  return a.jid
}

function isNumber(number) {
  if (!number) return number
  number = parseInt(number)
  return typeof number == "number" && !isNaN(number)
}