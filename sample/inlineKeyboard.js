const { bot, Telegram } = require('../index')

bot.start((ctx) => {
    ctx.telegram.sendMessage(ctx.chat_id, 'Welcome to *MyBot*', {
        parse_mode: 'markdown',
        reply_markup: {
            inline_keyboard: [
                [
                    {
                        text: 'Halo',
                        callback_data: 'tapHalo'
                    },
                    {
                        text: 'Hi',
                        callback_data: 'tapHiYou'
                    }
                ]
            ]

        }
    })
})

bot.callbackQueryData('tapHalo', (ctx)=>{
    Telegram.sendMessage(ctx.chat_id, 'You were tap Halo').catch(()=>false) //use catch to error handling
    // Telegram.sendMessage is equal to ctx.telegram.sendMessage
})

bot.callbackQueryData(/^tapHi/, (ctx)=>{
    ctx.telegram.sendMessage(ctx.chat_id, 'You were tap Hi').then((res)=>{
        console.log(res) //return fetch response
    }).catch((err)=>{
        console.log(err) //return fetch error
    })
})

bot.init({
    secret_path: '',
    port: 2220, 
    token: '5696900399:AAFbNqgZ7AGF6OFGAz0VJV2z0f36zm_vArg',
    webhook: false
})
