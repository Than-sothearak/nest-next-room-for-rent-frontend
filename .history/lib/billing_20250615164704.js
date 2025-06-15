// lib/billing.js
import dayjs from "dayjs";

export async function updateToNextBillingCycle(booking) {
  const newStart = dayjs(booking.startDate).add(1, "month");
  const newDue = dayjs(booking.dueDate).add(1, "month");
  console.log(newStart.toISOString())
  booking.startDate = newStart.toISOString();
  booking.dueDate = newDue.toISOString();
  booking.paymentStatus = "unpaid";
  booking.reminderSent = false;

  await booking.save();
}
