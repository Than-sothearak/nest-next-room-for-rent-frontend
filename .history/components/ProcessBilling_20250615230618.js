import React from 'react'

const ProcessBilling = () => {
  return (
       <div className="my-4">
        <button
          onClick={handleRun}
          disabled={loading}
          className="p-2 rounded-md text-primary bg-blue-600"
        >
          {loading ? "Running..." : "Run Billing Update Now"}
        </button>
        {message && <p>{message}</p>}
      </div>
  )
}

export default ProcessBilling