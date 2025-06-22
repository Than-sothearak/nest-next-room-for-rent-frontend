'use client';

import { PDFViewer } from '@react-pdf/renderer';
import InvoicePayment from './InvoicePayment';

export default function InvoicePreview({ data }) {
  return (
    <div className="h-[90vh]">
      <PDFViewer width="100%" height="100%">
        <InvoicePayment data={data} />
      </PDFViewer>
    </div>
  );
}
