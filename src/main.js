import { Telegraf } from 'telegraf'
import { message } from 'telegraf/filters'
import 'dotenv/config'
import { chatGPT } from './chatGpt.js'
import { Loader } from './loader.js'

const bot = new Telegraf(process.env.TELEGRAM_TOKEN, { handlerTimeout: Infinity })

bot.command('start', ctx => {
    ctx.reply('Добро пожаловать! Спросите что вас интересует...')
})


bot.on(message('text'), async (ctx) => {
    const text = ctx.message.text;

    if (!text.trim()) return

    const loader = new Loader(ctx)
    loader.show()

    const { content } = await chatGPT(ctx.message.text)
    loader.hide()

    ctx.reply(content)
})

bot.launch()

// console.log(bot);