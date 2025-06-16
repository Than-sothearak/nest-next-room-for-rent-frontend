'use client';
import { PDFViewer } from '@react-pdf/renderer';

const PDFPreview = ({ data }) => {
  return (
    <PDFViewer width="100%" height="800">
      <InvoiceDocument data={data} />
    </PDFViewer>
  );
};

export default PDFPreview;
