const Telegraf = require('telegraf')
const Extra = require('telegraf/extra')
const Markup = require('telegraf/markup')

const BOT_TOKEN = '747892200:AAESi-TqEW25rLjhgQvRaZrkXL80uBlDuNU'
const bot = new Telegraf(BOT_TOKEN)

// Helpers
String.prototype.contains = function(words) {
    if (this.trim().split(' ').length >= words.length) {
        let wordsMatch = true
        const text = this.toLowerCase()
        for (let word of words) {
            if (Array.isArray(word)) {
                let optionOccurs = false
                for (let option of word) {
                    optionOccurs = optionOccurs || text.match(option)
                }
                wordsMatch = wordsMatch && optionOccurs
            } else {
                wordsMatch = wordsMatch && text.match(word)
            }
        }
        return wordsMatch
    } else {
        return false
    }
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
    if (text.contains([[/(set)/i, /(change)/i], /(daily)/i, /(reminder)/i, ])) {
        const num = text.replace ( /[^\d.]/g, '' );
        ctx.reply('Alright! We’ll remind you at ' + num + ' everyday.')
    } else if (text.contains([[/(set)/i, /(change)/i], /(class)/i, /(reminder)/i])) {
        const num = text.replace ( /[^\d.]/g, '' );
        ctx.reply('Alright! We’ll remind you ' + num + ' minutes before class.')
    } else if (text.contains([[/(set)/i, /(change)/i], /(deadline)/i, /(reminder)/i])) {
        const num = text.replace ( /[^\d.]/g, '' );
        ctx.reply('Alright! We’ll remind you ' + num + ' hours before deadlines.')
    } else if (text.contains([[/(set)/i, /(change)/i], [/(homework)/i, /(quiz)/i, /(deadline)/i], /(reminder)/i])) {
        ctx.reply('HWQ reminder')
    } else if (text.contains([/(what)/i, /(sanction)/i, [/(plagiarism)/i, /(copy)/i, /(fraud)/i]])) {
        ctx.replyWithHTML('Hi ' + ctx.message.from.first_name + ' 😁, Thank You for your question.. \nFraud, copy or plagiarism committed in any form of assessment of a course unit may lead to the <b>suspension</b> of the student\'s academic assessment for the period of one year, as well as to temporary suspension of his/her educational activities.')
    } else if (text.contains([/(start)/i, /(exercise)/i])) {
        ctx.replyWithHTML('Hi ' + ctx.message.from.first_name + '! Welcome to Subject Exercise for IP4 😁. \n\nThis Exercise is a fascinating challange you surely gonna love!\n\nAre you ready to go ? 😁\n\nPress the “subject” do want to start the exercise.')
    } else {
        ctx.reply('Sorry, I don\'t understand that. ☹️')
    }
})

bot.startPolling()