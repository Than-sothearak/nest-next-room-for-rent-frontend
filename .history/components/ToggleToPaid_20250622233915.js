"use client"
import { togglePaymentStatus } from "@/actions/togglePaymentStatus";
import React, { useActionState, useEffect, useState } from "react";
import { BiCheck, BiCheckCircle, BiCheckShield } from "react-icons/bi";

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
        disabled={isPending || status === "paid"}
        className={`${isPending ? 'cursor-not-allowed opacity-25': ""} px-3 py-1 rounded-full lg:mx-4 lg:my-2 ${
          status === "paid"
            ? "text-green-600 "
            : "bg-blue-200 text-blue-600 hover:bg-red-500 hover:text-red-100"
        }`}
      >
        {status === "paid" ? <BiCheckCircle size={24}/> : "Pay>"}
      </button>
    </form>
  );
};

export default ToggleToPaid;
