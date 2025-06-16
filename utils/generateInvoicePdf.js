import { renderToBuffer } from '@react-pdf/renderer';
import InvoiceDocument from '@/components/InvoiceDocument';

export async function generateInvoicePdf(booking) {
  const buffer = await renderToBuffer(<InvoiceDocument data={booking} />);
  if (!buffer) {
    throw new Error("Failed to generate PDF buffer.");
  }
  return buffer;
}
