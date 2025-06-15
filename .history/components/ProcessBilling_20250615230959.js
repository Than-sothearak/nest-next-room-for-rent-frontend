import { processBilling } from '@/actions/processBilling';
import React, { useActionState } from 'react'

const ProcessBilling = () => {
    const [state, action, isPending] = useActionState(processBilling, undefined);
  return (
       <div className="my-4 w-full">
        <form
          action={action}

          disabled={isPending}
          className="p-2 rounded-md text-primary bg-blue-600"
        >
          {isPending ? "Running..." : "Run Billing Update Now"}
        </form>
      </div>
  )
}

export default ProcessBilling