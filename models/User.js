import mongoose from "mongoose";
import { boolean } from "zod";
const { model, Schema, models } = mongoose;

const userSchema = new Schema({
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
    dateOfBirth: 
    { type: Date },
  address: {
    type: String,
    required: true,
  },
  gender : {
    type: String,
    required: true,
  },
   note : {
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
}, { timestamps: true });

export const User = models.User || model("User", userSchema);