const Telegraf = require('telegraf')
const fetch = require('node-fetch')

const BOT_TOKEN = '747892200:AAESi-TqEW25rLjhgQvRaZrkXL80uBlDuNU';

const bot = new Telegraf(BOT_TOKEN)

bot.use(Telegraf.log())

async function spotifySearch (query = '', offset, limit) {
    const apiUrl = `https://api.spotify.com/v1/search?type=track&limit=${limit}&offset=${offset}&q=${encodeURIComponent(query)}`
    const response = await fetch(apiUrl)
    const { tracks } = await response.json()
    return tracks.items
}
  
bot.on('inline_query', async ({ inlineQuery, answerInlineQuery }) => {
    const offset = parseInt(inlineQuery.offset) || 0
    const tracks = await spotifySearch(inlineQuery.query, offset, 30)
    const results = tracks.map((track) => ({
        type: 'audio',
        id: track.id,
        title: track.name,
        audio_url: track.preview_url
    }))
    return answerInlineQuery(results, { next_offset: offset + 30 })
})

// Set telegram webhook
// npm install -g localtunnel && lt --port 3000
bot.telegram.setWebhook('https://curvy-zebra-51.localtunnel.me/secret-path')

// Start https webhook
bot.startWebhook('/secret-path', null, 3000)