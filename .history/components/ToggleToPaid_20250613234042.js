import { togglePaymentStatus } from "@/actions/togglePaymentStatus";
import React, { useEffect, useState } from "react";

const ToggleToPaid = ({ item }) => {
    const [status, setStatus] = useState(item?.paymentStatus || "");

   const toggleToMakePayment = async () => {
    const updatedStatus = await togglePaymentStatus(item._id); // Make sure this returns "paid"/"unpaid"
    setStatus(updatedStatus); // Update local state
  };

 useEffect(() => {
    setStatus(item?.paymentStatus)
 },[item])
  console.log(item)
  return (
     <button
      onClick={toggleToMakePayment}
      className={`px-3 py-1 rounded-md font-semibold ${
        status === "paid" ? "bg-green-500 text-white" : "bg-red-500 text-white"
      }`}
    >
      {status === "paid" ? "Paid" : "Unpaid"}
    </button>
  );
};

export default ToggleToPaid;
