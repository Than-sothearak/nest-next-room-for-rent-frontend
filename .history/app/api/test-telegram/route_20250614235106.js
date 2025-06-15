// pages/api/test-telegram.js

import { sendTelegramMessage } from "@/utils/sendTelegramMessage";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const chatId = req.query.chatId;
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
