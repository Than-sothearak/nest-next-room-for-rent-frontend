"use client";
import { acceptService, cancelService } from "@/actions/services";
import { formatDate, formatDateOnly, formatDateTime, formatTo12Hour } from "@/utils/formatDate";
import Link from "next/link";
import React, { useState } from "react";

const ServiceList = ({ services, currentPage, itemPerPage, sortKey }) => {
  const [isClick, setIsClick] = useState("Requesting");

  function handleClick(item) {
    setIsClick(item);
  }
    const handleCancel = async (serviceId) => {
      const response = await cancelService(serviceId);
      if (response.error) {
        console.error("Error cancelling service:", response.error);
      } else {
        console.log("Service cancelled successfully:", response.message);
      }
    };

      const handleAccept= async (serviceId) => {
      const response = await acceptService(serviceId);
      if (response.error) {
        console.error("Error accepting service:", response.error);
      } else {
        console.log("Service accepted:", response.message);
      }
    };

  const buttonName = ["Requesting", "Processing", "Completed"];
  return (
    <div className="w-full h-full mt-4">
      <div className="text-xl font-bold flex gap-2 flex-wrap">
        {buttonName.map((item) => (
          <Link
            href={`/dashboard/services?sortKey=${item.toLowerCase()}`}
            value={item}
            onClick={() => handleClick(item)}
            key={item}
            className={`${
              item === isClick ? "bg-blue-500 text-primary" : "border"
            } p-4 rounded-md`}
          >
            {item}
          </Link>
        ))}
      </div>
      {isClick === "Requesting" && (
        <table className="w-full bg-slate-500 max-lg:hidden">
          <thead className="bg-primary text-tertiary">
            <tr className="p-4 border-b">
              <th className="text-start py-4">No</th>
              <th className="text-start">Room</th>
              <th className="text-start">Guest</th>
              <th className="text-start">Requesting</th>
              <th className="text-start">Status</th>
              <th className="text-start">Schedule</th>
              <th className="text-start">Action</th>
              <th className="text-start">CreatedAt</th>
            </tr>
          </thead>
          <tbody>
            {services?.map((service, index) => (
              <tr
                title={service.note}
                key={service._id || index}
                className=" odd:bg-white even:bg-gray-100 text-gray-900 dark:odd:bg-slate-200 dark:even:bg-gray-100 dark:text-tertiary"
              >
                <td className="p-2">
                  <p>{Number(currentPage - 1) * itemPerPage + index + 1}</p>
                </td>

                <td className="font-bold">{service.roomId.roomName}</td>

                <td className="font-bold">{service.userId.phone}</td>
                <td className="font-bold">{service.serviceType}</td>
                <td className={``}>
                  <p className={` 
                    ${service.status === 'pending' ? 
                    'bg-amber-200 text-amber-700 ' 
                    : service.status === 'accepted' ?
                    'bg-green-200 text-green-700'
                    : 'bg-red-200 text-red-700'} capitalize w-max px-4 rounded-full `}>
                    {service.status}
                  </p>
                </td>
                <td className="">{service.status === 'cancelled' ? service.startTime : formatDateOnly(service.startDate)+ "-Time: " + formatTo12Hour(service.startTime) }</td>
                <td className="">
                {service.status === 'pending' ?  <div className="flex gap-2">
                    <button 
                       onClick={() => handleAccept(service._id)}
                      type="button"
                      className="bg-green-400 px-4 rounded-full text-white">
                      Accept
                    </button>
                    <button 
                     onClick={() => handleCancel(service._id)}
                      type="button"
                    className="bg-red-400 px-4 rounded-full text-white">
                      Cancel
                    </button>
                  </div> : <></>}
                </td>
                <td>
                    {formatDate(service.createdAt)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {isClick === "Processing" && (
        <table className="w-full bg-slate-500 max-lg:hidden">
          <thead className="bg-primary text-tertiary">
            <tr className="p-4 border-b">
              <th className="text-start py-4">No</th>
              <th className="text-start">Room</th>
              <th className="text-start">Guest</th>
              <th className="text-start">Processing</th>
              <th className="text-start">Status</th>
                 <th className="text-start">Schedule</th>
              <th className="text-start">Action</th>
              <th className="text-start">CreatedAt</th>
            </tr>
          </thead>
          <tbody>
            {services?.map((service, index) => (
              <tr
                title={service.note}
                key={service._id || index}
                className=" odd:bg-white even:bg-gray-100 text-gray-900 dark:odd:bg-slate-200 dark:even:bg-gray-100 dark:text-tertiary"
              >
                <td className="p-2">
                  <p>{Number(currentPage - 1) * itemPerPage + index + 1}</p>
                </td>

                <td className="font-bold">{service.roomId.roomName}</td>

                <td className="font-bold">{service.userId.phone}</td>
                <td className="font-bold">{service.serviceType}</td>
                <td className={``}>
                  <p className={` 
                    ${service.status === 'pending' ? 
                    'bg-amber-200 text-amber-700 ' 
                    : service.status === 'accepted' ?
                    'bg-green-200 text-green-700'
                    : 'bg-red-200 text-red-700'} capitalize w-max px-4 rounded-full `}>
                    {service.status}
                  </p>
                </td>
                <td className="">{service.status === 'cancelled' ? service.startTime : formatDateOnly(service.startDate)+ "-Time: " + formatTo12Hour(service.startTime) }</td>
                <td className="">
                {service.status === 'pending' ?  <div className="flex gap-2">
                    <button 
                       onClick={() => handleAccept(service._id)}
                      type="button"
                      className="bg-green-400 px-4 rounded-full text-white">
                      Accept
                    </button>
                    <button 
                     onClick={() => handleCancel(service._id)}
                      type="button"
                    className="bg-red-400 px-4 rounded-full text-white">
                      Cancel
                    </button>
                  </div> : <></>}
                </td>
                <td>
                    {formatDate(service.createdAt)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {isClick === "Completed" && (
        <table className="w-full bg-slate-500 max-lg:hidden">
          <thead className="bg-primary text-tertiary">
            <tr className="p-4 border-b">
              <th className="text-start py-4">No</th>
              <th className="text-start">Room</th>
              <th className="text-start">Guest</th>
              <th className="text-start">Completed</th>
              <th className="text-start">Status</th>
              <th className="text-start">Date/Time</th>
              <th className="text-start">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr className=" odd:bg-green-100 even:bg-green-200 text-gray-900 dark:odd:bg-slate-200 dark:even:bg-gray-100 dark:text-tertiary">
              <td className="p-2">
                <p>1</p>
              </td>

              <td className="font-bold">123E</td>

              <td className="font-bold">086643205</td>
              <td className="font-bold">Cleaning room</td>
              <td className={``}>
                <p className="bg-green-200 w-max px-4 rounded-full text-green-700">
                  Completed
                </p>
              </td>
              <td>12-07-2025 12:00</td>
              <td className="">
                <div className="flex gap-2">
                  <button className="bg-red-400 px-4 rounded-full text-white">
                    Cancel
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      )}
      <div className="lg:hidden">
        <div className="bg-white border mt-4 dark:bg-slate-200 p-4 mb-4 rounded-lg shadow-md">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-lg">
              <p className="text-xl">
                <strong>Room:</strong>sad
              </p>
            </h3>
          </div>

          <div className="flex item-center gap-2 font-bold text-xl">
            <p>Guest:</p> <h2>sd</h2>
          </div>
          <p>
            <strong>Price/m:</strong> asd
          </p>
          <p>
            <strong>Date:</strong> das
          </p>
          <p>
            <strong>Due Date:</strong> 120
          </p>
          <div className="flex justify-between items-center">
            <div className="flex gap-2"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceList;
