"use server";
import { Booking } from "@/models/Booking";
import { mongoDb } from "@/utils/connectDB";

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



  } catch (err) {
    console.error("Error deleting...:", err);
    return { error: "Failed to delete user due to a server error" };
  }
}
