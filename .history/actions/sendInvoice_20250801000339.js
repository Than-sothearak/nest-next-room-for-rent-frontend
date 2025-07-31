// app/actions/sendInvoice.js
"use server";

import { auth } from "@/auth";
import { Booking } from "@/models/Booking";
import { mongoDb } from "@/utils/connectDB";
import { generateInvoicePdf } from "@/utils/generateInvoicePdf";
import { sendInvoiceToTelegram } from "@/utils/sendTelegramMessage";
import { revalidatePath } from "next/cache";

export async function sendInvoice(bookingId) {
  await mongoDb();
 const session = await auth();
  if (!session?.user?.isAdmin) {
    return { error: "Access denied!" };
  }

  if (!bookingId) return { error: "Booking ID required." };

    const booking = await Booking.findById(bookingId)
      .populate("userId")
        .populate({
    path: 'roomId',
    populate: { path: 'category' },
  })
  .populate('userId'); // if needed // must contain telegram info

       if (booking.invoiceSent) {
    return { error: "Invoice already sent." };
  }
  try {

    if (!booking || !booking.userId ) {
      return { error: "Booking or Telegram not found." };
    }

    const { telegramChatId } = booking.userId;
    if (!telegramChatId) {
      return { error: "User does not connect telegram." };
    }
    // const filePath = await generateInvoicePdf(booking);
    // const result = await sendInvoiceToTelegram(telegramChatId, filePath, booking);
    // if (result.error) {
    //   return { error: result.error };
    // }
    // Update booking status
    await Booking.findByIdAndUpdate(bookingId, {
      invoiceSent: true,
    });

    console.log("Invoice sent successfully via Telegram.")

    revalidatePath(`/dashboard/booking`);
    return { success: true, message: "Invoice sent successfully via Telegram." };

  } catch (err) {
    console.error("Send Invoice Error:", err);
    return { error: "Server error while sending invoice." };
  }
}
