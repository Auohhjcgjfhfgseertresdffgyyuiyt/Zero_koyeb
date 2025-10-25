// Text To Json✨

let handler = async (m, { conn, args, usedPrefix, command }) => {
    let query = `input text\nEx. *.${command}* hello world\n<command> <text>`;
    let text;
    
    if (args.length >= 1) {
        text = args.slice(0).join(" ");
    } else if (m.quoted && m.quoted.text) {
        text = m.quoted.text;
    } else throw query;

    await m.reply(wait);

    try {
        let jsonContent = JSON.stringify({ text: text }, null, 2);
        let buffer = Buffer.from(jsonContent, 'utf-8');
        let fileName = `text.json`;

        await conn.sendMessage(m.chat, {
            document: buffer,
            mimetype: 'application/json',
            fileName: fileName
        }, { quoted: m });

    } catch (e) {
        await m.reply('Error: ' + e.message);
    }
};

handler.help = ['texttojson'];
handler.tags = ['tools'];
handler.command = /^(texttojson)$/i;

export default handler;
/*
SCRIPT BY © VYNAA VALERIE 
•• recode kasih credits 
•• contacts: (t.me/VLShop2)
•• instagram: @vynaa_valerie 
•• (github.com/VynaaValerie) 
*/