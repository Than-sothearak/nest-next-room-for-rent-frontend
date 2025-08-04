import { Bot, webhookCallback } from "grammy";
import "dotenv/config";

const token = process.env.TELEGRAM_BOT_TOKEN
if (!token) throw new Error("BOT_TOKEN is unset");
const bot = new Bot(token); // ✅ Now using env variable

export default webhookCallback(bot, "https");