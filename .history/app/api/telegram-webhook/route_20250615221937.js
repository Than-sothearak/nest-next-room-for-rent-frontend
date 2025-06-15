import { Bot } from "grammy";
import { mongoDb } from "@/utils/connectDB";
import { User } from "@/models/User";

export const bot = new Bot(process.env.TELEGRAM_BOT_TOKEN);

bot.command("start", async (ctx) => {
  const userIdFromPayload = ctx.message.text.split(" ")[1]; // /start <userId>
  console.log(userIdFromPayload)
  // if (!userIdFromPayload) {
  //   return ctx.reply("❗Please connect from the dashboard.");
  // }

  // await mongoDb();

  // const user = await User.findByIdAndUpdate(
  //   userIdFromPayload,
  //   { telegramChatId: ctx.chat.id },
  //   { new: true }
  // );

  // if (!user) {
  //   return ctx.reply("❌ User not found in database.");
  // }

  await ctx.reply("✅ You are now connected to rent alerts!");
});

bot.command("stop", async (ctx) => {
  await mongoDb();
  await User.findOneAndUpdate(
    { telegramChatId: ctx.chat.id },
    { telegramChatId: null }
  );
  await ctx.reply("❌ You've unsubscribed from notifications.");
});

export async function POST(req) {
  const body = await req.json();

  try {
    await bot.handleUpdate(body); // Handle all updates like /start, /stop
  } catch (err) {
    console.error("Telegram bot error:", err);
  }

  return new Response("OK");
}