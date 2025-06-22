"use client";

import { PDFViewer } from "@react-pdf/renderer";
import InvoicePDF from "./InvoiceDocument"; // Your PDF document component

const InvoicePreview = ({ data }) => {
  return (
    <div className="mt-2">
      <PDFViewer width="100%" height={300}>
        <InvoicePDF data={data} />
      </PDFViewer>
    </div>
  );
};

export default InvoicePreview;
