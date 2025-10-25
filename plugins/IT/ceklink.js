import fetch from 'node-fetch'

let handler = async (m, { conn, usedPrefix, command }) => {

  let url = m.quoted && m.quoted.text

  if (!url) {

    await conn.reply(m.chat, 'Silakan reply pesan url.', m)

    return

  }

  let isLoginPage = await checkLoginPage(url)

  let detect = isLoginPage 

    ? 'Website ini memiliki elemen login atau meta tag mencurigakan. Hati-hati jika anda ingin memasuki web tersebut....' 

    : 'Website ini tidak terdeteksi memiliki elemen login atau meta tag mencurigakan.'

  await conn.reply(m.chat, detect, m)

}

async function checkLoginPage(url) {

  if (url.endsWith('.com')) {

    return false

  }

  let response = await fetch(url)

  let text = await response.text()

  const loginElements = ['<form', 'input type="password"', 'input type="email"', 'input type="text"']

  const suspiciousMeta = ['csrf-token', 'robots']

  for (let element of loginElements) {

    if (text.toLowerCase().includes(element)) {

      return true

    }

  }

  for (let meta of suspiciousMeta) {

    let metaTag = new RegExp(`<meta[^>]*name="${meta}"[^>]*>`, 'i')

    if (metaTag.test(text)) {

      return true

    }

  }

  return false

}

/** 

By: @FuadXyro

Sumber: https://whatsapp.com/channel/0029Vai9MMj5vKABWrYzIJ2Z

*/

handler.help = ['ceklink (reply)']

handler.tags = ['tools']

handler.limit = true

handler.command = /^(ceklink)$/i

export default handler