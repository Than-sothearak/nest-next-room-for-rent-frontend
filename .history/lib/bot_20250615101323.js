// lib/bot.js
import { Bot } from "grammy";
import { connectToDB } from "./connectDB";
import { User } from "@/models/User";

const bot = new Bot(process.env.TELEGRAM_BOT_TOKEN);

bot.command("start", async (ctx) => {
  const chatId = ctx.chat.id;

  // Save the user info and chatId
  await connectToDB();
  await User.updateOne(
    { telegramId: chatId },
    {
      $set: {
        telegramId: chatId,
        username: ctx.from.username,
        firstName: ctx.from.first_name,
      },
    },
    { upsert: true }
  );

  await ctx.reply("Welcome! You’ll receive monthly updates.");
});

// Run the bot once
export const runBot = async () => {
  try {
    await bot.start();
    console.log("Telegram bot started.");
  } catch (err) {
    console.error("Bot failed to start:", err);
  }
};
