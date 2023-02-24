const express = require('express')
const queue = require('queue')
const app = express()

const job = queue({ results: [] })

"use strict"

let TOKEN = '',
    SECRET = '',
    Rate = 0,

    Telegram = {},
    NextUpdate = 0,
    botListen = [],
    bot = {}


bot.route = {}

//customize listen
bot.start = (callback) => {
    botListen.push((Context) => {
        if (Context.message.text.startsWith('/start')) {
            callback(Context)
            return true
        }
        return false
    })
}

bot.command = (cmd, callback) => {
    botListen.push((Context) => {
        if (Context.message.text.startsWith('/' + cmd)) {
            callback(Context)
            return true
        }
        return false
    })
}

bot.text = (text, callback) => {
    botListen.push((Context) => {
        if (Context.message.text.match(text)) {
            callback(Context)
            return true
        }
        return false
    })
}


bot.message = (callback) => {
    botListen.push((Context) => {
        if (Context.message) {
            callback(Context)
            return true
        }
        return false
    })
}

bot.callbackQueryData = (data, callback) => {
    botListen.push((Context) => {
        if (Context.callback_query.data.match(data)) {
            callback(Context)
            return true
        }
        return false
    })
}

bot.kicked = (callback) => {
    botListen.push((Context) => {
        if (Context?.my_chat_member?.new_chat_member.status == 'kicked') {
            callback(Context)
            return true
        }
        return false
    })
}

//telegram object
Telegram.sendMessage = async (chat_id, text, option = {}) => {
    let Post = {
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

Telegram.sendSticker = async (chat_id, sticker, option = {}) => {
    let Post = {
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

Telegram.sendPhoto = async (chat_id, photo, option = {}) => {
    let Post = {
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

Telegram.sendVideo = async (chat_id, video, option = {}) => {
    let Post = {
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

Telegram.sendVoice = async (chat_id, voice, option = {}) => {
    let Post = {
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

Telegram.sendVideoNote = async (chat_id, video_note, option = {}) => {
    let Post = {
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

Telegram.sendAudio = async (chat_id, audio, option = {}) => {
    let Post = {
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

Telegram.sendAnimation = async (chat_id, animation, option = {}) => {
    let Post = {
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

Telegram.sendDocument = async (chat_id, document, option = {}) => {
    let Post = {
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

Telegram.deleteMessage = async (chat_id, message_id) => {
    let Post = {
        chat_id,
        message_id
    }

    return new Promise((resolve, reject) => {
        sendAll('deleteMessage', Post, (err, res) => {
            if (err == null) {
                resolve(res)
            } else {
                reject(err)
            }
        })
    })

}

Telegram.answerCallbackQuery = async (callback_query_id, option = {}) => {
    let Post = {
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


Telegram.sendRaw = async (command, option = {}) => {
    let Post = {
        ...option
    }

    return new Promise((resolve, reject) => {
        sendAll(command, Post, (err, res) => {
            if (err == null) {
                resolve(res)
            } else {
                reject(err)
            }
        })
    })

}

bot.init = async (option, callback) => {
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
        getUpdates('', (err, result) => {
            if (err == null) {
                let UpdatesData = result
                if (UpdatesData.ok) {
                    let Updates = UpdatesData.result
                    if (Updates.length == 1) {
                        NextUpdate = Updates[0].update_id + 1
                        run_bot(Updates[0], callback)
                    } else {
                        Updates.forEach((update) => {
                            NextUpdate = update.update_id + 1
                            run_bot(update, callback)
                        })
                    }
                }
            }
        })
    }
}

bot.route.get = async (path, callback) => app.get('/' + SECRET + path, callback)
bot.route.put = async (path, callback) => app.put('/' + SECRET + path, callback)
bot.route.patch = async (path, callback) => app.patch('/' + SECRET + path, callback)
bot.route.delete = async (path, callback) => app.delete('/' + SECRET + path, callback)
bot.route.post = async (path, callback) => app.post('/' + SECRET + path, callback)
bot.route.head = async (path, callback) => app.head('/' + SECRET + path, callback)

bot = {
    ...bot,
    ...Telegram
}

const run_bot = async (req) => {
    let Update = req
    Update.message = Update.message || {}
    Update.message.text = Update.message.text || ''
    Update.message.chat = Update.message.chat || {}
    Update.callback_query = Update.callback_query || {}
    Update.callback_query.data = Update.callback_query.data || ''

    let Context = Update
    Context.telegram = Telegram

    if (Update?.my_chat_member) {
        Context.chat_id = Update.my_chat_member.chat?.id
        Context.chat = Update.my_chat_member.chat
    } else {
        Context.chat_id = Update.callback_query?.message?.chat?.id || Update.message.chat?.id
        Context.chat = Update.callback_query?.message?.chat || Update.message.chat
    }

    Context.replyWithText = async (text, options = {}) => {
        return Telegram.sendMessage(Context.chat_id, text, {
            ...options,
            reply_to_message_id: Context.message.message_id
        })
    }

    Context.replyWithSticker = async (sticker, options = {}) => {
        return Telegram.sendSticker(Context.chat_id, sticker, {
            ...options,
            reply_to_message_id: Context.message.message_id
        })
    }

    Context.replyWithPhoto = async (photo, options = {}) => {
        return Telegram.sendPhoto(Context.chat_id, photo, {
            ...options,
            reply_to_message_id: Context.message.message_id
        })
    }

    Context.replyWithVideo = async (video, options = {}) => {
        return Telegram.sendVideo(Context.chat_id, video, {
            ...options,
            reply_to_message_id: Context.message.message_id
        })
    }

    Context.replyWithVoice = async (voice, options = {}) => {
        return Telegram.sendVoice(Context.chat_id, voice, {
            ...options,
            reply_to_message_id: Context.message.message_id
        })
    }

    Context.replyWithVideoNote = async (video_note, options = {}) => {
        return Telegram.sendVideoNote(Context.chat_id, video_note, {
            ...options,
            reply_to_message_id: Context.message.message_id
        })
    }

    Context.replyWithAudio = async (audio, options = {}) => {
        return Telegram.sendAudio(Context.chat_id, audio, {
            ...options,
            reply_to_message_id: Context.message.message_id
        })
    }

    Context.replyWithAnimation = async (animation, options = {}) => {
        return Telegram.sendAnimation(Context.chat_id, animation, {
            ...options,
            reply_to_message_id: Context.message.message_id
        })
    }

    Context.replyWithDocument = async (document, options = {}) => {
        return Telegram.sendDocument(Context.chat_id, document, {
            ...options,
            reply_to_message_id: Context.message.message_id
        })
    }

    for (let cb of botListen) {
        if (cb(Context))
            break
    }

}

const sendAll = async (perintah, data, callback) => {
    if (Rate < 30) {
        job.push(async function () {

            try {
                Rate++
                let response = await fetch('https://api.telegram.org/bot' + TOKEN + '/' + perintah, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });

                let resJson = await response.json()

                if (typeof (callback) === 'function')
                    if (response.status < 200 || response.status > 299) {
                        callback({status: response.status, body: resJson})
                    } else {
                        callback(null, resJson)
                    }
            } catch (error){
                if (typeof (callback) === 'function')
                    callback(error)
            }
        })
    } else {
        setTimeout(() => sendAll(perintah, data, callback), 300)
    }
}

const getUpdates = async (offset, callback) => {
    fetch('https://api.telegram.org/bot' + TOKEN + '/getUpdates?offset=' + offset)
        .then((response) => response.json())
        .then((data) => {
            if (typeof (callback) === 'function')
                callback(null, data)
            setTimeout(() => getUpdates(NextUpdate, callback), 500)
        })
        .catch((error) => {
            if (typeof (callback) === 'function')
                callback(error)
            setTimeout(() => getUpdates(NextUpdate, callback), 500)
        });
}

job.timeout = 42;
job.autostart = true;

setInterval(() => {
    Rate = 0;
}, 1000)

module.exports = {
    bot, Telegram, app
}
