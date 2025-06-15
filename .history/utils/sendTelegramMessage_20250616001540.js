import { bot } from "@/app/api/telegram-webhook/route";
import fs from "fs";
import path from "path";

export async function sendInvoiceToTelegramPDF({ chatId, bookingId }) {
  try {
    const filePath = path.join(process.cwd(), "invoices", `${bookingId}.pdf`);

    // Check if PDF exists
    if (!fs.existsSync(filePath)) {
      return { error: "Invoice PDF not found." };
    }

    const fileStream = fs.createReadStream(filePath);

    await bot.api.sendDocument(chatId, {
      source: fileStream,
      filename: `Invoice-${bookingId}.pdf`,
    });

    return { success: true };
  } catch (err) {
    console.error("Telegram PDF send error:", err);
    return { error: "Failed to send PDF invoice via Telegram." };
  }
}