// pages/api/test-telegram.js (or app/api/test-telegram/route.js for App Router)

import { sendTelegramMessage } from "@/utils/sendTelegramMessage";

export default async function handler(req, res) {
  const chatId = req.query.chatId; // pass chatId as query param
  if (!chatId) {
    return res.status(400).json({ error: "chatId is required" });
  }

  try {
    const message = "Hello from Next.js! This is a test message.";
    const telegramResponse = await sendTelegramMessage(chatId, message);
    res.status(200).json({ success: true, telegramResponse });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}
