"use client";
import { processBilling } from "@/actions/processBilling";
import { useActionState } from "react";

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
        className={`p-2 hover:bg-blue-500 hover:text-slate-200 rounded-md ${
          isPending ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {isPending
          ?  "Refresing..."
           
          : "Refresh Billing"}
      </button>
    </form>
  );
};

export default ProcessBilling;
