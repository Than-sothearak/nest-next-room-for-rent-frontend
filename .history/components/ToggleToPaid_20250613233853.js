import { togglePaymentStatus } from "@/actions/togglePaymentStatus";
import React, { useEffect, useState } from "react";

const ToggleToPaid = ({ item }) => {
    const [status, setStatus] = useState(item?.paymentStatus || "");

  const toggleToMakePayment = async () => {
   await togglePaymentStatus();
    
  };
 useEffect(() => {
    setStatus(item?.paymentStatus)
 },[item])
  console.log(item)
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
