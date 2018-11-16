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

// BAD BOY = BAD SCORE
const bad_score = Markup.inlineKeyboard([
    ['Score Analytics'],
    ['']
])

// Keyboards
const keyboard = Markup.inlineKeyboard([
  Markup.urlButton('Details', 'http://telegraf.js.org'),
//   Markup.callbackButton('Delete', 'delete')
])

// Keyboards
const class_info = Markup.inlineKeyboard([
  Markup.urlButton('Click here to listen', 'http://telegraf.js.org'),
//   Markup.callbackButton('Delete', 'delete')
])

// Events
bot.start((ctx) => {
    ctx.reply('Hello ' + ctx.message.from.first_name + ', IP4 the bot is ready to serve! 🤖').then(() => {
        startReminders(ctx)
    })
})

bot.help((ctx) => ctx.reply('"We cannot help everyone, but everyone can help someone."\n- Ronald Raegan'))

// Actions
bot.action('delete', ({ deleteMessage }) => deleteMessage())

// Replies
bot.on('message', (ctx) => {
    const text = ctx.message.text
    if (text.contains([['get', 'see'], 'transcript'])) {
        ctx.reply('Here\'s your transcript!').then(() => {
            ctx.replyWithPhoto({ source: 'assets/transcript.png' })
        })
    } else if (text.contains([['set', 'change'], 'daily', 'reminder'])) {
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
    // } else if (text == 'a Depot' || text == 'a Port' || text == 'a CPU' || text == 'a Flash') {
        ctx.reply(ctx.message.from.first_name + ', You get 50 points in this exercise ☹️\n\nToo bad, you have to study harder ☹️');
    } else if (text == 'TTKI') {
        ctx.reply('This exercise is not available yet ☹️');
    } else if (text == 'KIMIA') {
        ctx.reply('This exercise is not available yet ☹️');
    } else if (text == 'ENGLISH') {
        ctx.reply('This exercise is not available yet ☹️');
    } else if (text.contains([['hello', 'halo']])) {
        ctx.reply('Hello ' + ctx.message.from.first_name + '! 😁')
    } else if (text.contains(['help'])) {
        ctx.reply('"We cannot help everyone, but everyone can help someone."\n- Ronald Raegan')
    } else if (text.contains(['thank you'])) {
        ctx.reply('You\'re welcome ' + ctx.message.from.first_name + '! 😁')
    } else if (text.contains(['class_info_demo'])) {
        ctx.replyWithPhoto({ source: 'assets/class_info1.png' })
        ctx.reply('Hi! Let me tell you your classes for today', Markup
            .keyboard([
                ['Yes, what are my classes for today?'],
                ['No, thank you!'],
            ])
            .oneTime()
            .resize()
            .extra()
        )
    } else if (text == 'Yes, what are my classes for today?') {
        ctx.reply('Here!')
        ctx.replyWithAudio({ source: 'assets/class_info2.m4a' })
        // ctx.replyWithAudio({ source: 'assets/class_info1.mp3' })
        // ctx.replyWithAudio({url: 'https://server.tld/file.mp3'})
    } else if (text == 'No, thank you!') {
        ctx.reply('Alright!')


    } else if (text.contains(['course'])){
        ctx.reply('Here some suggestion for your next semester', Extra.markup(keyboard))

    } else if (text == 'See Score History') {
        ctx.reply('Here\'s your score history!').then(() => {
            ctx.replyWithPhoto({ source: 'assets/score.png' })
        })
    } else if (text == 'Study Tips!' ){
        ctx.reply('Here\'s a cool video on study tips! https://www.youtube.com/watch?v=p60rN9JEapg')
    } else if (text == 'Nah, I\'m ok') {
        ctx.reply('Okay then, have a nice day!')
    } else {
        ctx.reply('Sorry, I didn\'t understand that. ☹️')
    }
})

// Time-based reminders
function startReminders(ctx) {
    setInterval(() => {
        const date = new Date()
        const day = date.getDay()
        const hours = date.getHours()
        const minutes = date.getMinutes()
        const seconds = date.getSeconds()

        // Class reminder
        // if (hours == 16 && minutes == 6 && seconds == 0) {
        if (seconds == 0) {
            const eventHours = '' + Math.floor(hours + (minutes + 30) / 60)
            const eventMinutes = '' + (minutes + 30) % 60
            ctx.reply('Don’t forget to attend AI lecture in Room 7606 at ' +
                    eventHours + ':' + eventMinutes.padStart(2, '0') + 'AM!')
        }
        // Homework/quiz deadline reminder
        // if (hours == 16 && minutes == 8 && seconds == 0) {
        if (seconds == 0) {
            ctx.reply('Don\'t forget your AI homework. It\'s due on November 7!', Extra.markup(keyboard))
        }
        // Class attendance reminder
        // if (day == 2 && hours == 16 && minutes == 8 && seconds == 0) {
        if (seconds == 0) {
            ctx.reply('Hi ' + ctx.message.from.first_name + ', watch out on your AI attendance, you only have 1 absence left!')
        }
        // Bad score reminder
        // if (day == 2 && hours == 16 && minutes == 8 && seconds == 0) {
        if (seconds == 0) {
            ctx.reply('Hi ' + ctx.message.from.first_name + ', it seems that you are struggling on AI, you need to improve your scores to get a decent grade!', Markup
                .keyboard([
                    ['See Score History'],
                    ['Study Tips!'],
                    ['Nah, I\'m ok']
                ])
                .oneTime()
                .resize()
                .extra())
        }

        if (seconds == 0) {
            ctx.reply('Hi ' + ctx.message.from.first_name + ', it seems that you are struggling on AI, you need to improve your scores to get a decent grade!', Extra.markup(keyboard))
        }
    }, 1000)
}

// Start the bot
bot.startPolling()