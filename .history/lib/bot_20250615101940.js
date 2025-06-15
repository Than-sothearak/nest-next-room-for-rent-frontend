// lib/bot.js
const { Bot } = require("grammy");
// const { connectToDB } = require("./connectDB");
// const { User } = require("../models/User");

const bot = new Bot(process.env.TELEGRAM_BOT_TOKEN);
console.log(bot)
bot.command("start", async (ctx) => {
  const chatId = ctx.chat.id;

  // await connectToDB();
  // await User.updateOne(
  //   { telegramId: chatId },
  //   {
  //     $set: {
  //       telegramId: chatId,
  //       username: ctx.from.username,
  //       firstName: ctx.from.first_name,
  //     },
  //   },
  //   { upsert: true }
  // );

  await ctx.reply("Welcome! You’ll receive monthly updates.");
});

module.exports = { runBot: async () => bot.start() };
