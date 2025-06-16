import { Booking } from '@/models/Booking'
import { User } from '@/models/User'
import { mongoDb } from '@/utils/connectDB'
import React from 'react'
import { FaEarthAfrica } from 'react-icons/fa6'

export const ClientDashboard = async ({session}) => {
 await mongoDb()
 const user = await User.findById(session.user._id)
 const booking = await Booking.find({userId: user._id})
 console.log(booking)
  return (
    <div className="mt-4 rounded-lg flex max-sm:flex-wrap gap-4">
        <div className="w-full justify-start items-start flex gap-4 p-4 bg-primary rounded-lg ">
          <div>
            <FaEarthAfrica />
          </div>
          <div className="flex flex-col gap-4">
            <h2>Total payment</h2>
            <h1 className="text-2xl font-bold">800 $</h1>
            <p className="text-green-500 text-xs">
              12% <span className="text-primarytext">more than previus week</span>
            </p>
          </div>
        </div>

        <div className="w-full justify-start items-start flex gap-4 p-4 bg-primary rounded-lg ">
          <div>
            <FaEarthAfrica />
          </div>
          <div className="flex flex-col gap-4">
            <h2>Total Users</h2>
            <h1 className="text-2xl font-bold">10,928</h1>
            <p className="text-green-500 text-xs">
              12% <span className="text-primarytext">more than previus week</span>
            </p>
          </div>
        </div>

        <div className="w-full justify-start items-start flex gap-4 p-4 bg-primary rounded-lg ">
          <div>
            <FaEarthAfrica />
          </div>
          <div className="flex flex-col gap-4">
            <h2>Total Users</h2>
            <h1 className="text-2xl font-bold">10,928</h1>
            <p className="text-green-500 text-xs">
              12% <span className="text-primarytext">more than previus week</span>
            </p>
          </div>
        </div>
      </div>
  )
}
