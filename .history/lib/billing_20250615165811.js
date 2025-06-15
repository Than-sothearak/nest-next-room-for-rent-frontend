// lib/billing.js
import dayjs from "dayjs";

export async function updateToNextBillingCycle(booking) {
  const newStart = dayjs(booking.startDate).add(1, "month");
  const newDue = dayjs(booking.dueDate).add(1, "month");
  console.log(newStart.toISOString())
  console.log(newDue.toISOString())
  booking.startDate = newStart.toISOString();
  booking.endDate = newDue.toISOString();
  booking.reminderSent = false;

  await booking.save();
}
