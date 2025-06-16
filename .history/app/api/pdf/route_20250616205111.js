'use client';
import InvoicePDF from '@/components/InvoiceDocument';
import { PDFViewer } from '@react-pdf/renderer';

const PDFPreview = ({ data }) => {
  return (
    <PDFViewer width="100%" height="800">
      <InvoicePDF data={data} />
    </PDFViewer>
  );
};

export default PDFPreview;
