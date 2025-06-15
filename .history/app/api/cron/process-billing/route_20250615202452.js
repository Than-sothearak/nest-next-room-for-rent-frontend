// app/api/cron/process-billing/route.js
import { NextResponse } from "next/server";
import dayjs from "dayjs";
import { mongoDb } from "@/utils/connectDB";
import { Booking } from "@/models/Booking";
import { updateToNextBillingCycle } from "@/lib/billing";

export async function GET() {
  try {
    await mongoDb();
    const today = dayjs().startOf("day").toDate();

    const bookings = await Booking.find({
      paymentStatus: "paid",
      endDate: { $lte: today },
      status: "active",
    });

    let updatedCount = 0;

    for (const booking of bookings) {
      await updateToNextBillingCycle(booking);
      updatedCount++;
    }
   
    return NextResponse.json({
      message: `✅ Processed ${updatedCount} bookings.`,
      
    }) 
  } catch (err) {
    console.error("Billing cron error:", err);
    return NextResponse.json({ error: "Failed to process billing." }, { status: 500 });
  }
  
}
