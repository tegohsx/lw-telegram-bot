# lw-telegram-bot
Lightweight NodeJS Telegram bot library

## Dependencies
1. express
2. queue

## Exports: bot, Telegram, app <br>
1. *bot* methods <br>
*init, start, command, text, message, kicked, callbackQueryData*. <br>

2. *Telegram* methods<br>
*sendMessage, sendSticker, sendPhoto, sendVideo, sendVoice, sendVideoNote, sendAudio, sendAnimation, sendDocument, deleteMessage, sendRaw, answerCallbackQuery*.<br>

3. *app*<br>
*app* is referenced to *express*

## Working with Context (ctx)
1. *ctx*: update <br>
2. *ctx.telegram*: reference to *Telegram* <br>
3. *ctx.message*: update message <br>
4. *ctx.chat*: reference to ctx.message.chat or ctx.callbackQuery.message.chat <br>
5. *ctx.chat_id*: reference to ctx.message.chat.id or ctx.callbackQuery.message.chat.id <br>
6. *ctx.replyWithText*: reply message <br>
7. *ctx.replyWithSticker*: reply message <br>
8. *ctx.replyWithPhoto*: reply message <br>
9. *ctx.replyWithVideo*: reply message <br>
10. *ctx.replyWithVoice*: reply message <br>
11. *ctx.replyWithVideoNote*: reply message <br>
12. *ctx.replyWithAudio*: reply message <br>
13. *ctx.replyWithAnimation*: reply message <br>
14. *ctx.replyWithDocument*: reply message <br>

Learn it with samples and this reference https://core.telegram.org/bots/api <br>
Happy learning....!!

## Donate
Paypal: tegohsx@gmail.com <br>
BRI: 000401061441500 <br>
Jago: 100310049829 <br>
DANA/GOPAY: 085290465350 <br>
u.p. Teguh S
