const TelegramBot = require('node-telegram-bot-api');
require("dotenv/config");
// replace the value below with the Telegram token you receive from @BotFather
const token = process.env.TELEGRAMTOKEN;
// read the doc from https://github.com/yagop/node-telegram-bot-api to know how to catch the chatId
const chatId = process.env.CHATID;
console.log('this is the token: ', token)

const bot = new TelegramBot(token, { polling: false });

const telegrambot = (message, json) => {
  try {
    bot.sendMessage(chatId, message + '\n\n<pre>' + JSON.stringify(json, null, 2) + '</pre>', {
      parse_mode: 'html'
    });
  } catch (err) {
    console.log('Something went wrong when trying to send a Telegram notification', err);
  }
}



module.exports = telegrambot;