import mongoose from "mongoose";
import { boolean } from "zod";
const { model, Schema, models } = mongoose;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      minlength: 3,
      maxlength: 20,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      default: false, // Note: This sets it to "false" (string); use `default: ""` if you want an empty string
    },
    dateOfBirth: { type: Date },
    address: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    note: {
      type: String,
    },
    status: { type: String, default: "active" },
    imageUrl: {
      type: String,
    },
    telegramChatId: {
      type: String,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    isAdmin: { type: Boolean, default: false },
    loginCount: { type: Number, default: 0 },
    lastLogin: { type: Date },
    lastIP: {
      type: String,
    },
    location: {
      type: String, // Or you can use an object with country, city, etc.
      default: "",
    },
    lastSeen: { type: Date },
    lastUserAgent: {
      type: String,
    },
    deviceType: { type: String, default: "Desktop" },
    deviceModel: {
      type: String,
    },
    osName: {
      type: String,
    },
    browserName: {
      type: String,
    },
  },

  { timestamps: true }
);

export const User = models.User || model("User", userSchema);
