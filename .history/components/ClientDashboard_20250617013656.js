import { Booking } from '@/models/Booking'
import { User } from '@/models/User'
import { mongoDb } from '@/utils/connectDB'
import { formatDate } from '@/utils/formatDate'
import React from 'react'
import { FaEarthAfrica } from 'react-icons/fa6'
import { CgUnavailable } from "react-icons/cg";
import Image from 'next/image'
import { BiCheckCircle } from 'react-icons/bi'
import { FaDotCircle } from 'react-icons/fa'
import { BsTelegram } from 'react-icons/bs'
import { populate } from 'dotenv'
import { Payment } from '@/models/Payment'

export const ClientDashboard = async ({ session }) => {
  await mongoDb()
  const user = await User.findById(session.user._id)
  const booking = JSON.parse(JSON.stringify(await Booking.findOne({ userId: user._id })
  .populate('userId') // First populate userId
  .populate('roomId') // Then roomId
  ))

  const payments = JSON.parse(JSON.stringify(await Payment.find({ userId: user._id }).populate('userId')));

  console.log(payments)
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


      </div>
      <div className="mt-4 w-1/2 max-lg:w-full justify-start items-start flex gap-4 p-4 bg-primary rounded-lg ">
        <div className="flex flex-col w-full">
          <div className='flex justify-between w-full gap-4 '>
            <div className='w-full'>

              <h1 className='font-bold text-xl w-full'>{booking?.userId?.username}</h1>
              <div className='flex gap-2'> <h1>Room: {booking.roomId.roomName}</h1><p className="text-green-500 flex items-center gap-1">
                <FaDotCircle /> {booking.status}
              </p> </div>
            </div>
            <h1 className='w-full text-end'>Due date: {formatDate(booking.dueDate)}</h1>
          </div>
          <div className='flex justify-between items-center w-full'>
            <div className='flex gap-2 flex-wrap w-full'>
              <div className='flex'>Id: <p className='bg-slate-200 px-2 rounded-sm uppercase font-bold'> {booking.userId._id.slice(-10)}</p></div>
              <div className='flex'>Phone: <p className='bg-slate-200 px-2 rounded-sm uppercase font-bold'> {booking.userId.phone}</p></div>
            </div>

            <div><h1 className='font-bold text-3xl text-end'>{booking.rent}$</h1><p className={`${booking.paymentStatus === "unpaid" ? 'text-red-500' : 'text-green-500'} flex items-center gap-1`}>{booking.paymentStatus === "unpaid" ? <CgUnavailable /> : <BiCheckCircle />}{booking.paymentStatus}</p></div>
          </div>
          <div className='w-full'>
            <button className='flex items-center gap-1 border w-max p-2 rounded-md'>
              <BsTelegram /> <h1>Connect telegram</h1>
            </button>
          </div>
        </div>
      </div>

        <div className="mt-4 w-1/2 max-lg:w-full justify-start items-start p-4 bg-primary rounded-lg ">
        <h1 className='text-xl font-bold'>Last payment</h1>
        <div className='bg-slate-100 p-2 mt-2'>
          <div className='flex items-center justify-between'>
            <p>Recipts from {formatDate(payments[0].startDate)} - {formatDate(payments[0].dueDate)} </p>
            <p className='uppercase text-green-500'>{payments[0].status}</p>
          
          </div>
            <br></br>
        </div>
        </div>
    </div>
  )
}
