"use server"
import { updateToNextBillingCycle } from "@/lib/billing";
import { Booking } from "@/models/Booking";
import { mongoDb } from "@/utils/connectDB";
import dayjs from "dayjs";
import { revalidatePath } from "next/cache";

export async function processBilling () {

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

        revalidatePath("dashbaord/booking")
       
      
      } catch (error) {
        console.error("Error billing:", error);
    return { error: "Failed to update due to a server error" };
      }
      
}