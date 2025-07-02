"use server"
import { updateToNextBillingCycle } from "@/lib/billing";
import { Booking } from "@/models/Booking";
import { mongoDb } from "@/utils/connectDB";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";

export async function processBilling () {
  const session = await auth();
    if (!session?.user?.isAdmin) {
        return console.log("Access denied!");
    }

dayjs.extend(utc);
dayjs.extend(timezone);
     try {
        await mongoDb();
        const today = dayjs().tz("Asia/Jakarta").startOf("day").toDate();
    
        const bookings = await Booking.find({
          // paymentStatus: "paid",
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