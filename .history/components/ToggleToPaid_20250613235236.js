import { togglePaymentStatus } from "@/actions/togglePaymentStatus";
import React, { useEffect, useState } from "react";

const ToggleToPaid = ({ item }) => {
    const [status, setStatus] = useState(item?.paymentStatus || "");

  const toggleToMakePayment = async (id) => {
      const newStatus = await togglePaymentStatus(item._id);
    
    // Update local state manually
    if (newStatus) {
      setStatus(newStatus); // assume newStatus is "paid" or "unpaid"
    } else {
      // fallback: just toggle manually if no response
      setStatus((prev) => (prev === "paid" ? "unpaid" : "paid"));
    }
    
  };
 useEffect(() => {
    setStatus(item?.paymentStatus)
 },[item])
console.log(status)
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
