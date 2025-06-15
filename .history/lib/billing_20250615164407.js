// lib/billing.js
import dayjs from "dayjs";

export async function updateToNextBillingCycle(booking) {
  const newStart = dayjs(booking.startDate).add(1, "month");
  const newDue = dayjs(booking.dueDate).add(1, "month");
console.log(newStart)
  booking.startDate = newStart.toISOString();
  booking.dueDate = newDue.toISOString();
  booking.paymentStatus = "lol";
  booking.reminderSent = false;

  await booking.save();
}
