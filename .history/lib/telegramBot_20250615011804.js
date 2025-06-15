// lib/telegramBot.js
import { Bot } from "grammy";
import { mongoDb } from "@/utils/connectDB"; // your MongoDB connector
import { User } from "@/models/User"; // your User model

const bot = new Bot(process.env.TELEGRAM_BOT_TOKEN);

// /start handler
bot.command("start", async (ctx) => {
  const userIdFromPayload = ctx.message.text.split(" ")[1]; // /start USERID
  if (!userIdFromPayload) return ctx.reply("Missing user ID.");

  await mongoDb();
  await User.findByIdAndUpdate(userIdFromPayload, {
    telegramChatId: ctx.chat.id,
  });

  await ctx.reply("✅ You are now connected to rent alerts.");
});

// /stop handler
bot.command("stop", async (ctx) => {
  await mongoDb();
  await User.findOneAndUpdate(
    { telegramChatId: ctx.chat.id },
    { telegramChatId: null }
  );
  await ctx.reply("❌ You have been unsubscribed from rent alerts.");
});

export { bot };
