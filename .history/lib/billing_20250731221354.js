// lib/billing.js
import { Invoice } from "@/models/Invoice";
import dayjs from "dayjs";

export async function updateToNextBillingCycle(booking) {
  function getMonthString(date) {
  return dayjs(date).format("YYYY-MM"); // e.g. "2025-07"
}

  const newStart = dayjs(booking.startDate).add(1, "month");
  const newDue = dayjs(booking.dueDate).add(1, "month");

      let invoiceId = "1";
      let invoiceMonth
      const oldMonth = booking.invoiceMonth || getMonthString(booking.startDate);
      const newMonth = getMonthString(newStart);
 console.log(oldMonth !== newMonth)
      try {
        if (oldMonth !== newMonth) {
            const counter = await Invoice.findOneAndUpdate(
           { month: "invoice" },
           { $inc: { number: 1 } },
           { upsert: true, new: true }
         );
       
             invoiceId = String(counter.number).padStart(5, '0');
             console.log(invoiceId)
        }
      } catch (err) {
        console.log(err)
      }
      invoiceMonth = newMonth

  booking.startDate = newStart.toISOString();
  booking.dueDate = newDue.toISOString();
  booking.paymentStatus = "unpaid";
  booking.invoiceSent = false;
      booking.invoiceId = invoiceId;
    booking.invoiceMonth = newMonth;


  await booking.save();
}
