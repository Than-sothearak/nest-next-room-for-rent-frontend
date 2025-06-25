"use client"
import React, { useState } from 'react'

const ClientServiceForm = ({ serviceType }) => {
const [startDate, setStartDate] = useState("")

  return (
    <div className='flex flex-col gap-4'>
      <h1 className='text-2xl font-bold mb-4'>Request service</h1>
      <p className='text-sm text-gray-500 mb-4'>
        Please fill out the form below to request a service. Our team will get back to you as soon as possible.
      </p>
      <div>

        <div className="grid gap-2">
          <label className="font-bold">contract</label>
          <select
            name={serviceType}
            value={serviceType}
            onChange={(e) => { }}
            required
            className="border rounded p-2"
          >
            <option value="">{serviceType}</option>
          </select>

        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <label className="font-bold">Start Date</label>
            <input
              type="date"
              name="startDate"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
              className="border rounded p-2"
            />
            {/* {state?.errors?.startDate && (
              <p className="text-red-500">{state.errors.startDate}</p>
            )} */}
          </div>
         
        </div>
      </div>
    </div>
  )
}

export default ClientServiceForm