// utils/generateInvoicePdf.js
import fs from "fs";
import path from "path";

import React from "react";
import InvoiceDocument from "@/components/InvoiceDocument";
import { pdf, renderToFile } from "@react-pdf/renderer";

// Use dynamic import to prevent SSR/ESM issues
export async function generateInvoicePdf(booking) {
 
 console.log("--- Inside generateInvoicePdf ---");
  console.log("InvoiceDocument:", InvoiceDocument); // <--- Add this
  
  const invoiceElement = await renderToFile(<InvoiceDocument />,
     `${__dirname}/my-doc.pdf`);

if (!invoiceElement) {
    console.error("Error: invoiceElement is null or undefined after React.createElement.");
    throw new Error("Failed to create invoice element.");
  }

  const pdfBuffer = await pdf(invoiceElement).toBuffer();

//   const invoicesDir = path.join(process.cwd(), "public", "invoices");
//   if (!fs.existsSync(invoicesDir)) {
//     fs.mkdirSync(invoicesDir, { recursive: true });
//   }
c
//   const filePath = path.join(invoicesDir, `invoice-${booking._id}.pdf`);
//   fs.writeFileSync(filePath, pdfBuffer);
//   return filePath;
}
