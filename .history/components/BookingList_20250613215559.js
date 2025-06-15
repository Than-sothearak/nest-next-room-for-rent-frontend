"use client";

import React, { useState, useEffect } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { formatDate } from "@/utils/formatDate";
import Link from "next/link";
import ButtonViewAndDelete from "./ButtonViewAndDelete";

const BookingList = ({ 
  session,
  booking,
  currentPage,
  itemPerPage,
  sortKey: initialSortKey,
  sortDirection: initialSortDirection,
  pathname,
  query,
}) => {
  const [sortKey, setSortKey] = useState(initialSortKey || "");
  const [direction, setDirection] = useState(initialSortDirection || "ascending");

  // Handle sorting toggle
  const handleSort = (key) => {
    if (sortKey === key) {
      // Toggle direction
      setDirection(direction === "ascending" ? "descending" : "ascending");
    } else {
      // New sort key, default ascending
      setSortKey(key);
      setDirection("ascending");
    }
  };

  // Helper for showing sort icons
  const getSortIcon = (key) => {
    if (key === sortKey) {
      return direction === "ascending" ? <IoIosArrowUp /> : <IoIosArrowDown />;
    }
    return <IoIosArrowDown />;
  };

  // Build URL for sorting links
  const buildSortUrl = (key) => {
    // Calculate next direction (toggle if same key, else ascending)
    const nextDirection = sortKey === key && direction === "ascending" ? "descending" : "ascending";

    return `/dashboard/${pathname}?page=${currentPage}${
      query ? `&query=${query}` : ""
    }&sortKey=${key}&sortDirection=${nextDirection}`;
  };

  return (
    <div className="mt-4 z-50 max-sm:overflow-x-auto max-sm:h-screen">
      <table className="w-full bg-slate-100">
        <thead className="bg-primary text-tertiary">
          <tr className="p-4">
            <th className="text-start py-4">No</th>
            <th className="text-start">Guest</th>
            <th className="text-start">Room</th>
            <th className="text-start">Deposit</th>
            <th className="text-start">
              <Link href={buildSortUrl("price")} className="flex items-center gap-2 rounded-md">
                <p>Price/m</p>
                {getSortIcon("price")}
              </Link>
            </th>
            <th className="">
              <Link href={buildSortUrl("date")} className="flex text-center items-center gap-2 rounded-md">
                <p>Date</p>
                {getSortIcon("date")}
              </Link>
            </th>
            <th className="">
              <Link href={buildSortUrl("status")} className="flex text-center items-center gap-2 rounded-md">
                <p>Status</p>
                {getSortIcon("status")}
              </Link>
            </th>
            <th className="text-start">Action</th>
          </tr>
        </thead>
        <tbody>
          {booking.map((item, index) => (
            <tr
              key={item._id}
              className="odd:bg-white even:bg-gray-100 text-gray-900 dark:odd:bg-slate-200 dark:even:bg-gray-100 dark:text-tertiary"
            >
              <td className="p-2">
                <p>{(currentPage - 1) * itemPerPage + index + 1}</p>
              </td>
              <td className="p-2 font-bold">{item.userId.phone}</td>
              <td className="">{item.roomId.roomName}</td>
              <td className="">${item.deposit}</td>
              <td className="">${item.rent}</td>
              <td className="">{item.createdAt ? formatDate(item.createdAt) : "N/A"}</td>
              <td className="">{item.status}</td>
              <td className="">
                <ButtonViewAndDelete
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
  );
};

export default BookingList;
