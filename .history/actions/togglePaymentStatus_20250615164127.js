"use server";
import { updateToNextBillingCycle } from "@/lib/billing";
import { Booking } from "@/models/Booking";
import { mongoDb } from "@/utils/connectDB";
import { revalidatePath } from "next/cache";

export async function togglePaymentStatus(id) {
  await mongoDb();

  try {
    if (!id) {
      return { error: "ID is required" };
    }

       const booking = await Booking.findById(id);

    if (!booking) {
      return { error: "Booking not found." };
    }

     // Toggle between "paid" and "unpaid"
    const newStatus = booking.paymentStatus === "paid" ? "unpaid" : "paid";

    booking.paymentStatus = newStatus;
    await updateToNextBillingCycle(booking)
    
    console.log(booking.paymentStatus === "paid" ? "paid" : "unpaid")
    
    revalidatePath('dashboard/booking')
    return { success: true, message: "Payment update successfully!" };
    

  } catch (err) {
    console.error("Error deleting...:", err);
    return { error: "Failed to delete user due to a server error" };
  }
}
