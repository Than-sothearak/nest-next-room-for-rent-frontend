"use client";
import { sendInvoice } from "@/actions/sendInvoice";
import React, { useActionState, useEffect, useState } from "react";
import { BiCheck } from "react-icons/bi";

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
        disabled={isPending || booking?.invoiceSent}
        className={`px-3 py-1 rounded-md relative lg:mx-4 lg:my-2 ${
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
        <p className={`absolute left-0 mt-2 bg-red-100 text-red-800 border border-red-400 px-3 py-2 rounded shadow-lg w-full text-sm z-50  ${state.error ? "opacity-100" : "opacity-0"}`}>
        {state.error}
        </p>
      )}
      {state?.success && showTooltip && (
        <p className="absolute left-0 mt-2 bg-green-100 text-green-800 border border-green-400 px-3 py-2 rounded shadow-lg text-sm z-50 ">
          {state.message || "Invoice sent successfully!"}
        </p>
      )}
    </form>
  );
};

export default SendInvoiceButton;
