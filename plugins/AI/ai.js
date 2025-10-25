import axios from 'axios'

const scrape = async (prompt) => {
  const { data } = await axios.post(
    'https://typli.ai/api/generators/completion',
    { prompt, temperature: 1.2 },
    {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      responseType: 'text'
    }
  )

  return data
    .split('\n')
    .filter(v => v.startsWith('0:'))
    .map(v => v.match(/0:"(.*)"/)?.[1] || '')
    .join('')
    .replace(/\\n/g, '\n')
    .trim()
}

const handler = async (m, { args }) => {
  if (!args[0]) return m.reply('Mw Tanya Apa')

  try {
    const result = await scrape(args.join(' '))
    m.reply(result)
  } catch (e) {
    m.reply(e.message)
  }
}

handler.help = ['ai']
handler.command = ['ai']
handler.tags = ['ai']

export default handler