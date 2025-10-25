import axios from 'axios'
import FormData from 'form-data'

async function ihancer(buffer, {
    method = 1,
    size = 'low'
} = {}) {
    const _size = ['low', 'medium', 'high']

    if (!buffer || !Buffer.isBuffer(buffer)) throw new Error('Image buffer is required')
    if (method < 1 || method > 4) throw new Error('Available methods: 1, 2, 3, 4')
    if (!_size.includes(size)) throw new Error(`Available sizes: ${_size.join(', ')}`)

    const form = new FormData()
    form.append('method', method.toString())
    form.append('is_pro_version', 'false')
    form.append('is_enhancing_more', 'false')
    form.append('max_image_size', size)
    form.append('file', buffer, `rynn_${Date.now()}.jpg`)

    const { data } = await axios.post('https://ihancer.com/api/enhance', form, {
        headers: {
            ...form.getHeaders(),
            'accept-encoding': 'gzip',
            host: 'ihancer.com',
            'user-agent': 'Dart/3.5 (dart:io)'
        },
        responseType: 'arraybuffer'
    })

    return Buffer.from(data)
}

let handler = async (m, { conn, args }) => {
    try {
        const q = m.quoted ? m.quoted : m
        const mime = (q.msg || q).mimetype || ''

        if (!mime.startsWith('image/')) {
            return m.reply('Kirim gambar atau reply gambar yang ingin di-HD-kan.\n\nMethod: 1, 2, 3, 4\nSize: low, medium, high\n\n*Contoh:* .ihancer 2 high')
        }

        m.reply('⏳ Sedang memproses HD...')

        const buffer = await q.download()

        // Otomatis method 3 dan size high jika tidak ada args
        const method = args[0] ? parseInt(args[0]) : 3
        const size = args[1] || 'high'

        const enhanced = await ihancer(buffer, { method, size })

        const text = `✅ *Image Enhanced Successfully*\n\n• Method : ${method}\n• Size : ${size}\n• Original Size : ${(buffer.length / 1024).toFixed(2)} KB\n• Enhanced Size : ${(enhanced.length / 1024).toFixed(2)} KB`

        await conn.sendMessage(m.chat, {
            image: enhanced,
            caption: text
        }, { quoted: m })

    } catch (e) {
        m.reply('❌ Error: ' + e.message)
    }
}

handler.help = ['ihancer']
handler.command = ['ihancer', 'enhance', 'hd']
handler.tags = ['tools']

export default handler