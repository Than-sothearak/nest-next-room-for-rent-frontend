import mongoose from "mongoose";

const invoiceSchema = new mongoose.Schema({
  month: { type: String, required: true, unique: true },
  number: { type: Number, default: 1 },
});

export const Invoice = mongoose.models.Invoice || mongoose.model("Invoice", invoiceSchema);
