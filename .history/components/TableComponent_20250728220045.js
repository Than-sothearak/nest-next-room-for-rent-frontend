"use client";
import React, { useOptimistic } from "react";
import { PiEmptyThin } from "react-icons/pi";
import ButtonViewAndDelete from "./ButtonViewAndDelete";
import { useFormStatus } from "react-dom";
import Image from "next/image";
import { formatDate, timeAgo } from "@/utils/formatDate";

const TableComponent = ({
  productCount,
  data,
  columns,
  pageName,
  session,
  currentPage,
  itemPerPage,
}) => {
  const { pending } = useFormStatus();

  const [optimisticData, setOptimisticData] = useOptimistic(
    data,
    (currentData, id) => {
      return currentData.filter((data) => data._id !== id);
    }
  );

  return (
    <div className="overflow-y-clip overflow-x-auto">
      <h1 className="mt-4">Total: {productCount}</h1>
      {optimisticData.length !== 0 ? (
        <table className="my-4 w-full text-sm">
          <thead>
            <tr className="font-bold h-10">
              <td>No</td>
              {columns.map((col, index) => (
                <td key={index} className="px-4">
                  {col.header}
                </td>
              ))}

              <td className="text-end">Action</td>
            </tr>
          </thead>
          <tbody>
            {optimisticData.map((row, index) => (
              <tr
                key={index}
                className="border-b border-secondary hover:bg-secondary"
              >
                <td>{(Number(currentPage) - 1) * itemPerPage + index + 1}</td>
                {columns.map((column, colIndex) => (
                  <td key={colIndex} className="py-4 px-4  whitespace-nowrap" 
                  title={`${row[column.accessor] === "lastLogin" ? 'lala': 'lolol'}`}>
                    <div className="flex gap-2 justify-start items-center">
                      {colIndex === 0 && (
                        <div className="relative aspect-square h-10 w-10  ">
                          {" "}
                          <Image
                            fill
                            alt="Image"
                            src={
                              Array.isArray(row.imageUrls) &&
                              row.imageUrls.length > 0
                                ? row.imageUrls[0] // Take the first image from the array
                                : row.imageUrl // If imageUrl is a string, use it
                                ? row.imageUrl
                                : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8K9TdeuJNHtTMH-JaUph5CgQ7P1nYgx8z9w&s"
                            }
                            className="rounded-sm object-cover"
                          />
                        </div>
                      )}
                      {/* Name column (truncated) */}
                      {column.accessor === "productName" ? (
                        <span className="truncate overflow-hidden whitespace-nowrap max-w-[150px] block ">
                          {row[column.accessor]}
                        </span>
                      ) : column.accessor === "category" ? (
                        row.category?.category || "No Category"
                      ) : column.accessor === "isAdmin" ? (
                        row[column.accessor] ?  "Admin" : "User" 
                      ) : column.accessor === "status" ? (
                        row[column.accessor] === 'active' ?  "Avtive" : "Deactivated" 
                      ): column.accessor === "createdAt" ? (
                        formatDate(row[column.accessor]) 
                      ) : column.accessor === "lastLogin" ? (
                        timeAgo(row[column.accessor]) 
                      ) 
                      
                      : column.accessor ? (
                        row[column.accessor]
                      ) : (
                        row[column.header]
                      )}
                    </div>
                  </td>
                ))}
                <td className="relative ">
                  <ButtonViewAndDelete
                    session={session}
                    link={`/dashboard/${pageName}/${row._id}`}
                    id={row._id}
                    pending={pending}
                    setOptimisticData={setOptimisticData}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="text-slate-500 py-4 text-md flex gap-2 justify-start items-center">
          <PiEmptyThin size={24} />
          <p className="">No user founded</p>
        </div>
      )}
    </div>
  );
};

export default TableComponent;
