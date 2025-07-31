"use server";
import { auth } from "@/auth";
import { Booking } from "@/models/Booking";
import { Payment } from "@/models/Payment";
import { Room } from "@/models/Room";
import { mongoDb } from "@/utils/connectDB";
import { revalidatePath } from "next/cache";

export async function togglePaymentStatus(id) {
  await mongoDb();
const session = await auth();
  if (!session?.user?.isAdmin) {
    return console.log("Access denied! you are not admin");
  }
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

    await booking.save();

     const room = await Room.findById(booking.roomId).populate('category');
   
    // ✅ Only create Payment if new status is "paid"
    if (newStatus === "paid") {
      await Payment.create({
        bookingId: booking._id,
        roomId: booking.roomId,
        invoiceId: String(booking?.invoiceId).padStart(5, '0'),
        userId: booking.userId,
        startDate: booking.startDate,
        dueDate: booking.dueDate,
        amount: booking.rent,
        services: booking.properties,
        method: "manual",
        note: "Paid by admin",
        status: "paid",
        paidAt: new Date(),
        category: room.category?.category,
      });
    }

    revalidatePath("/dashboard/booking");
    return { success: true, message: "Payment updated successfully!" };

  } catch (err) {
    console.error("Error updating payment status:", err);
    return { error: "Failed to update payment status due to a server error." };
  }
}
