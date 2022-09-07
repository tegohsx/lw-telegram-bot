const { bot } = require('../index')
const command = require('./commad')

//calculate cube volume and surface area
bot.init({
    secret_path: '',
    port: 2220, 
    token: '5696900399:AAFbNqgZ7AGF6OFGAz0VJV2z0f36zm_vArg',
    webhook: false
},()=>{
    bot.start(command.start)
    bot.command('cubevolume', command.cubevolume)
    bot.command('cubesurfacearea', command.cubesurfacearea)
})