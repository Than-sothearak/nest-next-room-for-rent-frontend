// utils/sendTelegramInvoice.js
import { bot } from "@/app/api/telegram-webhook/route";
import { InputFile } from "grammy";

export async function sendInvoiceToTelegram(chatId, pdfBuffer, filename = 'invoice.pdf') {
  try {
    // Convert buffer to InputFile with filename
    const inputFile = new InputFile(pdfBuffer, filename);

    await bot.api.sendDocument(chatId, inputFile, {
      caption: "🧾 Here is your invoice.",
    });

    return { success: true };
  } catch (err) {
    console.error("Telegram send error:", err);
    return { error: "Failed to send invoice via Telegram." };
  }
}
