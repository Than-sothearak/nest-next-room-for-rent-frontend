import { Bot } from "grammy";
import { mongoDb } from "@/utils/connectDB";
import { User } from "@/models/User";

export const bot = new Bot(process.env.TELEGRAM_BOT_TOKEN);

bot.command("start", async (ctx) => {
  const userIdFromPayload = ctx.message.text.split(" ")[1]; // /start <userId>
  
  if (!userIdFromPayload) {
    return ctx.reply("❗Please connect from the dashboard.");
  }

  await mongoDb();

  const user = await User.findByIdAndUpdate(
    userIdFromPayload,
    { telegramChatId: ctx.chat.id },
    { new: true }
  );

  if (!user) {
    return ctx.reply("❌ User not found in database.");
  }

  await ctx.reply(`សូមស្វាគមន៍»  គណនីរបស់លោកអ្នកបានភ្ជាប់ជាមួយ អគ្គិសនីកម្ពុជា លេខសំគាល់អតិថិជន" ${user._id}`);
});

bot.command("stop", async (ctx) => {
  await mongoDb();
  await User.findOneAndUpdate(
    { telegramChatId: ctx.chat.id },
    { telegramChatId: null }
  );
  await ctx.reply("❌ You've unsubscribed from notifications.");
});

export async function POST(request) {
  const body = await request.json();
  try {
    // 🔧 Ensure the bot is initialized
    if (!bot.isInited()) {
      await bot.init();
    }

    await bot.handleUpdate(body);
  } catch (err) {
    console.error("Telegram bot error:", err);
  }

  // Respond quickly to Telegram with 200 OK
  return new Response("OK", { status: 200 });
}
