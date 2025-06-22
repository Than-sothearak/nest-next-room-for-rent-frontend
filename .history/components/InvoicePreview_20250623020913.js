'use client';

import { PDFViewer } from '@react-pdf/renderer';
import InvoicePayment from './InvoicePayment';
import dynamic from "next/dynamic";


export default function InvoicePreview({ data }) {
  const PDFViewer = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFViewer),
  {
    ssr: false,
    loading: () => <p>Loading...</p>,
  },
);
  return (
    <div className="h-[90vh]">
      <PDFViewer width="100%" height="100%">
        <InvoicePayment data={data} />
      </PDFViewer>
    </div>
  );
}
