import React from 'react'
import { BiUserCircle, BiUserPlus } from 'react-icons/bi'
import { FaBookBible, FaBookBookmark, FaEarthAfrica } from 'react-icons/fa6'
import InvoicePayment from './InvoicePayment'
import { PiInvoiceBold } from 'react-icons/pi'

export const AdminDashboard = ({users, payments, booking}) => {
  return (
    <div className="mt-4 rounded-lg grid gap-4">
        <div className="w-full justify-start items-start flex gap-4 p-4 bg-primary rounded-lg ">
          <div>
            <BiUserPlus size={28} />
          </div>
          <div className="flex flex-col gap-4">
            <h2>Total Guest</h2>
            <h1 className="text-2xl font-bold">{users.length}</h1>
            <p className="text-green-500 text-xs">
              12% <span className="text-primarytext">more than previus week</span>
            </p>
          </div>
        </div>

        <div className="w-full justify-start items-start flex gap-4 p-4 bg-primary rounded-lg ">
          <div>
            <PiInvoiceBold size={28}/>
          </div>
          <div className="flex flex-col gap-4">
            <h2>Total income</h2>
            <h1 className="text-2xl font-bold">

              {payments.reduce((sum, item) => {return sum + item.amount}, 0).toLocaleString('en')}$</h1>
            <p className="text-green-500 text-xs">
              12% <span className="text-primarytext">more than previus week</span>
            </p>
          </div>
        </div>

        <div className="w-full justify-start items-start flex gap-4 p-4 bg-primary rounded-lg ">
          <div>
            <FaBookBookmark size={28} />
          </div>
          <div className="flex flex-col gap-4">
            <h2>Total Booking</h2>
            <h1 className="text-2xl font-bold">{booking.length}</h1>
            <p className="text-green-500 text-xs">
              12% <span className="text-primarytext">more than previus week</span>
            </p>
          </div>
        </div>

              <div className="w-full justify-start items-start flex gap-4 p-4 bg-primary rounded-lg ">
          <div>
            <FaBookBookmark size={28} />
          </div>
          <div className="flex flex-col gap-4">
            <h2>Total Booking</h2>
            <h1 className="text-2xl font-bold">{booking.length}</h1>
            <p className="text-green-500 text-xs">
              12% <span className="text-primarytext">more than previus week</span>
            </p>
          </div>
        </div>

              <div className="w-full justify-start items-start flex gap-4 p-4 bg-primary rounded-lg ">
          <div>
            <FaBookBookmark size={28} />
          </div>
          <div className="flex flex-col gap-4">
            <h2>Total Booking</h2>
            <h1 className="text-2xl font-bold">{booking.length}</h1>
            <p className="text-green-500 text-xs">
              12% <span className="text-primarytext">more than previus week</span>
            </p>
          </div>
        </div>
      </div>
  )
}
