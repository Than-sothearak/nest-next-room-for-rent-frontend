"use client";
import React, { useOptimistic, useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { formatDate } from "@/utils/formatDate";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import ToggleToPaid from "./ButtonToggleToPaid";
import ProcessBilling from "./ButtonProcessBilling";
import SendInvoiceButton from "./ButtonSendInvoice";
import { BsTelegram } from "react-icons/bs";
import DownloadInvoiceButton from "./DownloadInvoiceButton";
import ButtonViewAndDelete from "./ButtonViewAndDelete";
import { BiPrinter } from "react-icons/bi";

// Your helper function to get next payment due date

const BookingTable = ({

  session,
  booking,
  currentPage,
  itemPerPage,
  sortKey,
  pathname,
  query,
  count,
}) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isClickedm, setIsClicked] = useState(false);

  function handleCLick() {
    setIsClicked(!isClickedm);
  }

  const [direction, setDirection] = useState("ascending");

  const searchParams = useSearchParams();

  const getSortIcon = (key) => {
    if (key === sortKey) {
      return direction === "ascending" ? <IoIosArrowUp /> : <IoIosArrowDown />;
    } else {
      return <IoIosArrowDown />;
    }
  };

  const [optimisticData, setOptimisticData] = useOptimistic(
    booking,
    (currentData, id) => {
      return currentData.filter((data) => data._id !== id);
    }
  );

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
  if (!optimisticData || optimisticData.length === 0) {
    return (
      <div>
        <p className="text-center text-gray-500 mt-4">No bookings found.</p>
      </div>
    );
  }

  return (
    <div className="">
      <div className="mt-4">
        <h1 className="font-bold text-2xl pb-2">Booking</h1>
      </div>
      <div className="flex items-center justify-between">
        <ProcessBilling />
        <p>Total: {count}</p>
      </div>
      <div className=" overflow-x-auto pb-10">
        <table className="mt-4 w-full border rounded shadow">
        <thead className="bg-primary text-tertiary">
          <tr className="bg-gray-100 text-left">
            <th className="text-start p-2 whitespace-nowrap">No</th>
            <th className="text-start p-2 whitespace-nowrap">Room</th>
            <th className="text-start p-2 whitespace-nowrap">Guest name</th>
            <th className="text-start p-2 whitespace-nowrap">Phone</th>
            <th className="text-start p-2 whitespace-nowrap">
              <Link
                href={`/dashboard/${pathname}?page=${currentPage}${query ? `&query=${query}` : ""
                  }&sortKey=price&sortDirection=${direction}`}
                onClick={() => handleSort("price")}
                className="flex items-center gap-2 rounded-md "
              >
                <p>Price</p>
                {getSortIcon("price")}
              </Link>
            </th>
            <th className="p-2 whitespace-nowrap">
              <Link
                href={`/dashboard/${pathname}?quary=${query}&page=${currentPage}&sortKey=date&sortDirection=${direction}`}
                onClick={() => handleSort("date")}
                className="flex text-center items-center gap-2 rounded-md"
              >
                <p>Date</p>
                {getSortIcon("date")}
              </Link>
            </th>

            <th className="text-start px-4">Paid</th>

            <th className="">
              <Link
                href={`/dashboard/${pathname}?page=${currentPage}${query ? `&query=${query}` : ""
                  }&sortKey=status&sortDirection=${direction}`}
                onClick={() => handleSort("status")}
                className="flex text-center items-center gap-2 rounded-md"
              >
                <p>Status</p>
              </Link>
            </th>
            <th className="text-start p-2 whitespace-nowrap">Invoice Status</th>
            <th className="px-2 text-center whitespace-nowrap"> Print</th>
            <th className="text-center p-2 whitespace-nowrap ">Action</th>
          </tr>
        </thead>
        <tbody>
          {optimisticData?.map((item, index) => (
            <tr key={item._id} className="border-t">
              <td className="font-bold px-2 whitespace-nowrap">
                <p>{`${Number(currentPage - 1) * itemPerPage + index + 1} (${String(item?.invoiceId).padStart(5, '0')})`}</p>
              </td>

              <td className="font-bold px-2 whitespace-nowrap">
                {item?.roomId ? item?.roomId?.roomName : "Not found"}
              </td>
              <td className="px-2 whitespace-nowrap">{item.userId.username}</td>
              <td className="px-2 whitespace-nowrap">{item.userId.phone}</td>

              <td className="px-2 whitespace-nowrap">{`$${item.rent +
                item.properties?.reduce((sum, service) => {
                  return sum + Number(service.price) * Number(service.qty || 1);
                }, 0)
                }`}</td>

              <td className="px-2 whitespace-nowrap">
                {formatDate(item.startDate)} – {formatDate(item.dueDate)}
              </td>

              <td className="p-0">
                <ToggleToPaid item={item} />
              </td>

              <td className="text-center p-2 whitespace-nowrap">
                <div
                  className={`${item?.userId?.telegramChatId
                    ? "text-blue-500"
                    : "opacity-40"
                    } flex items-center gap-1`}
                >
                  <BsTelegram size={24} />
                </div>
              </td>
              <td className="text-end whitespace-nowrap z-40">
                <SendInvoiceButton bookingId={item?._id} booking={item} />
              </td>
              <td className="p-2 text-center">
                <DownloadInvoiceButton bookingId={item._id} fileName={`${item.userId.username}-(${formatDate(item.startDate)}-${formatDate(item.dueDate)})`} />
                
              </td>
              <td>
                 <Link href={`/invoice/${item?._id}`} title="Print invoice">
                      <BiPrinter
                        size={20}
                        className="whitespace-nowrap z-0 px-3 w-full py-1 rounded-md bg-blue-600 text-white hover:bg-blue-300 hover:text-blue-900"
                      />
                    </Link>
              </td>
              <td className="text-center p-2 whitespace-nowrap">
                <ButtonViewAndDelete
                  setOptimisticData={setOptimisticData}
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
      </div>




      {/* <div className="lg:hidden">
        {booking.map((item, index) => (
          <div
          href={`/dashboard/${pathname}/${item._id}`}
            key={item._id}
            className="bg-white border mt-4 dark:bg-slate-200 p-4 mb-4 w-full  h-full rounded-lg shadow-md"
          >
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-lg">
                <p className="text-lg">
                  <strong>Room:</strong>{" "}
                  {item?.roomId ? item?.roomId?.roomName : "Not found"}
                </p>
              </h3>
              <ButtonViewAndDelete
                session={session}
                link={`/dashboard/${pathname}/${item._id}`}
                id={item._id}
              />
            </div>

            <div className="flex item-center gap-2 font-bold whitespace-nowrap">
              <p>Guest:</p> <h2>{item.userId.username}</h2>{" "}
              <h2>({item.userId.phone})</h2>
            </div>
            <p>
              <strong>Total:</strong> $
              {item.rent +
                item.properties?.reduce((sum, service) => {
                  return sum + Number(service.values);
                }, 0)}
            </p>
            <p>
              <strong>Date:</strong> {formatDate(item.startDate)} -{" "}
              {formatDate(item.dueDate)}
            </p>

            <div className="mt-2 flex justify-between items-center flex-wrap gap-4">
              <div
                className={`${item?.userId?.telegramChatId ? "text-blue-500" : "opacity-40"
                  } flex items-center gap-1`}
              >
                <BsTelegram size={24} />
                <div>
                  {item?.userId?.telegramChatId ? (
                    <h2>Connected</h2>
                  ) : (
                    <h2>Unconnect</h2>
                  )}
                </div>
              </div>
              <div className="flex gap-2">
                <SendInvoiceButton bookingId={item?._id} booking={item} />
                <ToggleToPaid item={item} />
              
                <DownloadInvoiceButton bookingId={item._id} fileName={`${item.userId.username}-(${formatDate(item.startDate)}-${formatDate(item.dueDate)})`} />
              
              </div>
            </div>
          </div>
        ))}
      </div> */}
    </div>
  );
};

export default BookingTable;
