import InvoicePreview from "@/components/InvoicePreview";
import { Booking } from "@/models/Booking";
import { Payment } from "@/models/Payment";
import { mongoDb } from "@/utils/connectDB";
import React from "react";

export default async function InvoicePage(props) {
  await mongoDb();
  const params = await props.params;
  const id = await params.id;
  let data;
  const payment = JSON.parse(
    JSON.stringify(
      await Payment.findOne({ _id: id })
        .populate("userId")
        .populate("roomId")
        .populate("bookingId")
        .sort({ startDate: -1 })
    )
  );

  data = payment
  if (!payment) {

    data = JSON.parse(JSON.stringify(await Booking.findOne({ _id: id }).populate("userId")
      .populate("roomId")))
  }
 console.log(data)
  return (
    <div>
      <p className="text-center">Invoice page</p>
      <InvoicePreview data={data} />
    </div>
  );
}
