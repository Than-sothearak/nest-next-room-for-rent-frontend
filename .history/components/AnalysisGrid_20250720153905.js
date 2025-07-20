import React from "react";
import { BiUndo, BiUserPlus } from "react-icons/bi";
import { FaBookBookmark } from "react-icons/fa6";
import { PiInvoiceBold } from "react-icons/pi";
import { IoSettings } from "react-icons/io5";
import { FaCar, FaMotorcycle, FaParking } from "react-icons/fa";
const AnalysisGrid = ({ users, payments, booking, parking }) => {

  let totalParking = 0
  for (let key in parking) {
      totalParking += parking[key]
  }

  return (
    <div className="w-full mt-4 rounded-lg flex flex-wrap gap-4">
      <div className=" justify-start items-start flex gap-4 p-4 bg-primary rounded-lg ">
        <div>
          <BiUserPlus size={28} />
        </div>
        <div className="flex flex-col gap-4">
          <h2>Total Tenants</h2>
          <h1 className="text-2xl font-bold">{users.length}</h1>
          <p className="text-green-500 text-xs">
            12% <span className="text-primarytext">more than previus week</span>
          </p>
        </div>
      </div>

      <div className="justify-start items-start flex gap-4 p-4 bg-primary rounded-lg ">
        <div>
          <PiInvoiceBold size={28} />
        </div>
        <div className="flex flex-col gap-4">
          <h2>Total income</h2>
          <h1 className="text-2xl font-bold">
            {payments
              .reduce((sum, item) => {
                return sum + item.amount;
              }, 0)
              .toLocaleString("en")}
            $
          </h1>
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
          <FaParking size={28} />
        </div>
        <div className="flex flex-col gap-4">
          <h2>Total Parking</h2>
          <h1 className="text-2xl font-bold">{totalParking}</h1>
          <div className="flex gap-4">
            <div className="flex gap-2 items-center">
              <FaMotorcycle size={20}/>
              <p>{parking.motobike}</p>
            </div>

              <div className="flex gap-2 items-center">
              <FaCar size={20}/>
              <p>{parking.car}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full justify-start items-start flex gap-4 p-4 bg-primary rounded-lg ">
        <div>
          <BiUndo size={28} />
        </div>
        <div className="flex flex-col gap-4">
          <h2>Total unpaid</h2>
          <h1 className="text-2xl font-bold">
            {booking.filter((p) => p.paymentStatus === "unpaid").length}
          </h1>
          <p className="text-green-500 text-xs">
            12% <span className="text-primarytext">more than previus week</span>
          </p>
        </div>
      </div>

      <div className="w-full justify-start items-start flex gap-4 p-4 bg-primary rounded-lg ">
        <div>
          <IoSettings size={28} />
        </div>
        <div className="flex flex-col gap-4">
          <h2>Total service</h2>
          <h1 className="text-2xl font-bold">{booking.length}</h1>
          <p className="text-green-500 text-xs">
            12% <span className="text-primarytext">more than previus week</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AnalysisGrid;
