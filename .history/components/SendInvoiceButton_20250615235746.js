"use client";
import React, { useActionState } from "react";

// Simulated server action to send invoice (you'll replace this with real one)
async function sendInvoice(id) {

  // Normally you'd send email or Telegram here
  console.log(`Invoice sent to booking ID: ${id}`);
  return { success: true, message: "Invoice sent successfully." };
}

const SendInvoiceButton = ({ bookingId }) => {
  const send = async () => {
    return await sendInvoice(bookingId);
  };

  const [state, action, isPending] = useActionState(send, undefined);

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
