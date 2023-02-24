const { bot } = require('../index')

bot.start((ctx) => {
    ctx.telegram.sendMessage(ctx.chat_id, 'Welcome to *MyBot*', {
        parse_mode: 'markdown'
    })
})

bot.text('PING!!!', (ctx) => {
    ctx.replyWithText('PONG!!!').catch(err=>{
        console.log(err)
    })
})

bot.command('ping', (ctx) => {
    ctx.replyWithText('PONG!!!').catch(err=>{
        console.log(err)
    })
})

bot.init({
    secret_path: '',
    port: 2220, 
    token: '5696900399:AAFbNqgZ7AGF6OFGAz0VJV2z0f36zm_vArg',
    webhook: false
})
