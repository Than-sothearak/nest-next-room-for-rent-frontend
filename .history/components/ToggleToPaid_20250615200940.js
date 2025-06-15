"use client"
import { togglePaymentStatus } from "@/actions/togglePaymentStatus";
import React, { useActionState, useEffect, useState } from "react";

const ToggleToPaid = ({ item }) => {
    const [status, setStatus] = useState(item?.paymentStatus || "");

  useEffect(() => {
    setStatus(item?.paymentStatus); // respond to updated props
  }, [item?.paymentStatus]); // <-- key fix here

  const toggleToMakePayment = async () => {
    await togglePaymentStatus(item._id);
    // no local update; wait for parent to re-pass updated props
  };

  const [state, action, isPending] = useActionState(
      toggleToMakePayment,
      undefined
    );

  return (
    <form action={action}>
      <button
        disabled={isPending || !!status === "paid"}
        className={`${isPending ? 'cursor-not-allowed opacity-25': ""} px-3 py-1 rounded-md font-semibold ${
          status === "paid"
            ? "bg-green-500 text-white "
            : "bg-red-500 text-white"
        }`}
      >
        {status === "paid" ? "Paid" : "Unpaid"}
      </button>
    </form>
  );
};

export default ToggleToPaid;
