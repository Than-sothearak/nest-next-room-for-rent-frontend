// lib/billing.js
import { Booking } from "@/models/Booking";
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
 
      try {
        if (oldMonth !== newMonth) {
          // Need to assign new invoice ID for the new month
          const latestBookingInNewMonth = await Booking.findOne()
            .sort({ invoiceId: -1 })
            .exec();
  
          let nextInvoiceNumber = 1;
          if (latestBookingInNewMonth && latestBookingInNewMonth.invoiceId) {
            nextInvoiceNumber = parseInt(latestBookingInNewMonth.invoiceId, 10) + 1;
          }
          invoiceId = String(nextInvoiceNumber).padStart(5, '0');
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
