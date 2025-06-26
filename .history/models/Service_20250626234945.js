import mongoose, { model, Schema, models } from "mongoose";
import { User } from "./User";
import { Room } from "./Room";
const ServiceSchema = new Schema({
  userId: { type: mongoose.Types.ObjectId, ref: User },
  roomId: { type: mongoose.Types.ObjectId, ref: Room },
  serviceType: { type: String, required: true }, // e.g., "Cleaning", "Maintenance"
  description: { type: String}, // Description of the service
  startDate: { type: Date, required: true },
  startTime: { type: String, required: true },
  price: { type: Number, required: true },
  status: { type: String, default: "padding" },
  note: { type: String },
  completedDate: { type: Date},
}, {
  timestamps: true,
});

export const Service = models.Service || model("Service",ServiceSchema);
