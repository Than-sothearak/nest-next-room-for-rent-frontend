import mongoose, { model, Schema, models } from "mongoose";
import { Category } from "./Category"; // reuse your Category schema if you have room categories

const RoomSchema = new Schema({
  roomNumber: { type: String, required: true, unique: true }, // e.g., "101" or "A12"
  description: { type: String },
  floor: {type: String, required: true},
  price: { type: Number, required: true },                    // rent price per period
  status: { type: String, enum: ["available", "booked", "maintenance"], default: "available" },
  imageUrls: [{ type: String }],
  category: { type: mongoose.Types.ObjectId, ref: Category }, // e.g., Single, Double
  properties: { type: Object },                               // amenities: {wifi: true, ac: true, ...}
  variants: { type: Object },                                 // e.g., bed sizes or views if any
  createdBy: { type: mongoose.Types.ObjectId, ref: "User" },  // owner/admin who created this room
}, {
  timestamps: true,
});

export const Room = models.Room || model("Room", RoomSchema);
