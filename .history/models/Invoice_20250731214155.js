import mongoose from "mongoose";

const invoiceSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  seq: { type: Number, default: 1 },
});

export const Invoice = mongoose.models.Invoice || mongoose.model("Invoice", invoiceSchema);
