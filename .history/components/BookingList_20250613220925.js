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
function getNextPaymentDate(startDate, endDate) {
  const today = new Date();
  const startDay = startDate.getDate();

  // Start with this month's payment date on startDay
  let nextPayment = new Date(today.getFullYear(), today.getMonth(), startDay);

  // If this month's payment day already passed (before today), move to next month
  if (nextPayment <= today) {
    nextPayment = new Date(today.getFullYear(), today.getMonth() + 1, startDay);
  }

  // If next payment date is after contract end date, no next payment (return null)
  if (endDate && nextPayment > endDate) {
    return null;
  }

  return nextPayment;
}

  return (
   
      <div className="mt-4 z-50 max-sm:overflow-x-auto max-sm:h-screen">
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
            {booking.map((item, index) => (
              <tr key={item._id} className=" odd:bg-white even:bg-gray-100 text-gray-900 dark:odd:bg-slate-200 dark:even:bg-gray-100 dark:text-tertiary">
                <td className="p-2">
                  <p>{Number(currentPage - 1) * itemPerPage + index + 1}</p>
                </td>

               
                <td className="font-bold">
                  {item.roomId.roomName}
                </td>

                 <td className="p-2 font-bold">
                  {item.userId.phone}
                </td>
              
                <td className="">
                  ${item.rent}
                </td>
              
                 <td className="">
                  {item.createdAt ? formatDate(item.createdAt) : "N/A"}
                </td>
                   <td className="">
                {getNextPaymentDueDate(item.startDate, item.endDate)}
              </td>
                <td className="">
                  {item.status}
                </td>
                    {/* Next Payment Due Date */}
             
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
