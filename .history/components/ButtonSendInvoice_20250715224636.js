"use client";
import { sendInvoice } from "@/actions/sendInvoice";
import React, { useActionState, useEffect, useState } from "react";

const SendInvoiceButton = ({ bookingId, booking }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const sendInvoiceById = sendInvoice.bind(null, bookingId);

 
  const [state, action, isPending] = useActionState(sendInvoiceById, undefined);

   useEffect(() => {
    if (state?.success || state?.error) {
      setShowTooltip(true);
      const timer = setTimeout(() => setShowTooltip(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [state]);
  return (
    <form action={action} className="relative group inline-block">
      <button
        
        className={`whitespace-nowrap z-0 px-3 w-full py-1 rounded-md relative  ${
          isPending
            ? "bg-gray-400 cursor-wait opacity-50"
            : "bg-blue-600 text-white hover:bg-blue-300 hover:text-blue-900"
        } ${booking?.invoiceSent ? "opacity-50 cursor-not-allowed bg-slate-500" : ""}`}
      >
        {isPending ? (
          "Sending..."
        ) : booking?.invoiceSent ? (
          "Invoice sent"
        ) : (
          "Send Invoice"
        )}
      </button>
      {state?.error && showTooltip && (
        <div className={`z-20 absolute right-0 bg-red-100 text-red-800 border border-red-400 px-3 py-2 rounded shadow-lg w-full text-sm mt-2  ${state.error ? "opacity-100" : "opacity-0"}`}>
        {state.error}
        </div>
      )}
      {state?.success && showTooltip && (
        <p className="absolute right-0 bg-green-100 text-green-800 border border-green-400 px-3 py-2 rounded shadow-lg text-sm z-50 mt-2 ">
          {state.message || "Invoice sent successfully!"}
        </p>
      )}
    </form>
  );
};

export default SendInvoiceButton;
