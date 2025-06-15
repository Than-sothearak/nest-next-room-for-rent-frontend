"use server";
import { Booking } from "@/models/Booking";
import { Payment } from "@/models/Payment";
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
    const newStatus = booking.paymentStatus === "unpaid" ? "paid" : "unpaid";

    booking.paymentStatus = newStatus;
    console.log(ewStatus)
    // await booking.save();
    
    //  if (newStatus === "paid") {
    //   await Payment.create({
    //     bookingId: booking._id,
    //     dueDate: booking.dueDate, // assumed to exist
    //     amount: booking.rent,
    //     method: "manual",
    //     note: "Paid by admin",
    //     status: "paid",
    //     paidAt: new Date(),
    //   });
    // }

   
    revalidatePath('dashboard/booking')
    return { success: true, message: "Payment update successfully!" };
    

  } catch (err) {
    console.error("Error deleting...:", err);
    return { error: "Failed to delete user due to a server error" };
  }
}
