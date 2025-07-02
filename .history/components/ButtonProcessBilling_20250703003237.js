"use client";
import { processBilling } from "@/actions/processBilling";
import { useActionState } from "react";
import { BiRefresh } from "react-icons/bi";

const ProcessBilling = () => {
  const [state, action, isPending] = useActionState(processBilling, undefined);
  return (
    <form
      action={action}
      className=""
    >
   
      <button
        type="submit"
        disabled={isPending}
        className={`flex  justify-between items-center gap-2 p-2 text-primary bg-blue-600 hover:bg-blue-500 hover:text-slate-200 rounded-md ${
          isPending ? "opacity-50 cursor-wait" : ""
        }`}
      >
           <BiRefresh size={20}/>
        {isPending
          ?  "Refresing..."
           
          : "Refresh Billing"}
      </button>
    </form>
  );
};

export default ProcessBilling;
