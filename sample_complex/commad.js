const startcommand =  ctx => {
    ctx.telegram.sendMessage(ctx.chat_id,"Welcome to MyBot").catch(()=>false)
}

const cubevolume = ctx => {
    let a = ctx.message.text.substring(12)
    let v = a*a*a
    ctx.telegram.sendMessage(ctx.chat_id,`Volume: ${v}`).catch(()=>false)
}

const cubesurfacearea = ctx => {
    let a = ctx.message.text.substring(17)
    let A = 6*a
    ctx.telegram.sendMessage(ctx.chat_id,`Surface area: ${A}`).catch(()=>false)
}

module.exports = {
    cubevolume,
    cubesurfacearea,
    start: startcommand
}