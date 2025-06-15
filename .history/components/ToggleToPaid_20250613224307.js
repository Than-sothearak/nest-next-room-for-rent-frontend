import React from 'react'

const ToggleToPaid = ({item }) => {
  return (
    <div>
          <button
                          onClick={() => togglePaymentStatus(item?._id, item?.paymentStatus)}
                          className={`px-3 py-1 rounded-md font-semibold ${
                            item?.paymentStatus === "paid" ? "bg-green-500 text-white" : "bg-red-500 text-white"
                          }`}
                        >
                          {item?.paymentStatus === "paid" ? "Paid" : "Unpaid"}
                        </button>
    </div>
  )
}

export default ToggleToPaid