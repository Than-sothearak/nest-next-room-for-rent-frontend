// app/api/telegram-webhook/route.js
import { bot } from "@/lib/telegramBot";
import { run } from "grammy/web";

export async function POST(req) {
  const body = await req.json();
  await run(bot, "webhook", { req: { body } });
  return new Response("OK");
}
