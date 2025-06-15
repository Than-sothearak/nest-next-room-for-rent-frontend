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
function getNextPaymentDueDate(startDate, endDate) {
  if (!startDate) return "N/A";

  const now = new Date();
  const start = new Date(startDate);
  const end = new Date(endDate);

  if (now > end) return "Contract ended";

  // Get day of month from startDate
  const dueDay = start.getDate();

  // Start counting from startDate's month/year
  let year = now.getFullYear();
  let month = now.getMonth();

  // If today's day >= dueDay, next due is next month on dueDay, else this month on dueDay
  if (now.getDate() >= dueDay) {
    month += 1;
    if (month > 11) {
      month = 0;
      year += 1;
    }
  }

  // Construct next due date with the dueDay
  const nextDueDate = new Date(year, month, dueDay);

  // If nextDueDate is after contract end, return ended
  if (nextDueDate > end) return "Contract ended";

  return formatDate(nextDueDate);
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
                {getNextPaymentDueDate(item.startDate, item.endDate)}
              </td>
                 <td className="">
                  {item.createdAt ? formatDate(item.createdAt) : "N/A"}
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
