// utils/generateInvoicePdf.js
import fs from "fs";
import path from "path";

import React from "react";
import InvoiceDocument from "@/components/InvoiceDocument";
import { pdf } from "@react-pdf/renderer";

// Use dynamic import to prevent SSR/ESM issues
export async function generateInvoicePdf(booking) {
 
 console.log("--- Inside generateInvoicePdf ---");
  console.log("InvoiceDocument:", InvoiceDocument); // <--- Add this
  
  const invoiceElement = React.createElement(InvoiceDocument, { booking });

//   const pdfBuffer = await pdf(invoiceElement).toBuffer();

//   const invoicesDir = path.join(process.cwd(), "public", "invoices");
//   if (!fs.existsSync(invoicesDir)) {
//     fs.mkdirSync(invoicesDir, { recursive: true });
//   }

//   const filePath = path.join(invoicesDir, `invoice-${booking._id}.pdf`);
//   fs.writeFileSync(filePath, pdfBuffer);
//   return filePath;
}
