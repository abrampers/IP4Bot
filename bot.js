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

bot.command('onetime', ({ reply }) =>
  reply('One time keyboard', Markup
    .keyboard(['/simple', '/inline', '/pyramid'])
    .oneTime()
    .resize()
    .extra()
  )
)

bot.command('custom', ({ reply }) => {
  return reply('Custom buttons keyboard', Markup
    .keyboard([
      ['🔍 Search', '😎 Popular'], // Row1 with 2 buttons
      ['☸ Setting', '📞 Feedback'], // Row2 with 2 buttons
      ['📢 Ads', '⭐️ Rate us', '👥 Share'] // Row3 with 3 buttons
    ])
    .oneTime()
    .resize()
    .extra()
  )
})

bot.hears('🔍 Search', ctx => ctx.reply('Yay!'))
bot.hears('📢 Ads', ctx => ctx.reply('Free hugs. Call now!'))

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
        ctx.reply('Hi ' + ctx.message.from.first_name + '! Welcome to Subject Exercise for IP4 😁. \n\nThis Exercise is a fascinating challange you surely gonna love!\n\nAre you ready to go ? 😁\n\nPress the “subject” do want to start the exercise.', Markup
        .keyboard([
          ['TTKI', 'PTI'], 
          ['KIMIA', 'ENGLISH'], 
        ])
        .oneTime()
        .resize()
        .extra()
      )
    } else if (text == 'PTI') {
        ctx.reply('Do you know? When did personal computers become available?', Markup
            .keyboard([
              ['Before 1950'], 
              ['Between 1950 and 1965'],
              ['Between 1966 and 1990'], 
              ['Between 1991 and 2005'], 
            ])
            .oneTime()
            .resize()
            .extra()
          )
    } else if (text == 'Before 1950' || text == 'Between 1950 and 1965' || text == 'Between 1966 and 1990' || text == 'Between 1991 and 2005') {
        ctx.reply('Which of these technologies was developed most recently', Markup
            .keyboard([
              ['The mainframe computer'], 
              ['The laptop computer'],
              ['The netbook'], 
              ['The embedded computer'], 
            ])
            .oneTime()
            .resize()
            .extra()
          )
    } else if (text == 'The mainframe computer' || text == 'The laptop computer' || text == 'The netbook' || text == 'The embedded computer') {
        ctx.reply('Storage devices can be connected to the CPU and memory via ...', Markup
            .keyboard([
              ['Expansion slots'], 
              ['Ports'],
              ['Bays'], 
              ['All of the above'], 
            ])
            .oneTime()
            .resize()
            .extra()
          )
    } else if (text == 'Expansion slots' || text == 'Ports' || text == 'Bays' || text == 'All of the above') {
        ctx.reply('A computer’s internal bus can be connected to an external bus through ...', Markup
            .keyboard([
              ['a Depot'], 
              ['a CPU'],
              ['a Port'], 
              ['a Flash'], 
            ])
            .oneTime()
            .resize()
            .extra()
          )
    } else if (text == 'a Depot' || text == 'a Port' || text == 'a CPU' || text == 'a Flash') {
        ctx.reply('When you are working on an unsaved document on a PC, where is the document temporarily stored?', Markup
            .keyboard([
              ['RAM'], 
              ['ROM'],
              ['CPU'], 
              ['Internet'], 
            ])
            .oneTime()
            .resize()
            .extra()
          )
    } else if (text == 'a Depot' || text == 'a Port' || text == 'a CPU' || text == 'a Flash') {
        ctx.reply(ctx.message.from.first_name + ', You get 50 points in this exercise ☹️\n\nToo bad, you have to study harder ☹️');
    } else if (text == 'TTKI') {
        ctx.reply('This exercise is not available yet ☹️');
    } else if (text == 'KIMIA') {
        ctx.reply('This exercise is not available yet ☹️');
    } else if (text == 'ENGLISH') {
        ctx.reply('This exercise is not available yet ☹️');
    } else if (text.contains([['hello', 'halo', 'hi']])) {
        ctx.reply('Hello ' + ctx.message.from.first_name + '! 😁')
    } else {
        ctx.reply('Sorry, I don\'t understand that. ☹️')
    }
})

bot.startPolling()