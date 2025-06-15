import { renderToBuffer } from '@react-pdf/renderer';
import InvoiceDocument from '@/components/InvoiceDocument';

export async function generateInvoicePdf(booking) {
  const buffer = await renderToBuffer(<InvoiceDocument data={booking} />);
  console.log(buffer)
  return buffer;
}
