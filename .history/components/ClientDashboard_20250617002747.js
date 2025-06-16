import { Booking } from '@/models/Booking'
import { User } from '@/models/User'
import { mongoDb } from '@/utils/connectDB'
import React from 'react'
import { FaEarthAfrica } from 'react-icons/fa6'

export const ClientDashboard = async ({session}) => {
 await mongoDb()
 const user = await User.findById(session.user._id)
 const booking = JSON.parse(JSON.stringify(await Booking.findOne({userId: user._id}).populate('userId')))
console.log(booking)
  return (
    <div>
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
       <div className="mt-4 w-full justify-start items-start flex gap-4 p-4 bg-primary rounded-lg ">
          <div>
           
          </div>
          <div className="flex flex-col gap-4">
            <h1 className='font-bold text-xl'>{booking?.userId?.username}</h1>
            <div className='flex'>Id: <p className='bg-slate-400 px-2 rounded-sm'>{booking.userId._id.slice(-6)}</p></div>
            <p className="text-green-500 text-xs">
              12% <span className="text-primarytext">more than previus week</span>
            </p>
          </div>
        </div>
    </div>
  )
}
