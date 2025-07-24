import mongoose, { model, Schema, models } from "mongoose";
import { Category } from "./Category";

const RoomSchema = new Schema(
  {
    roomName: { type: String, required: true },
    description: { type: String },
    airConditionerCleanDate: { type: Date },
    roomMaintenanceDate: { type: Date },
    floor: { type: String, required: true },
    price: { type: Number, required: true },
    status: { type: Number },
    capacity: { type: Number },
    imageUrls: [{ type: String }],
    parentCategory: { type: mongoose.Types.ObjectId, ref: Category },
    category: { type: mongoose.Types.ObjectId, ref: Category },
    properties: { type: Object },
    variants: { type: Object },
    createdBy: { type: mongoose.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

RoomSchema.set("toObject", { virtuals: true });
RoomSchema.set("toJSON", { virtuals: true });

RoomSchema.virtual("bookings", {
  ref: "Booking",
  localField: "_id",
  foreignField: "roomId",
});

export const Room = models.Room || model("Room", RoomSchema);
