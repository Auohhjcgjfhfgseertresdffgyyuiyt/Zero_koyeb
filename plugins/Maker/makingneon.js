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

        let wk = await ephoto("https://en.ephoto360.com/making-neon-light-text-effect-with-galaxy-style-521.html", text);
        await conn.sendMessage(m.chat, { image: { url: wk }, caption: "*udah jadi nih kak*" },{quoted:m});
    } catch (e) {
        throw e
    }
};

handler.help = handler.command = ["makingneon"];
handler.tags = ["maker"];
handler.limit = true;

export default handler;
