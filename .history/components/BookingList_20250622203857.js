"use client";
import React, { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { formatDate } from "@/utils/formatDate";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import ToggleToPaid from "./ToggleToPaid";
import ButtonEditAndCancel from "./ButtonEditAndCancel";
import ConnectTelegram from "./ConnectTelegram";
import ProcessBilling from "./ProcessBilling";
import SendInvoiceButton from "./SendInvoiceButton";
import { BsTelegram } from "react-icons/bs";

// Your helper function to get next payment due date

const BookingList = ({
  session,
  booking,
  currentPage,
  itemPerPage,
  sortKey,
  pathname,
  query,
}) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [direction, setDirection] = useState("ascending");

  const searchParams = useSearchParams();

  const getSortIcon = (key) => {
    if (key === sortKey) {
      return direction === "ascending" ? <IoIosArrowUp /> : <IoIosArrowDown />;
    } else {
      return <IoIosArrowDown />;
    }
  };

  async function handleRun() {
    if (!confirm("Are you sure you want to run the billing update?")) return;

    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/cron/process-billing");
      const data = await res.json();
      setMessage(data.message || "Billing update completed.");
    } catch (error) {
      setMessage("Failed to run billing update.");
    }

    setLoading(false);
  }
  if (!booking || booking.length === 0) {
    return (
      <div>
        <p className="text-center text-gray-500 mt-4">No bookings found.</p>
      </div>
    );
  }
  return (
    <div className="mt-4 z-50 overflow-x-auto">
      <div className="">
        <ProcessBilling />
      </div>
      <table className="w-full bg-slate-100 max-lg:hidden">
        <thead className="bg-primary text-tertiary">
          <tr className="p-4">
            <th className="text-start py-4">No</th>
            <th className="text-start">Room</th>
            <th className="text-start">Guest</th>
            <th className="text-start">
              <Link
                href={`/dashboard/${pathname}?page=${currentPage}${query ? `&query=${query}` : ""
                  }&sortKey=price&sortDirection=${direction}`}
                onClick={() => handleSort("price")}
                className="flex items-center gap-2 rounded-md"
              >
                <p>Price/m</p>
                {getSortIcon("price")}
              </Link>
            </th>
            <th className="">
              <Link
                href={`/dashboard/${pathname}?page=${currentPage}${query ? `&query=${query}` : ""
                  }&sortKey=date&sortDirection=${direction}`}
                onClick={() => handleSort("date")}
                className="flex text-center items-center gap-2 rounded-md"
              >
                <p>Date</p>
                {getSortIcon("date")}
              </Link>
            </th>
           
            <th className="text-center">Payment Status</th>

            <th className="">
              <Link
                href={`/dashboard/${pathname}?page=${currentPage}${query ? `&query=${query}` : ""
                  }&sortKey=status&sortDirection=${direction}`}
                onClick={() => handleSort("status")}
                className="flex text-center items-center gap-2 rounded-md"
              >
                <p>Status</p>
                {getSortIcon("status")}
              </Link>
            </th>
            <th className="text-center">Invoice Status</th>
            <th className="text-start">Action</th>
          </tr>
        </thead>
        <tbody>
          {booking?.map((item, index) => (
            <tr
              key={item._id}
              className="odd:bg-white even:bg-gray-100 text-gray-900 dark:odd:bg-slate-200 dark:even:bg-gray-100 dark:text-tertiary"
            >
              <td className="p-2">
                <p>{Number(currentPage - 1) * itemPerPage + index + 1}</p>
              </td>

              <td className="font-bold">{item.roomId.roomName}</td>

              <td className="p-2 font-bold">{item.userId.phone}</td>

              <td className="">{`$${item.rent}`}</td>

              <td className="">
                {formatDate(item.startDate)}-{formatDate(item.dueDate)} 
              </td>

             

              <td className="text-center">
                <ToggleToPaid item={item} />

              </td>

              <td className="">      <div className={`${item?.userId?.telegramChatId ? 'text-blue-500' : 'opacity-40'} flex items-center gap-1`}>
                <BsTelegram size={24} />
              </div></td>
              <td className="text-center">
                <SendInvoiceButton bookingId={item?._id} booking={item} />
              </td>
              <td className="">
                <ButtonEditAndCancel
                  bookingId={item?._id}
                  session={session}
                  link={`/dashboard/${pathname}/${item._id}`}
                  id={item._id}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="lg:hidden">

        {booking.map((item, index) => (
          <div
            key={item._id}
            className="bg-white border mt-4 dark:bg-slate-200 p-4 mb-4 rounded-lg shadow-md"
          >
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-lg">
                <p className="text-xl">
                  <strong>Room:</strong> {item.roomId.roomName}
                </p>
              </h3>
              <ButtonEditAndCancel
                session={session}
                link={`/dashboard/${pathname}/${item._id}`}
                id={item._id}
              />
            </div>

            <div className="flex item-center gap-2 font-bold text-xl">
              <p>Guest:</p> <h2>{item.userId.phone}</h2>
            </div>
            <p>
              <strong>Price/m:</strong> ${item.rent}
            </p>
            <p>
              <strong>Date:</strong> {formatDate(item.startDate)}
            </p>
            <p>
              <strong>Due Date:</strong> {formatDate(item.dueDate)}
            </p>
            <div className="flex justify-between items-center">
              <div className={`${item?.userId?.telegramChatId ? 'text-blue-500' : 'opacity-40'} flex items-center gap-1`}>
                <BsTelegram size={24} />
                <div>
                  {item?.userId?.telegramChatId ? <h2>Connected</h2> : <h2>Unconnect</h2>}

                </div></div>
              <div className="flex gap-2">

                <SendInvoiceButton bookingId={item?._id} booking={item} />
                <ToggleToPaid item={item} />
              </div>
            </div>
          </div>
        )
        )}
      </div>
      <div className="my-11">
        <ConnectTelegram userId={session.user?._id} />
      </div>
    </div>
  );
};

export default BookingList;
