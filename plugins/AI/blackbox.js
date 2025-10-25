import fetch from 'node-fetch'


let handler = async (m, { q, conn, args, usedPrefix, command }) => {
    if (!q) return m.reply(`contoh ${prefix+command} apa kabar?`);
 
      const data = await JSON_URL('https://apizell.web.id/ai/blackbox?text='+q);
    m.reply(data.result.replace(/\*/g, ''))
   
  };
 
  handler.command = ["blackbox"];
  
  export default handler;
  


  async function JSON_URL(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('HTTP error! Status: ' + response.status);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching JSON:', error);
      return null;
    }
  }