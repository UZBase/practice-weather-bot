const { Telegraf, Markup } = require('telegraf');
const axios = require('axios');
require('dotenv').config()

const bot = new Telegraf(process.env.TOKEN)

bot.start((ctx) => {
    try {
        ctx.replyWithHTML(`<b>Хай, ${ctx.message.chat.first_name} 👋👋</b>\n\n<em>Добро пожаловать в <b>Погодный бот</b>.\n\nПросто отправьте название своего города или деревни, и вы получите информацию о погоде.\n<b>Пример: Tashkent</b>\n\nПринес вам @telegraf_blog</em>`)
    } catch (e) { }
})



bot.launch()