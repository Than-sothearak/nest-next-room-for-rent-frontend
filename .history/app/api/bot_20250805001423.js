import { Bot } from "grammy";
import "dotenv/config";

const bot = new Bot(process.env.TELEGRAM_BOT_TOKEN); // ✅ Now using env variable

bot.start();