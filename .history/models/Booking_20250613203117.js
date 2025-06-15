import mongoose, { model, Schema, models } from "mongoose";
import { User } from "./User";
import { Room } from "./Room";

const BookingSchema = new Schema({
  userId: { type: mongoose.Types.ObjectId, ref: User },
  roomId: { type: mongoose.Types.ObjectId, ref: Room },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  contract: { type: Number, required: true },
   rent: { type: Number, required: true },
    deposit: { type: Number, required: true },
  status: { type: String, default: "active" },
  notes: { type: String },
  files: [{ type: String }], // URLs or file names for uploaded files (images, pdf, etc.)
  total: { type: Number }, // total price // owner/admin who created this room
}, {
  timestamps: true,
});

export const Booking = models.Booking || model("Booking", BookingSchema);
