// utils/generateInvoicePdf.js
import fs from "fs";
import path from "path";
import { pdf } from "@react-pdf/renderer";
import InvoiceDocument from "@/components/pdf/InvoiceDocument";

// Generate PDF and save to /invoices folder
export async function generateInvoicePdf(booking) {
  const pdfBuffer = await pdf(<InvoiceDocument booking={booking} />).toBuffer();

  const filePath = path.join(process.cwd(), "invoices", `invoice-${booking._id}.pdf`);
  fs.writeFileSync(filePath, pdfBuffer);

  return filePath;
}
