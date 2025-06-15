// app/api/telegram/webhook/route.js
import { Bot, webhookCallback } from "grammy";
import { connectDB } from "@/lib/db";
import { User } from "@/models/User";

const bot = new Bot(process.env.TELEGRAM_BOT_TOKEN);

// Handle /start command with userId
bot.command("start", async (ctx) => {
  const userId = ctx.message.text.split(" ")[1];
  // if (!userId) return ctx.reply("❌ Missing user ID.");

  // await connectDB();
  // const user = await User.findById(userId);
  // if (!user) return ctx.reply("❌ User not found.");

  // user.telegramId = ctx.from.id;
  // await user.save();


  ctx.reply("✅ Telegram linked successfully!");
});

// Export webhook handler
const handler = webhookCallback(bot, "next");

export async function POST(req) {
  const body = await req.json();
  const res = await handler(req, {
    headers: req.headers,
    body,
    method: "POST",
    url: "/api/telegram/webhook",
  });

  console.log(body)

  return new Response(null, { status: res.status });
}
