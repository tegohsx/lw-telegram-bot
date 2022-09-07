const express = require('express')
const bodyParser = require("body-parser")
const axios = require('axios')

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

"use strict"

let TOKEN = '',
    SECRET = '',
    Rate = 0,
    Selected = 0,
    Update = {},
    Telegram = {},
    Context = {},
    Post = {},
    NextUpdate = 0,
    Updates = {},
    UpdatesData = {},
    bot = {}


bot.route = {}

Telegram.sendMessage = (chat_id, text, option = {}) => {
    Post = {
        chat_id,
        text,
        ...option
    }

    return new Promise((resolve, reject) => {
        sendAll('sendMessage', Post, (err, res) => {
            if (err == null) {
                resolve(res)
            } else {
                reject(err)
            }
        })
    })

}

Telegram.sendSticker = (chat_id, sticker, option = {}) => {
    Post = {
        chat_id,
        sticker,
        ...option
    }

    return new Promise((resolve, reject) => {
        sendAll('sendSticker', Post, (err, res) => {
            if (err == null) {
                resolve(res)
            } else {
                reject(err)
            }
        })
    })

}

Telegram.sendPhoto = (chat_id, photo, option = {}) => {
    Post = {
        chat_id,
        photo,
        ...option
    }

    return new Promise((resolve, reject) => {
        sendAll('sendPhoto', Post, (err, res) => {
            if (err == null) {
                resolve(res)
            } else {
                reject(err)
            }
        })
    })

}

Telegram.sendVideo = (chat_id, video, option = {}) => {
    Post = {
        chat_id,
        video,
        ...option
    }

    return new Promise((resolve, reject) => {
        sendAll('sendVideo', Post, (err, res) => {
            if (err == null) {
                resolve(res)
            } else {
                reject(err)
            }
        })
    })

}

Telegram.sendVoice = (chat_id, voice, option = {}) => {
    Post = {
        chat_id,
        voice,
        ...option
    }

    return new Promise((resolve, reject) => {
        sendAll('sendVoice', Post, (err, res) => {
            if (err == null) {
                resolve(res)
            } else {
                reject(err)
            }
        })
    })

}

Telegram.sendVideoNote = (chat_id, video_note, option = {}) => {
    Post = {
        chat_id,
        video_note,
        ...option
    }

    return new Promise((resolve, reject) => {
        sendAll('sendVideoNote', Post, (err, res) => {
            if (err == null) {
                resolve(res)
            } else {
                reject(err)
            }
        })
    })

}

Telegram.sendAudio = (chat_id, audio, option = {}) => {
    Post = {
        chat_id,
        audio,
        ...option
    }

    return new Promise((resolve, reject) => {
        sendAll('sendAudio', Post, (err, res) => {
            if (err == null) {
                resolve(res)
            } else {
                reject(err)
            }
        })
    })

}

Telegram.sendAnimation = (chat_id, animation, option = {}) => {
    Post = {
        chat_id,
        animation,
        ...option
    }

    return new Promise((resolve, reject) => {
        sendAll('sendAnimation', Post, (err, res) => {
            if (err == null) {
                resolve(res)
            } else {
                reject(err)
            }
        })
    })

}

Telegram.sendDocument = (chat_id, document, option = {}) => {
    Post = {
        chat_id,
        document,
        ...option
    }

    return new Promise((resolve, reject) => {
        sendAll('sendDocument', Post, (err, res) => {
            if (err == null) {
                resolve(res)
            } else {
                reject(err)
            }
        })
    })

}

Telegram.answerCallbackQuery = (callback_query_id, option = {}) => {
    Post = {
        callback_query_id,
        ...option
    }

    return new Promise((resolve, reject) => {
        sendAll('answerCallbackQuery', Post, (err, res) => {
            if (err == null) {
                resolve(res)
            } else {
                reject(err)
            }
        })
    })

}


bot.init = (option, callback) => {
    TOKEN = option.token || ''
    SECRET = option.secret_path || ''

    if (option.webhook) {
        app.get('/' + SECRET, function (req, res) {
            res.end('service running')
        })
        app.post('/' + SECRET, function (req, res) {
            run_bot(req.body, callback)
            res.end('ok');
        })
        app.listen(option.port, function () {
            console.log('App is running on port: ' + option.port);
        });
    } else {
        console.log('App is running.')
        getUpdates('',(err, result) => {
            if (err == null) {
                UpdatesData = result.data
                if (UpdatesData.ok) {
                    Updates = UpdatesData.result
                    if(Updates.length == 1){
                        NextUpdate = Updates[0].update_id+1
                        run_bot(Updates[0], callback)
                    } else {
                        Updates.forEach((update)=>{
                            NextUpdate = update.update_id+1
                            run_bot(update, callback)
                        })   
                    }
                }
            }
        })
    }
}

bot.start = (callback) => {
    if (Update.message.text.startsWith('/start') && Selected == 0) {
        callback(Context)
        Selected = 1
    }
}

bot.command = (cmd, callback) => {
    if (Update.message.text.startsWith('/' + cmd) && Selected == 0) {
        callback(Context)
        Selected = 1
    }
}

bot.text = (text, callback) => {
    if (Update.message.text.match(text) && Selected == 0) {
        callback(Context)
        Selected = 1
    }
}


bot.message = (callback) => {
    if (Update.message && Selected == 0) {
        callback(Context)
        Selected = 1
    }
}

bot.callbackQueryData = (data, callback) => {
    if (Update.callback_query.data.match(data) && Selected == 0) {
        callback(Context)
        Selected = 1
    }
}

bot.route.get = (path, callback) => app.get('/' + SECRET + path, callback)
bot.route.put = (path, callback) => app.put('/' + SECRET + path, callback)
bot.route.patch = (path, callback) => app.patch('/' + SECRET + path, callback)
bot.route.delete = (path, callback) => app.delete('/' + SECRET + path, callback)
bot.route.post = (path, callback) => app.post('/' + SECRET + path, callback)
bot.route.head = (path, callback) => app.head('/' + SECRET + path, callback)

bot = {
    ...bot,
    ...Telegram
}

const run_bot = (req, callback) => {
    Selected = 0;
    Update = req
    Update.message = Update.message || {}
    Update.message.text = Update.message.text || ''
    Update.message.chat = Update.message.chat || {}
    Update.callback_query = Update.callback_query || {}
    Update.callback_query.data = Update.callback_query.data || ''

    Context = Update
    Context.telegram = Telegram
    Context.chat_id = Update.callback_query?.message?.chat?.id || Update.message.chat.id
    Context.chat = Update.callback_query?.message?.chat || Update.message.chat

    Context.replyWithText = (text, options = {}) => {
        return Telegram.sendMessage(Context.chat_id, text, {
            ...options,
            reply_to_message_id: Context.message.message_id
        })
    }

    Context.replyWithSticker = (sticker, options = {}) => {
        return Telegram.sendSticker(Context.chat_id, sticker, {
            ...options,
            reply_to_message_id: Context.message.message_id
        })
    }

    Context.replyWithPhoto = (photo, options = {}) => {
        return Telegram.sendPhoto(Context.chat_id, photo, {
            ...options,
            reply_to_message_id: Context.message.message_id
        })
    }

    Context.replyWithVideo = (video, options = {}) => {
        return Telegram.sendVideo(Context.chat_id, video, {
            ...options,
            reply_to_message_id: Context.message.message_id
        })
    }

    Context.replyWithVoice = (voice, options = {}) => {
        return Telegram.sendVoice(Context.chat_id, voice, {
            ...options,
            reply_to_message_id: Context.message.message_id
        })
    }

    Context.replyWithVideoNote = (video_note, options = {}) => {
        return Telegram.sendVideoNote(Context.chat_id, video_note, {
            ...options,
            reply_to_message_id: Context.message.message_id
        })
    }

    Context.replyWithAudio = (audio, options = {}) => {
        return Telegram.sendAudio(Context.chat_id, audio, {
            ...options,
            reply_to_message_id: Context.message.message_id
        })
    }

    Context.replyWithAnimation = (animation, options = {}) => {
        return Telegram.sendAnimation(Context.chat_id, animation, {
            ...options,
            reply_to_message_id: Context.message.message_id
        })
    }

    Context.replyWithDocument = (document, options = {}) => {
        return Telegram.sendDocument(Context.chat_id, document, {
            ...options,
            reply_to_message_id: Context.message.message_id
        })
    }

    callback()
}

const sendAll = (perintah, data, callback) => {
    Rate++
    if (Rate < 25) {
        axios.post('https://api.telegram.org/bot' + TOKEN + '/' + perintah, data).then(result => {
            if (typeof (callback) === 'function')
                callback(null, result)
        }).catch(function (error) {
            if (typeof (callback) === 'function')
                callback(error)
        })
    } else {
        setTimeout(() => sendAll(perintah, data, callback), 667)
    }
}

const getUpdates = (offset, callback) => {
    axios.get('https://api.telegram.org/bot' + TOKEN + '/getUpdates?offset=' + offset).then(result => {
        if (typeof (callback) === 'function')
            callback(null, result)
            setTimeout(() => getUpdates(NextUpdate,callback), 500)
    }).catch(function (error) {
        if (typeof (callback) === 'function')
            callback(error)
            setTimeout(() => getUpdates(NextUpdate,callback), 500)
    })

}

setInterval(() => Rate = 0, 1000)

module.exports = {
    bot, Telegram, app
}