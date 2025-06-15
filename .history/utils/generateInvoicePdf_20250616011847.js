import { renderToBuffer } from '@react-pdf/renderer';
import InvoiceDocument from '@/components/InvoiceDocument';

export async function generateInvoicePdf(invoiceData) {
  const buffer = await renderToBuffer(<InvoiceDocument data={invoiceData} />);
  return buffer;
}
