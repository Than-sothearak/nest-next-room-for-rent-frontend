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
