import { ephoto } from "../../lib/ephoto.js"

let handler = async (m, {
    conn,
    usedPrefix,
    command,
    text
}) => {
    if (!text)
        throw `Contoh: ${
 usedPrefix + command
 } Nasirxml`;
 
    try {

        let wk = await ephoto("https://en.ephoto360.com/write-in-sand-summer-beach-online-free-595.html", text);
        await conn.sendMessage(m.chat, { image: { url: wk }, caption: "*udah jadi nih kak*" },{quoted:m});
    } catch (e) {
        throw e
    }
};

handler.help = handler.command = ["summerbeach"];
handler.tags = ["maker"];
handler.limit = true;

export default handler;
