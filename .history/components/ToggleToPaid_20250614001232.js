import { togglePaymentStatus } from "@/actions/togglePaymentStatus";
import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";

const ToggleToPaid = ({ item, handleTogglePayment }) => {
    const [status, setStatus] = useState(item?.paymentStatus || "");

 
  return (
   
      <button
      type="button"
    onClick={() => handleTogglePayment(item?._id)}
        className={`px-3 py-1 rounded-md font-semibold ${
          status === "paid"
            ? "bg-green-500 text-white"
            : "bg-red-500 text-white"
        }`}
      >
        {item?.paymentStatus === "paid" ? "Paid" : "Unpaid"}
      </button>
    
  );
};

export default ToggleToPaid;
