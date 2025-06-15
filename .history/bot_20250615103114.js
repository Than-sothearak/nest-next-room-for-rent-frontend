require("dotenv").config(); // 👈 This loads the .env variables

const { Bot } = require("grammy");

const bot = new Bot(process.env.TELEGRAM_BOT_TOKEN); // ✅ Now using env variable

bot.command("start", (ctx) => ctx.reply("Welcome! Up and running."));
bot.on("message", (ctx) => ctx.reply("Got another message!"));

bot.start();
