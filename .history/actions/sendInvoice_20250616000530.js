// app/actions/sendInvoice.js
"use server";

import { Booking } from "@/models/Booking";
import { mongoDb } from "@/utils/connectDB";

export async function sendInvoice(bookingId) {
  await mongoDb();

  if (!bookingId) return { error: "Booking ID required." };

    const booking = await Booking.findById(bookingId)
      .populate("userId"); // must contain telegram info

       if (booking.invoiceSent) {
    return { error: "Invoice already sent." };
  }
  try {

    if (!booking || !booking.userId || !booking.userId.telegramChatId) {
      return { error: "Booking or Telegram chat ID not found." };
    }

    const { telegramChatId } = booking.userId;
    const result = await sendInvoiceToTelegram({
      chatId: telegramChatId,
      amount: booking.rent,
      dueDate: booking.dueDate,
    });

    if (result.error) return result;
    return { success: true, message: "Invoice sent successfully via Telegram." };

  } catch (err) {
    console.error("Send Invoice Error:", err);
    return { error: "Server error while sending invoice." };
  }
}
