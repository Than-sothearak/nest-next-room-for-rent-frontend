import { togglePaymentStatus } from "@/actions/togglePaymentStatus";
import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";

const ToggleToPaid = ({ item }) => {
    const [status, setStatus] = useState(item?.paymentStatus || "");

  useEffect(() => {
    setStatus(item?.paymentStatus); // respond to updated props
  }, [item?.paymentStatus]); // <-- key fix here

  const toggleToMakePayment = async () => {
    await togglePaymentStatus(item._id);
    
    // no local update; wait for parent to re-pass updated props
  };

  return (
    <form action={toggleToMakePayment.bind(null, item._id)}>
      <button
    
        className={`px-3 py-1 rounded-md font-semibold ${
          status === "paid"
            ? "bg-green-500 text-white"
            : "bg-red-500 text-white"
        }`}
      >
        {status === "paid" ? "Paid" : "Unpaid"}
      </button>
    </form>
  );
};

export default ToggleToPaid;
