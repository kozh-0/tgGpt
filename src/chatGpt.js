import 'dotenv/config'
import OpenAI from 'openai';

const openAi = new OpenAI({ apiKey: process.env.CHAT_GPT_TOKEN })

const GPT_ROLES = {
    USER: 'user',
    ASSISTANT: 'assistant',
    SYSTEM: 'system',
    FUNCTION: 'function',
}

const getMessage = (m) => `Составь краткую подборку домашних блюд исходя из этого контекста: ${m}`

export async function chatGPT(msg = '') {
    const messages = [
        { role: GPT_ROLES.SYSTEM, content: 'Ты опытный шеф-повар, который генерирует предложения домашних блюд.' },
        { role: GPT_ROLES.USER, content: getMessage(msg) },
    ]
    try {
        const completion = await openAi.chat.completions.create({
            messages,
            model: 'gpt-3.5-turbo'
        })

        console.log(completion.choices);

        return completion.choices[0].message
    } catch (e) {
        console.error("Err", e.message);
    }
}