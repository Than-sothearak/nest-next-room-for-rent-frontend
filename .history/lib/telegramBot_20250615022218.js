import { Bot } from "grammy";
import { mongoDb } from "@/utils/connectDB";
import { User } from "@/models/User";

export const bot = new Bot(process.env.TELEGRAM_BOT_TOKEN);

bot.command("start", async (ctx) => {
  console.log("User info:", ctx.from); // check this
  const userIdFromPayload = ctx.message.text.split(" ")[1];
  if (!userIdFromPayload) return ctx.reply("Missing user ID.");
  
  await mongoDb();
  await User.findByIdAndUpdate(userIdFromPayload, { telegramChatId: ctx.chat.id });

  await ctx.reply("✅ You are now connected to rent alerts.");
});

bot.start();
