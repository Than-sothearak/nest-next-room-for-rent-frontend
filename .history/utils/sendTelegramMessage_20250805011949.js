// utils/sendTelegramInvoice.js
import { bot } from "@/app/api/bot/route";
import { InputFile } from "grammy";
import { formatDate } from "./formatDate";

export async function sendInvoiceToTelegram(chatId, pdfBuffer, booking) {
  try {
    // Extract data
    const { rent, dueDate, startDate } = booking;
    const customer = booking.userId.username;
    const filename = `${formatDate(startDate)}_${formatDate(dueDate)}_Invoice.pdf`;
    // Convert buffer to InputFile with filename
    const inputFile = new InputFile(pdfBuffer, filename);

    if (!chatId) {
      throw new Error("User does not have a Telegram chat ID.");
    }

const message = `
<b>📢 Invoice Notification</b>\n
Dear <b>${customer}</b>,\n
Please find the attached invoice for <b>${formatDate(startDate)} – ${formatDate(dueDate)}</b>.
Kindly review and complete the payment at your earliest convenience.\n
Thank you.
Best regards.
`.trim();

    // Send message
    await bot.api.sendMessage(chatId, message, {
      parse_mode: "HTML",
    });

    if (inputFile) {
      await bot.api.sendDocument(chatId, inputFile, {
        caption: "🧾 Your invoice is attached.",
      });
    }

    return { success: true };
  } catch (err) {
    console.error("Telegram send error:", err);
    return { error: "Failed to send invoice via Telegram." };
  }
}

export async function sendMessageToTelegram(chatId, message) {
  try {
    if (!chatId) {
      throw new Error("User does not have a Telegram chat ID.");
    }

    await bot.api.sendMessage(chatId, message, {
      parse_mode: "HTML",
    });

    return { success: true };
  } catch (err) {
    console.error("Telegram send error:", err);
    return { error: "Failed to send message via Telegram." };
  }
}
