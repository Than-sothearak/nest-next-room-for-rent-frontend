import mongoose, { model, Schema, models } from "mongoose";
import { Booking } from "./Booking";

const PaymentSchema = new Schema({
  bookingId: { type: mongoose.Types.ObjectId, ref: Booking, required: true },
  dueDate: { type: Date, required: true },        // e.g., 1st of each month
  amount: { type: Number, required: true },
  method: "manual",
  note: "Paid by admin",
  status: { type: String, enum: ["paid", "unpaid", "upcoming"], default: "upcoming" },
  paidAt: { type: Date }, // date when payment was made
}, {
  timestamps: true,
});

export const Payment = models.Payment || model("Payment", PaymentSchema);
