import { Invoice } from "@/models/Invoice";

export async function getNextInvoiceId() {
  const result = await Invoice.findOneAndUpdate(
    { name: "invoiceId" },
    { $inc: { number: 1 } },
    { new: true, upsert: true }
  );

  return String(result.seq).padStart(5, "0"); // e.g., "000123"
}
