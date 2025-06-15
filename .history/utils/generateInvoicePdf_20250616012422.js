// import fs from "fs";
// import path from "path";
// import { pdf } from "@react-pdf/renderer";

// export async function generateInvoicePdf(booking) {
//   const InvoiceDocument = (await import("@/components/InvoiceDocument")).default;

//   const pdfBuffer = await pdf(<InvoiceDocument booking={booking} />).toBuffer();

//   const invoicesDir = path.join(process.cwd(), "public", "invoices");
//   if (!fs.existsSync(invoicesDir)) fs.mkdirSync(invoicesDir);

//   const filePath = path.join(invoicesDir, `invoice-${booking._id}.pdf`);
//   fs.writeFileSync(filePath, pdfBuffer);
//   return filePath;
// }

import { renderToBuffer } from '@react-pdf/renderer';
import InvoiceDocument from '@/components/InvoiceDocument';

export async function generateInvoicePdf(invoiceData) {
  const buffer = await renderToBuffer(<InvoiceDocument data={invoiceData} />);
  return buffer;
}
