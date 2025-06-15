// app/actions/sendInvoice.js
"use server";

import InvoiceDocument from "@/components/InvoiceDocument";
import { Booking } from "@/models/Booking";
import { mongoDb } from "@/utils/connectDB";
import { generateInvoicePdf } from "@/utils/generateInvoicePdf";
import { sendInvoiceToTelegram } from "@/utils/sendTelegramMessage";
import ReactPDF, { renderToStream } from '@react-pdf/renderer';
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

    await renderToStream(<InvoiceDocument />);

    const filePath = await generateInvoicePdf(booking);
//   const result = await sendInvoiceToTelegram(telegramChatId, filePath);
   


    return { success: true, message: "Invoice sent successfully via Telegram." };

  } catch (err) {
    console.error("Send Invoice Error:", err);
    return { error: "Server error while sending invoice." };
  }
}
