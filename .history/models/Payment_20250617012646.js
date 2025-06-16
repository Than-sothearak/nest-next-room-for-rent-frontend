import mongoose, { model, Schema, models } from "mongoose";
import { Booking } from "./Booking";
import { User } from "./User";

const PaymentSchema = new Schema({
  bookingId: { type: mongoose.Types.ObjectId, ref: Booking, required: true },
  userId: { type: mongoose.Types.ObjectId, ref: User, required: true },
  startDate: { type: Date, required: true },  
  dueDate: { type: Date, required: true },        // e.g., 1st of each month
  amount: { type: Number, required: true },
    method: { type: String, default: "manual" },     // ✅ Correct schema field
  note: { type: String, default: "Paid by admin" }, // ✅ Correct schema field
  status: { type: String, enum: ["paid", "unpaid", "upcoming"], default: "upcoming" },
  paidAt: { type: Date }, // date when payment was made
}, {
  timestamps: true,
});

export const Payment = models.Payment || model("Payment", PaymentSchema);
