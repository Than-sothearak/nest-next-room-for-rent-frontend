"use client";
import { processBilling } from "@/actions/processBilling";
import { useActionState } from "react";

const ProcessBilling = () => {
  const [state, action, isPending] = useActionState(processBilling, undefined);
  return (
    <form
      action={action}
      className="p-2 rounded-md text-primary bg-blue-600 cursor-pointer"
    >
      <button
        type="submit"
        disabled={isPending}
        className={`p-2 bg-blue-600 text-secondarytext w-full hover:bg-blue-500 hover:text-slate-200 rounded-md ${
          isPending ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {isPending
          ?  "Updating..."
           
          : "Refresh Billing"}
      </button>
    </form>
  );
};

export default ProcessBilling;
