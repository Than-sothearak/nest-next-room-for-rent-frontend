"use client";
import React, { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { formatDate } from "@/utils/formatDate";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import ButtonViewAndDelete from "./ButtonViewAndDelete";
import ToggleToPaid from "./ToggleToPaid";
import ButtonEditAndCancel from "./ButtonEditAndCancel";

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

  return (
    <div className="mt-4 z-50 max-sm:overflow-x-auto max-sm:h-screen">
      <div className="my-4">
        <button
          onClick={handleRun}
          disabled={loading}
          className="p-2 rounded-md text-primary bg-blue-600"
        >
          {loading ? "Running..." : "Run Billing Update Now"}
        </button>
        {message && <p>{message}</p>}
      </div>
      <table className="w-full bg-slate-100">
        <thead className="bg-primary text-tertiary">
          <tr className="p-4">
            <th className="text-start py-4">No</th>
            <th className="text-start">Room</th>
            <th className="text-start">Guest</th>
            <th className="text-start">
              <Link
                href={`/dashboard/${pathname}?page=${currentPage}${
                  query ? `&query=${query}` : ""
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
                href={`/dashboard/${pathname}?page=${currentPage}${
                  query ? `&query=${query}` : ""
                }&sortKey=date&sortDirection=${direction}`}
                onClick={() => handleSort("date")}
                className="flex text-center items-center gap-2 rounded-md"
              >
                <p>Date</p>
                {getSortIcon("date")}
              </Link>
            </th>
            <th className="text-start">Due date</th>
            <th className="text-center">Payment Status</th>
            <th className="">
              <Link
                href={`/dashboard/${pathname}?page=${currentPage}${
                  query ? `&query=${query}` : ""
                }&sortKey=status&sortDirection=${direction}`}
                onClick={() => handleSort("status")}
                className="flex text-center items-center gap-2 rounded-md"
              >
                <p>Status</p>
                {getSortIcon("status")}
              </Link>
            </th>
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
                {item.createdAt ? formatDate(item.startDate) : "N/A"}
              </td>

              <td className="">{formatDate(item.dueDate)}</td>

              <td className="text-center">
                <ToggleToPaid item={item} />
              </td>

              <td className="">{item.status}</td>

              <td className="">
                <ButtonEditAndCancel
                  session={session}
                  link={`/dashboard/${pathname}/${item._id}`}
                  id={item._id}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* <ConnectTelegram userId={session.user?._id}/> */}
    </div>
  );
};

export default BookingList;
