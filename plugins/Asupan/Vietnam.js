import fetch from 'node-fetch'

let handler = async (m, { conn, command }) => {
	let url = 'https://api.zeeoneofc.my.id/api/cecan/vietnam?apikey=36jLEpWh'
	m.reply(`Progress....`)
	await conn.sendMessage(m.chat, {
			image:await(await fetch(url)).buffer(),
			caption: "*Here ur image.*"
		}, { quoted: m })
}
handler.command = /^(vietnam)$/i
handler.tags = ['asupan']
handler.help = ['vietnam']
handler.register = false
handler.premium = false
handler.limit = true

export default handler