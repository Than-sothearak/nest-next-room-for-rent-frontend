"use client";

import { PDFViewer } from "@react-pdf/renderer";
import InvoicePayment from "./InvoicePayment";

const InvoicePreview = ({ data }) => {
  return (
 
      <PDFViewer width="100%" height={300}>
        <InvoicePayment data={data} />
      </PDFViewer>
  
  );
};

export default InvoicePreview;
