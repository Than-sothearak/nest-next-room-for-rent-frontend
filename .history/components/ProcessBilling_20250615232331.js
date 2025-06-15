"use client"
import { processBilling } from '@/actions/processBilling';

const ProcessBilling = () => {

    const handleRun = async () => {
        await processBilling();
    }
  return (
     
        <form
          action={handleRun}
          className="p-2 rounded-md text-primary bg-blue-600 cursor-pointer"
        >
       
<button>H</button>
        </form>
     
  )
}

export default ProcessBilling