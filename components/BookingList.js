"use client";
import React, { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { formatDate } from "@/utils/formatDate";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import ButtonViewAndDelete from "./ButtonViewAndDelete";

const BookingList = ({ 
    session,
   booking,
  currentPage,
  itemPerPage,
  sortKey,
  pathname,
  query,
}) => {

      const [direction, setDirection] = useState("ascending");
    
      const searchParams = useSearchParams()
    
      const getSortIcon = (key) => {
        if (key === sortKey) {
          return direction === "ascending" ? (
            <IoIosArrowUp />
          ) : (
            <IoIosArrowDown />
          );
        } else {
          return <IoIosArrowDown />;
        }
      };
  return (
    <>
      <div className="overflow-x-auto mt-4">
        <table className="w-full border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">No</th>
              <th className="border border-gray-300 px-4 py-2">Guest number</th>
              <th className="border border-gray-300 px-4 py-2">Room number</th>
              <th className="border border-gray-300 px-4 py-2">Deposit</th>
              <th className=" border-gray-300 px-4 py-2 border">
                <Link
                  href={`/dashboard/${pathname}?page=${currentPage}${
                    query ? `&query=${query}` : ""
                  }&sortKey=price&sortDirection=${direction}`}
                  onClick={() => handleSort("price")}
                  className="flex text-center items-center gap-2 px-2 py-1 border rounded-md"
                >
                  <p>Price/month</p>
                  {getSortIcon("price")}
                </Link>
              </th>
              <th className=" border-gray-300 px-4 py-2">
                <Link
                  href={`/dashboard/${pathname}?page=${currentPage}${
                    query ? `&query=${query}` : ""
                  }&sortKey=date&sortDirection=${direction}`}
                  onClick={() => handleSort("date")}
                  className="flex text-center items-center gap-2 px-2 py-1 border rounded-md"
                >
                  <p>Start date</p>
                  {getSortIcon("date")}
                </Link>
              </th>
              <th className="border border-gray-300 px-4 py-2">
                <Link
                  href={`/dashboard/${pathname}?page=${currentPage}${
                    query ? `&query=${query}` : ""
                  }&sortKey=status&sortDirection=${direction}`}
                  onClick={() => handleSort("status")}
                  className="flex text-center items-center gap-2 px-2 py-1 border rounded-md"
                >
                  <p>Status</p>
                  {getSortIcon("status")}
                </Link>
              </th>
               <th className="border border-gray-300 px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {booking.map((item, index) => (
              <tr key={item._id}>
                <td className="border border-gray-300 px-4 py-2">
                  <p>{Number(currentPage - 1) * itemPerPage + index + 1}</p>
                </td>

                <td className="border border-gray-300 px-4 py-2">
                  {item.userId.phone}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {item.roomId.roomName}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  ${item.deposit}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  ${item.rent}
                </td>
                 <td className="border border-gray-300 px-4 py-2">
                  {item.createdAt ? formatDate(item.createdAt) : "N/A"}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {item.status}
                </td>
                  <td className="border border-gray-300 px-4 py-2">
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
    </>
  );
};

export default BookingList;
