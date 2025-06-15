// utils/sendTelegramInvoice.js
import { bot } from "@/app/api/telegram-webhook/route";
import fs from "fs";

export async function sendInvoiceToTelegram(chatId, pdfBuffer, filename = 'invoice.pdf') {
  try {
    // const fileStream = fs.createReadStream(filePath);
    await bot.api.sendDocument(chatId, pdfBuffer, {
      caption: "🧾 Here is your invoice.",
    });
    return { success: true };
  } catch (err) {
    console.error("Telegram send error:", err);
    return { error: "Failed to send invoice via Telegram." };
  }
}
