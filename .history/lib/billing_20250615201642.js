// lib/billing.js
import dayjs from "dayjs";

export async function updateToNextBillingCycle(booking) {
  const newStart = dayjs(booking.startDate).add(1, "month");
  const newDue = dayjs(booking.endDate).add(1, "month");

  booking.startDate = newStart.toISOString();
  booking.endDate = newDue.toISOString();
  booking.paymentStatus = "unpaid";
  booking.reminderSent = false;

  await booking.save();
}
