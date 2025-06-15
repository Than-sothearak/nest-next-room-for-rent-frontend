"use client";
import { sendInvoice } from "@/actions/sendInvoice";
import React, { useActionState } from "react";


const SendInvoiceButton = ({ bookingId }) => {

  const [state, action, isPending] = useActionState(sendInvoice, undefined);

  return (
    <form action={action}>
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
