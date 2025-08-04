import { Bot, webhookCallback } from "grammy";
import "dotenv/config";

const bot = new Bot(process.env.TELEGRAM_BOT_TOKEN); // ✅ Now using env variable

bot.command("start", (ctx) => ctx.reply("Hello from CommonJS bot!"));

bot.start()
