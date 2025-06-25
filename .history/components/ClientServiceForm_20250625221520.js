import React from 'react'

const ClientServiceForm = () => {
  return (
    <div>
      <h1 className='text-2xl font-bold mb-4'>Request service</h1>
      <p className='text-sm text-gray-500 mb-4'>
        Please fill out the form below to request a service. Our team will get back to you as soon as possible.
      </p>
      <div>
        <div className="grid gap-2">
        <label className="font-bold">Total Price</label>
        <input
          type="text"
          value={calculateTotal()}
          disabled
          className="border rounded p-2 bg-gray-100"
        />
      </div>
      </div>
    </div>
  )
}

export default ClientServiceForm