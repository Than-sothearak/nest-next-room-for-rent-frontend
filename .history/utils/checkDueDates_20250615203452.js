// scripts/checkDueDates.js
import { mongoDb } from "@/utils/connectDB";
import { Booking } from "@/models/Booking"; // your Mongoose model
import { sendTelegramMessage } from "@/utils/sendTelegramMessage";
import dayjs from "dayjs";

await mongoDb();

export async function sendMonthlyReminders() {
  const today = dayjs();
  const bookings = await Booking.find({ paymentStatus: "unpaid" });

  for (const booking of bookings) {
    const due = dayjs(booking.dueDate);
    const daysLeft = due.diff(today, "day");

    if (daysLeft <= 3 && !booking.reminderSent) {
      const message = `📢 *Rent Reminder*\n\nRoom: ${booking.room}\nGuest ID: ${booking.guestId}\nAmount: $${booking.price}\nDue Date: ${booking.dueDate}\n\nPlease pay before the deadline.`;

      await sendTelegramMessage(booking.telegramChatId, message);
      booking.reminderSent = true;
      await booking.save();
    }
  }
}
