import mongoose, { model, Schema, models } from "mongoose";
import { Category } from "./Category"; // reuse your Category schema if you have room categories
import { Booking } from "./Booking";

const RoomSchema = new Schema(
  {
    roomName: { type: String, required: true }, // e.g., "101" or "A12"
    description: { type: String },
    airConditionerCleanDate: {
      type: Date,
    },
    roomMaintenanceDate: {
      type: Date,
    },
    floor: { type: String, required: true },
    price: { type: Number, required: true },
    status: { type: Number },
    capacity: { type: Number },
    imageUrls: [{ type: String }],
    parentCategory: { type: mongoose.Types.ObjectId, ref: Category },
    category: { type: mongoose.Types.ObjectId, ref: Category }, // e.g., Single, Double
    properties: { type: Object }, // amenities: {wifi: true, ac: true, ...}
    variants: { type: Object }, // e.g., bed sizes or views if any
    createdBy: { type: mongoose.Types.ObjectId, ref: "User" }, // owner/admin who created this room
  },
  {
    timestamps: true,
  },
  RoomSchema.set("toObject", { virtuals: true }),
RoomSchema.set("toJSON", { virtuals: true })

);

// Virtual field "bookings" on Room
RoomSchema.virtual("bookings", {
  ref: "Booking",           // The model to use
  localField: "_id",        // Find bookings where 'room' field matches this Room _id
  foreignField: "roomId",     // Booking.room field is the foreign key
}


  
);

export const Room = models.Room || model("Room", RoomSchema);

