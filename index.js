const { Telegraf, Markup } = require('telegraf');
const axios = require('axios');
require('dotenv').config()

const bot = new Telegraf(process.env.TOKEN)

bot.start((ctx) => {
    try {
        ctx.replyWithHTML(`<b>Хай, ${ctx.message.chat.first_name} 👋👋</b>\n\n<em>Добро пожаловать в <b>Погодный бот</b>.\n\nПросто отправьте название своего города или деревни, и вы получите информацию о погоде.\n<b>Пример: Tashkent</b>\n\nПринес вам @telegraf_blog</em>`)
    } catch (e) { }
})

bot.command('about', async (ctx) => {
    try {
        ctx.replyWithHTML(
            "Привет, я только-только изучаю TelegrafJs и это мой один из первых ботов.",
            Markup.inlineKeyboard([
                [
                    Markup.button.url("Мой ютуб канал", 'https://youtube.com/c/uzbase'),
                ],
            ])
        )
    } catch (e) {
        console.log(e)
    }
})


bot.command('help', (ctx) => {
    try {
        ctx.reply("Просто отправьте название своего города или деревни, и вы получите прогноз погоды.\n\nЕсли вы столкнулись с какой-либо ошибкой или проблемой, отправьте сообщение @telegraf_blog")
    } catch (e) { }
});


bot.launch()