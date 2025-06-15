import { bot } from "@/lib/telegramBot";
import { run } from "grammy/web";

export async function POST(req) {
  const body = await req.json();
  console.log("Received update:", body); // <-- add this to debug

  await run(bot, "webhook", { req: { body } });
  return new Response("OK");
}
