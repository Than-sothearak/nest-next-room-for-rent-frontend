"use client";

import { PDFViewer } from "@react-pdf/renderer";
import InvoicePayment from "./InvoicePayment";

const InvoicePreview = ({ data }) => {
  return (
    <div className="mt-2">
      <PDFViewer width="100%" height={300}>
        <InvoicePayment data={data} />
      </PDFViewer>
    </div>
  );
};

export default InvoicePreview;
