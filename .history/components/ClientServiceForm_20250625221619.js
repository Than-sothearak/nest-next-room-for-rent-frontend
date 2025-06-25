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
        <label className="font-bold">contract</label>
        <select
          name="contract"
          value={contract}
          onChange={(e) => setContract(e.target.value)}
          required
          className="border rounded p-2"
        >
          <option value="">Select months</option>

          <option value={1}>1 month</option>

          <option value={2}>2 month</option>

          <option value={3}>3 month</option>

          <option value={4}>4 month</option>

          <option value={5}>5 month</option>

          <option value={6}>6 month</option>

          <option value={7}>7 month</option>

          <option value={8}>8 month</option>

          <option value={10}>9 month</option>
          <option value={11}>11 month</option>

          <option value={12}>12 month</option>
        </select>
        {state?.errors?.roomId && (
          <p className="text-red-500">{state.errors.contract}</p>
        )}
      </div>
      </div>
    </div>
  )
}

export default ClientServiceForm