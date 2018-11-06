const Telegraf = require('telegraf')
const Extra = require('telegraf/extra')
const Markup = require('telegraf/markup')

const BOT_TOKEN = '747892200:AAESi-TqEW25rLjhgQvRaZrkXL80uBlDuNU'
const bot = new Telegraf(BOT_TOKEN)

// Helpers
String.prototype.contains = function(words) {
    let wordMatches = 0
    const text = this.toLowerCase()
    for (let word of words) {
        if (Array.isArray(word)) {
            let optionOccurs = false
            for (let option of word) {
                optionOccurs = optionOccurs || text.match(option)
            }
            wordMatches += optionOccurs ? 1 : 0
        } else {
            wordMatches += text.match(word) ? 1 : 0
        }
    }
    return wordMatches == words.length
}

String.prototype.getNum = function() {
    return this.replace(/[^\d.]/g, '')
}

// Keyboards
const keyboard = Markup.inlineKeyboard([
  Markup.urlButton('❤️', 'http://telegraf.js.org'),
  Markup.callbackButton('Delete', 'delete')
])

// Events
bot.start((ctx) => {
    ctx.reply('Hello ' + ctx.message.from.first_name + ', IP4 the bot is ready to serve! 🤖')
})
bot.help((ctx) => ctx.reply('"We cannot help everyone, but everyone can help someone."\n- Ronald Raegan'))

// Actions
bot.action('delete', ({ deleteMessage }) => deleteMessage())

// Replies
bot.on('message', (ctx) => {
    // ctx.telegram.sendCopy(ctx.from.id, ctx.message, Extra.markup(keyboard))
    // ctx.telegram.sendMessage(ctx.from.id, 'kuntul')
    const text = ctx.message.text
    if (text.contains([['set', 'change'], 'daily', 'reminder'])) {
        const num = text.getNum()
        if (num) ctx.reply('Alright! We’ll remind you at ' + text.getNum() + ' everyday.')
        else ctx.reply('Please state when you would like to be reminded.')

    } else if (text.contains([['set', 'change'], 'class', 'reminder'])) {
        const num = text.getNum()
        if (num) ctx.reply('Alright! We’ll remind you ' + num + ' minutes before class.')
        else ctx.reply('Please state when you would like to be reminded.')

    } else if (text.contains([['set', 'change'], ['homework', 'quiz', 'deadline'], 'reminder'])) {
        const num = text.getNum()
        if (num) ctx.reply('Alright! We’ll remind you ' + num + ' hours before deadline.')
        else ctx.reply('Please state when you would like to be reminded.')

    } else if (text.contains(['what', 'sanction', ['plagiarism', 'copy', 'fraud']])) {
        ctx.replyWithHTML('Hi ' + ctx.message.from.first_name + ' 😁, Thank You for your question.. \nFraud, copy or plagiarism committed in any form of assessment of a course unit may lead to the <b>suspension</b> of the student\'s academic assessment for the period of one year, as well as to temporary suspension of his/her educational activities.')

    } else if (text.contains(['start', 'exercise'])) {
        ctx.replyWithHTML('Hi ' + ctx.message.from.first_name + '! Welcome to Subject Exercise for IP4 😁. \n\nThis Exercise is a fascinating challange you surely gonna love!\n\nAre you ready to go ? 😁\n\nPress the “subject” do want to start the exercise.')
    
    } else if (text.contains(['hello'])) {
        ctx.reply('Hello ' + ctx.message.from.first_name + '! 😁')
    } else {
        ctx.reply('Sorry, I don\'t understand that. ☹️')
    }
})

bot.startPolling()