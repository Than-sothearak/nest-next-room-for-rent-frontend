import { Bot } from "grammy";
import "dotenv/config";

const bot = new Bot(process.env.TELEGRAM_BOT_TOKEN); // ✅ Now using env variable

console.log("Telegram Bot Token:", process.env.TELEGRAM_BOT_TOKEN);

bot.start();