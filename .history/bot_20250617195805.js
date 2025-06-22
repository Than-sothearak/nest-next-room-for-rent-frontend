require("dotenv").config(); // 👈 This loads the .env variables

const { Bot } = require("grammy");

const bot = new Bot(process.env.TELEGRAM_BOT_TOKEN); // ✅ Now using env variable

bot.command("start", async (ctx) => {
  const userId = ctx.message.text.split(" ")[1]; // e.g., /start 123abc
  if (!userId) return ctx.reply("Missing user ID.");

  console.log(ctx)

  ctx.reply("✅ You’ve successfully linked your Telegram! /stop");
});

bot.on("message", (ctx) => ctx.reply("Got another message!"));

bot.start();


