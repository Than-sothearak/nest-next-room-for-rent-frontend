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
      <button>Run Billing Update Now</button>
    </form>
  );
};

export default ProcessBilling;
