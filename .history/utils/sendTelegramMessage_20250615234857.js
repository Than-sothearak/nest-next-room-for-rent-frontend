// utils/sendTelegramInvoice.js
import { bot } from "@/lib/telegramBot"; // Ensure bot is already initialized

export async function sendInvoiceToTelegram({ chatId, amount, dueDate }) {
  try {
    const formatted = `🧾 *Invoice Notification*\n\n💵 Amount: $${amount}\n📅 Due Date: ${new Date(dueDate).toLocaleDateString()}\n\n✅ Thank you for your payment!`;
    
    await bot.api.sendMessage(chatId, formatted, {
      parse_mode: "Markdown",
    });

    return { success: true };
  } catch (err) {
    console.error("Telegram send error:", err);
    return { error: "Failed to send invoice via Telegram." };
  }
}
