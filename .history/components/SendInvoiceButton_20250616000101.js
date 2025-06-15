"use client";
import { sendInvoice } from "@/actions/sendInvoice";
import React, { useActionState } from "react";


const SendInvoiceButton = ({ bookingId }) => {
  const sendInvoiceById = async (id) => {
 
    await sendInvoice(id);
  };

  const [state, action, isPending] = useActionState(se, undefined);

  return (
    <form action={ sendInvoiceById.bind(null, bookingId)}>
      <button
        disabled={isPending}
        className={`px-3 py-1 rounded-md font-semibold ml-2 ${
          isPending
            ? "bg-gray-400 cursor-wait opacity-50"
            : "bg-blue-600 text-white"
        }`}
      >
        {isPending ? "Sending..." : "Send Invoice"}
      </button>
    </form>
  );
};

export default SendInvoiceButton;
