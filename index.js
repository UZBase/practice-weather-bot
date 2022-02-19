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

bot.on('message', async (ctx) => {
    try {
        let weather = (await axios.get(`${process.env.API}${ctx.message.text}`))
        
        if (weather.data.error === null && weather.data.result.length !== 0) {
            var data = weather.data.result[0]
            ctx.replyWithHTML(`Сегодняшняя погода в <b><u>${data.location.name}</u></b>\n\n<b>${data.current.skytext}</b>\n\nТекущая температура: <b>${data.current.temperature} °C</b>\nКак будто: <b>${data.current.feelslike} °C</b>\nВлажность : <b>${data.current.humidity} %</b><em>\n\nПринес вам @telegraf_blog</em>`);
        } else {
            ctx.reply("Извините, ничего не найдено.\n\nПожалуйста, отправьте название вашего города/деревни еще раз.\nУбедитесь, что в названии вашего города/деревни есть пробел, или попробуйте указать название большого города рядом с вами.\n\nЕсли возникла эта проблема продолжает отправлять сообщение на @telegraf_blog.");
        }
    } catch (error) {
        
    }
})
bot.launch()