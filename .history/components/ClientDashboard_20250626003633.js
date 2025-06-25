"use client";
import React, { useState } from "react";
import { FaEarthAfrica } from "react-icons/fa6";
import { CgUnavailable } from "react-icons/cg";
import { BiCheckCircle, BiCloset, BiDownload, BiPrinter } from "react-icons/bi";
import { FaDotCircle } from "react-icons/fa";
import { BsTelegram } from "react-icons/bs";
import Link from "next/link";
import dayjs from "dayjs";
import { PiInvoiceBold } from "react-icons/pi";

import ClientService from "./ClientService";

// Output: "2025-06-23 20:51:16" (in your local time)

export const ClientDashboard = ({ services, booking, payments, user }) => {

  const [isClicked, setIsClicked] = useState(false)

  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }
  if (!booking) {
    return (
      <div className="">
        <div className="mt-4 rounded-lg flex max-sm:flex-wrap gap-4">
          <div className="w-full justify-start items-start flex gap-4 p-4 bg-primary rounded-lg ">
            <div>
              <FaEarthAfrica />
            </div>
            <div className="flex flex-col gap-4">
              <h2>Total payment</h2>
              <h1 className="text-2xl font-bold">800 $</h1>
              <p className="text-green-500 text-xs">
                12%{" "}
                <span className="text-primarytext">more than previus week</span>
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
                12%{" "}
                <span className="text-primarytext">more than previus week</span>
              </p>
            </div>
          </div>
        </div>

        <div className="mt-4 w-1/2 max-lg:w-full justify-start items-start flex gap-4 p-4 bg-primary rounded-lg">
          No Data
        </div>
      </div>
    );
  }
  return (
    <div>
      <div className="mt-4 rounded-lg flex max-sm:flex-wrap gap-4">
        <div className="w-full justify-start items-start flex gap-4 p-4 bg-primary rounded-lg ">
          <div>
            <PiInvoiceBold size={28} />
          </div>
          <div className="flex flex-col gap-4">
            <h2>Total spaned</h2>
            <h1 className="text-2xl font-bold">
              {payments
                .reduce((sum, item) => {
                  return sum + item.amount;
                }, 0)
                .toLocaleString("en")}
              $
            </h1>
            <p className="text-green-500 text-xs">
              12%{" "}
              <span className="text-primarytext">more than previus week</span>
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
              12%{" "}
              <span className="text-primarytext">more than previus week</span>
            </p>
          </div>
        </div>
      </div>

      <ClientService 
      services={services}
      isClicked={isClicked} 
      setIsClicked={setIsClicked} 
      booking={booking} 
      user={user}/>

      <div className="mt-4 w-1/2 max-lg:w-full justify-start items-start flex gap-4 p-4 bg-primary rounded-lg ">
        <div className="flex flex-col w-full">
          <div className="flex justify-between w-full gap-4 ">
            <div className="w-full">
              <h1 className="font-bold text-xl">{booking?.userId?.username}</h1>
              <div className="flex gap-2">
                {" "}
                <h1>Room: {booking?.roomId.roomName}</h1>
                <p className="text-green-500 flex items-center gap-1">
                  <FaDotCircle /> {booking?.status}
                </p>{" "}
              </div>
            </div>
            <h1 className="text-end">
              Due date: {formatDate(booking?.dueDate)}
            </h1>
          </div>
          <div className="flex justify-between items-center w-full">
            <div className="flex gap-2 flex-wrap w-full">
              <div className="flex">
                <p>Id:</p>{" "}
                <p className="bg-slate-200 px-2 rounded-sm uppercase font-bold">
                  {" "}
                  {booking?.userId._id.slice(-10)}
                </p>
              </div>
              <div className="flex">
                <p>Phone:</p>{" "}
                <p className="bg-slate-200 px-2 rounded-sm uppercase font-bold">
                  {booking?.userId.phone}
                </p>
              </div>
            </div>

            <div>
              <h1 className="font-bold text-3xl text-end">
                {booking?.rent +
                  booking?.properties.reduce((sum, service) => {
                    return sum + Number(service.price);
                  }, 0)}
                $
              </h1>
              <p
                className={`${booking?.paymentStatus === "unpaid"
                    ? "text-red-500"
                    : "text-green-500"
                  } flex items-center gap-1`}
              >
                {booking?.paymentStatus === "unpaid" ? (
                  <CgUnavailable />
                ) : (
                  <BiCheckCircle />
                )}
                {booking?.paymentStatus}
              </p>
            </div>
          </div>
          <div className="w-full mt-2">
            {booking?.userId?.telegramChatId ? (
              <Link
                href={`https://t.me/wbc_notifications_bot?stop=${booking?.userId?._id}`}
                className="flex items-center gap-1 border w-max p-2 rounded-md bg-blue-500 text-white"
              >
                <BsTelegram /> <h1>Connected</h1>
              </Link>
            ) : (
              <Link
                href={`https://t.me/wbc_notifications_bot?start=${booking?.userId?._id}`}
                className="flex items-center gap-1 border w-max p-2 rounded-md"
              >
                <BsTelegram /> <h1>Connect telegram</h1>
              </Link>
            )}
          </div>
        </div>
      </div>

      <div className="mt-4 w-1/2 max-lg:w-full justify-start items-start p-4 bg-primary rounded-lg ">
        <h1 className="text-xl font-bold">Last payment</h1>
        {payments.map((payment) => (
          <div className="bg-slate-100 p-2 mt-2" key={payment._id}>
            <div className="flex items-center justify-between font-bold">
              <p>
                Recipts: {formatDate(payment.startDate)}-
                {formatDate(payment.dueDate)}{" "}
              </p>
              <div className="flex items-center gap-4">
                <p className="text-green-500">{payment.status}</p>
                <Link href={`invoice/${payment._id}`}>
                  <BiPrinter size={28} />
                </Link>
              </div>
            </div>
            <hr className="my-2"></hr>

            <div className="flex items-center justify-between">
              <p>Paid at</p>{" "}
              <p>{dayjs(payment.paidAt).format("YYYY-MM-DD HH:mm:ss")}</p>
            </div>

            <div className="flex items-center justify-between">
              <p>Consumer</p> <p>{payment.userId.username}</p>
            </div>

            <div className="flex items-center justify-between">
              <p>Amount</p> <p>$ {payment.amount}</p>
            </div>
          </div>
        ))}
      </div>

      {isClicked && <div 
      onClick={()=> setIsClicked(false)}
      className='fixed inset-0 bg-black/80 overflow-y-auto p-4'>


      </div>}
    </div>
  );
};
