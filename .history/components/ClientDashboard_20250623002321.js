import { Booking } from '@/models/Booking'
import { User } from '@/models/User'
import { mongoDb } from '@/utils/connectDB'
import React from 'react'
import { FaEarthAfrica } from 'react-icons/fa6'
import { CgUnavailable } from "react-icons/cg";
import { BiCheckCircle } from 'react-icons/bi'
import { FaDotCircle } from 'react-icons/fa'
import { BsTelegram } from 'react-icons/bs'
import { Payment } from '@/models/Payment'
import Link from 'next/link'

export const ClientDashboard = async ({ session }) => {
  await mongoDb()
  const user = await User.findById(session.user._id)
  const booking = JSON.parse(JSON.stringify(await Booking.findOne({ userId: user._id })
  .populate('userId') // First populate userId
  .populate('roomId') // Then roomId
  ))

  const payments = JSON.parse(JSON.stringify(await Payment.find({ userId: user._id }).populate('userId').sort({ startDate: -1 })));
  
  function formatDate(dateString) {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}
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

              <h1 className='font-bold text-xl'>{booking?.userId?.username}</h1>
              <div className='flex gap-2'> <h1>Room: {booking.roomId.roomName}</h1><p className="text-green-500 flex items-center gap-1">
                <FaDotCircle /> {booking.status}
              </p> </div>
            </div>
            <h1 className='text-end'>Due date: {booking.dueDate}</h1>
          </div>
          <div className='flex justify-between items-center w-full'>
            <div className='flex gap-2 flex-wrap w-full'>
              <div className='flex'><span>Id:</span> <p className='bg-slate-200 px-2 rounded-sm uppercase font-bold'> {booking.userId._id.slice(-10)}</p></div>
              <div className='flex'><span>Phone:</span> <p className='bg-slate-200 px-2 rounded-sm uppercase font-bold'> {booking.userId.phone}</p></div>
            </div>

            <div><h1 className='font-bold text-3xl text-end'>{booking.rent}$</h1><p className={`${booking.paymentStatus === "unpaid" ? 'text-red-500' : 'text-green-500'} flex items-center gap-1`}>{booking.paymentStatus === "unpaid" ? <CgUnavailable /> : <BiCheckCircle />}{booking.paymentStatus}</p></div>
          </div>
          <div className='w-full mt-2'>
            {/* <Link href={`https://t.me/wbc_notifications_bot?start=${booking?.userId?._id}`} className='flex items-center gap-1 border w-max p-2 rounded-md'>
              <BsTelegram /> <h1>Connect telegram</h1>
            </Link> */}
          </div>
        </div>
      </div>

        <div className="mt-4 w-1/2 max-lg:w-full justify-start items-start p-4 bg-primary rounded-lg ">
        <h1 className='text-xl font-bold'>Last payment</h1>
      {payments.map(payment => (
          <div className='bg-slate-100 p-2 mt-2' key={payment._id}>
          <div className='flex items-center justify-between font-bold'>
            <p>Recipts: {payment.startDate}-{payment.dueDate} </p>
            <p className='uppercase text-green-500'>{payment.status}</p>
          
          </div>
            <hr className='my-2'></hr>

            <div className='flex items-center justify-between'>
              <p>Paid at</p> <p>{payment.paidAt}</p>
            </div>

             <div className='flex items-center justify-between'>
              <p>Consumer</p> <p>{payment.userId.username}</p>
            </div>

            <div className='flex items-center justify-between'>
              <p>Amount</p> <p>$ {payment.amount}</p>
            </div>
        </div>
      ))}
        </div>
    </div>
  )
}
