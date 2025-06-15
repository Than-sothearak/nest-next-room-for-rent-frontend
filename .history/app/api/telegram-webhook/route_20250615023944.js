// app/api/telegram-webhook/route.js
import { bot } from "@/lib/telegramBot";
import { run } from "grammy/out/composer";


export async function POST(request) {
  const body = await request.json();
  console.log("Received Telegram update:", body);

  // grammY handles the update here
  await run(bot, "webhook", { req: { body } });

  return new Response("OK");
}
