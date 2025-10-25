import fetch from 'node-fetch'

let handler = async (m, { conn, command }) => {
	let url = 'https://api.zeeoneofc.my.id/api/cecan/korea?apikey=36jLEpWh'
m.reply(`Progress....`)
	await conn.sendMessage(m.chat, {
			image:await(await fetch(url)).buffer(),
			caption: "*Here ur image.*"
		}, { quoted: m })
}
handler.command = /^(korea)$/i
handler.tags = ['asupan']
handler.help = ['korea']
handler.register = false
handler.premium = false
handler.limit = true

export default handler