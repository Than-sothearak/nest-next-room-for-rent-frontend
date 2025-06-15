"use server"
import { NextResponse } from "next/server";
import { Booking } from "@/models/Booking";
import { mongoDb } from "@/utils/connectDB";
import dayjs from "dayjs";

export async function processBilling (params) {
     try {
        await mongoDb();
        const today = dayjs().startOf("day").toDate();
    
        const bookings = await Booking.find({
          paymentStatus: "paid",
          dueDate: { $lte: today },
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