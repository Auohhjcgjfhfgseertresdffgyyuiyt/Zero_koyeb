import fetch from 'node-fetch'

let handler = async (m, { conn, text, usedPrefix, command }) => {
  const animeList = [
    'akira', 'akiyama', 'anna', 'asuna', 'ayuzawa', 'boruto', 'chitanda', 'chitoge', 'deidara', 'doraemon',
    'elaina', 'emilia', 'erza', 'gremory', 'hestia', 'hinata', 'inori', 'isuzu', 'itachi', 'itori', 'kaga',
    'kagura', 'kakasih', 'kaori', 'kosaki', 'kotori', 'kuriyama', 'kuroha', 'kurumi', 'loli', 'madara', 'mikasa',
    'miku', 'minato', 'naruto', 'natsukawa', 'neko2', 'nekohime', 'nezuko', 'nishimiya', 'onepiece', 'pokemon',
    'rem', 'rize', 'sagiri', 'sakura', 'sasuke', 'shina', 'shinka', 'shizuka', 'shota', 'tomori', 'toukachan', 'tsunade'
  ]

  if (command == 'randomanime') {
    let listFormatted = animeList.map(v => `• ${v}`).join('\n')
    return m.reply(`Daftar karakter anime yang tersedia:\n${listFormatted}`)
  }

  if (animeList.includes(command)) {
    let res = await (await fetch(`https://raw.githubusercontent.com/KazukoGans/database/main/anime/${command}.json`)).json()
    let cita = res[Math.floor(Math.random() * res.length)]
    await conn.sendFile(m.chat, cita, 'image.jpg', `${command}`, m)
  }
}

handler.help = ['randomanime']
handler.tags = ['anime']
handler.command = /^randomanime$|^(akira|akiyama|anna|asuna|ayuzawa|boruto|chitanda|chitoge|deidara|doraemon|elaina|emilia|erza|gremory|hestia|hinata|inori|isuzu|itachi|itori|kaga|kagura|kakasih|kaori|kosaki|kotori|kuriyama|kuroha|kurumi|loli|madara|mikasa|miku|minato|naruto|natsukawa|neko2|nekohime|nezuko|nishimiya|onepiece|pokemon|rem|rize|sagiri|sakura|sasuke|shina|shinka|shizuka|shota|tomori|toukachan|tsunade)$/i
export default handler