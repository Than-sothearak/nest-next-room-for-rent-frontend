import { togglePaymentStatus } from "@/actions/togglePaymentStatus";
import React, { useEffect, useState } from "react";

const ToggleToPaid = ({ item }) => {
    const [status, setStatus] = useState(item?.paymentStatus || "");

      useEffect(() => {
    setStatus(item?.paymentStatus);
  }, [item?.paymentStatus]);

  const toggleToMakePayment = async () => {
    await togglePaymentStatus();
  };

  return (
    <form action={toggleToMakePayment.bind(null, item._id)}>
      <button
        onClick={() => togglePaymentStatus(item?._id, item?.paymentStatus)}
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
