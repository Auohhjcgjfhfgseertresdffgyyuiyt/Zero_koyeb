let handler = async (m, { conn, args, isAdmin, isOwner }) => {
    if (!m.isGroup) return m.reply("Fitur ini hanya dapat digunakan dalam grup.")
    if (!(isAdmin || isOwner)) return m.reply("Maaf, fitur ini hanya dapat digunakan oleh admin grup.")
    
    db.data.chats = db.data.chats || {}
    
    if (!db.data.chats[m.chat]) {
        db.data.chats[m.chat] = {}
    }
    
    if (!args[0]) return m.reply("Silakan gunakan: .antimedia *on/off*")
    
    if (args[0] === "on") {
        if (db.data.chats[m.chat].antimedia) return m.reply("Fitur *Anti Media* sudah aktif di grup ini.")
        db.data.chats[m.chat].antimedia = true
        return m.reply("*Anti Media* berhasil diaktifkan dalam grup ini.")
    } else if (args[0] === "off") {
        if (!db.data.chats[m.chat].antimedia) return m.reply("Fitur *Anti Media* sudah nonaktif di grup ini.")
        db.data.chats[m.chat].antimedia = false
        return m.reply("*Anti Media* berhasil dinonaktifkan dalam grup ini.")
    } else {
        return m.reply("Mohon pilih opsi yang valid: *on/off*")
    }
}

handler.before = async (m, { conn, isBotAdmin, isAdmin }) => {
    db.data.chats = db.data.chats || {}
    
    if (!db.data.chats[m.chat]) {
        db.data.chats[m.chat] = {}
    }

    if (!m.isGroup || !db.data.chats[m.chat].antimedia) return
    
    const isAntiMedia = (
        (m.mtype === 'imageMessage' || m.mtype === 'videoMessage') ||
        (m.quoted && (m.quoted.mtype === 'imageMessage' || m.quoted.mtype === 'videoMessage')) ||
        (m.message && (m.message.imageMessage || m.message.videoMessage))
    )
    
    if (!isAntiMedia) return
    
    await sleep(1500)
    await conn.sendMessage(m.chat, { delete: m.key })
}

handler.command = ['antimedia']
handler.help = ['antimedia'].map(a => a + ' *on/off*')
handler.tags = ['group']
handler.group = true
handler.admin = true

export default handler