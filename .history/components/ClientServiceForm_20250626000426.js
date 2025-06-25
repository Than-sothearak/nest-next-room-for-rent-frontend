"use client"
import { requestService } from '@/actions/requestService'
import React, { useActionState, useState } from 'react'

const ClientServiceForm = ({ serviceType, user, booking, price }) => {
  const [startDate, setStartDate] = useState("")
  const [service, setService] = useState("" || serviceType)
   const [startTime, setStartTime] = useState("")
   const [note, setNote] = useState("")
   const handleAddRequest = requestService.bind(null, booking)
 const [state, action, isPending] = useActionState(handleAddRequest, undefined)
  return (
    <form action={action} className=''>
      <h1 className='text-2xl font-bold'>Request service</h1>
      <p className='text-sm text-gray-500'>
        Please fill out the form below to request a service. Our team will get back to you as soon as possible.
      </p>
      <div>

        <div className='flex flex-col gap-4'>
          <div className="grid gap-2">
            <label className="font-bold">Service</label>
            <select
              name='serviceType'
              value={serviceType}
              onChange={(e) => setService(e.target.value)}
              required
              className="border rounded p-2"
            >
              <option value={serviceType}>{serviceType}</option>
            </select>

          </div>

          <div>
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

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <label className="font-bold">Start Date</label>
                  <input
                    type="time"
                    name="startTime"
                    min="09:00"
                    max="18:00"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
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
              <div className='hidden'>
                <label className="block font-medium">Price</label>
                <input
                  name="price"
                  type="number"
                  value={price}
                  placeholder="Price in USD"
                  className="mt-2 w-full p-2 rounded-md bg-secondary border-none border-white text-md focus:ring-0 focus:outline-none"
                  rows="4"
                ></input>
              </div>
          
              <div>
                <label className="block font-medium">Note</label>
                <textarea
                  name="note"
                  type="text"
                  defaultValue={note}
                  placeholder="Write a note to admin"
                  className="mt-2 w-full p-2 rounded-md bg-secondary border-none border-white text-md focus:ring-0 focus:outline-none"
                  rows="4"
                ></textarea>
              </div>
        </div>

                <button
          type="submit"
          disabled={isPending}
          className={`p-2 bg-blue-600 text-secondarytext w-full mt-6  hover:bg-blue-500 hover:text-slate-200 rounded-md ${
            isPending ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isPending
            ? 
              "Submiting..."
              : "Submit"
          }
        </button>
      </div>
    </form>
  )
}

export default ClientServiceForm