"use client";
import {
  acceptService,
  cancelService,
  markAsCompleted,
  markAsRead,
} from "@/actions/services";
import {
  formatDate,
  formatDateOnly,
  formatDateTime,
  formatTo12Hour,
} from "@/utils/formatDate";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { BiCheckDouble } from "react-icons/bi";

const ServiceList = ({
  services,
  serviceCount,
  currentPage,
  itemPerPage,
  sortKey,
  sortDirection,
  query
}) => {
  const searchParams = useSearchParams()
  const [isClick, setIsClick] = useState("Requesting");
  const [direction, setDirection] = useState("descending");

  const statuses = ["pending", "accepted", "cancelled"];
  const [status, setStatus] = useState("")

  const handleSort = (e) => {

    setStatus((prev) => {

      const currentIndex = statuses.indexOf(prev);
      const nextIndex = (currentIndex + 1) % statuses.length;
      const params = new URLSearchParams(searchParams.toString());
      params.set("sortDirection", direction);
      params.set("sortKey", status)
      return statuses[nextIndex];
    });
  };

  const router = useRouter();

  // Update router query when status changes
  useEffect(() => {
    if (status) {
      router.push(`/dashboard/services?sortKey=${status}&sortDate=date&sortDirection=descending`);
    }
  }, [status]);

  const handleSortDate = (key) => {
    setDirection((prevDirection) =>
      prevDirection === "ascending" ? "descending" : "ascending"
    );
    const params = new URLSearchParams(searchParams.toString());
    params.set("sortDirection", direction);
    // params.set("sortKey", status)

  };


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

  const handleAccept = async (serviceId, telegramChatId) => {
    const response = await acceptService(serviceId, telegramChatId);
    if (response.error) {
      console.error("Error accepting service:", response.error);
    } else {
      console.log("Service accepted:", response.message);
    }
  };

  const handleCompleted = async (serviceId) => {
    const response = await markAsCompleted(serviceId);
    if (response.error) {
      console.error("Error mark as completed service:", response.error);
    } else {
      console.log("Service completed:", response.message);
    }
  };

  const handleAsRead = async (serviceId) => {
    const response = await markAsRead(serviceId);
    if (response.error) {
      console.error("Error mark as completed service:", response.error);
    } else {
      console.log("Service completed:", response.message);
    }
  };
  const buttonName = [
    { name: "Requesting", value: "pending" },
    { name: "Processing", value: "accepted" },
    { name: "Completed", value: "completed" },
  ];
  return (
    <div className="mt-4">
      <div className="text-xl font-bold flex gap-4 flex-wrap">
        {buttonName.map((item) => (
          <div key={item.name} className="relative mt-4">
            <span
              className={`${serviceCount.find(
                (service) => service.status.toLowerCase() === item.value
              ).count > 0
                  ? "bg-red-500"
                  : "hidden"
                } absolute -top-4 right-0  text-white text-xs rounded-full w-6 h-6 flex items-center justify-center`}
            >
              {serviceCount.find(
                (service) =>
                  service.status.toLowerCase() === item.value.toLowerCase()
              )?.count || 0}
            </span>
            <Link
              href={`/dashboard/services?sortKey=${item.value.toLowerCase()}`}
              value={item.name}
              onClick={() => handleClick(item.name)}
              className={`${item.name === isClick ? "bg-blue-500 text-primary" : "border"
                } p-4 rounded-md`}
            >
              {item.name}
            </Link>
          </div>
        ))}
      </div>
      <div className="mt-8 overflow-x-auto">
        {isClick === "Requesting" && (
          <table className="min-w-[800px] w-full table-auto border rounded-lg shadow">
            <thead className="bg-gray-100 text-left">
              <tr className="p-4 border-b">
                <th className="text-start p-2 inline-flex items-center gap-1 hover:underline">No</th>
                <th className="text-start p-2 whitespace-nowrap ">Room</th>
                <th className="text-start p-2 whitespace-nowrap">Guest name</th>
                <th className="text-start p-2 whitespace-nowrap">Phone</th>
                <th className="text-start p-2 whitespace-nowrap">
                  Requesting
                </th>
                <th className="text-start px-2 whitespace-nowrap">
                  <Link
                    href={`/dashboard/services?sortKey=${status}${query ? `&query=${query}` : ""}&sortDate=date&sortDirection=${direction}`}
                    className="flex text-center items-center gap-2 px-2 py-1 border rounded-md w-max"
                    onClick={handleSort}
                  >
                    <p>Status</p>

                  </Link>
                </th>
                <th className="text-start px-2 whitespace-nowrap">
                  <Link
                    href={`/dashboard/services?sortKey=${status}${query ? `&query=${query}` : ""}&sortDate=date&sortDirection=${direction}`}
                    className="flex text-center items-center gap-2 px-2 py-1 border rounded-md w-max"
                    onClick={() => handleSortDate()}
                  >
                    <p> Schedule</p>

                  </Link>
                </th>
                <th className="text-start px-2 whitespace-nowrap">Action</th>
                <th className="text-start px-2 whitespace-nowrap">CreatedAt</th>
              </tr>
            </thead>
            <tbody>
              {services?.map((service, index) => (
                <tr
                  title={service.note}
                  key={service._id || index}
                  className=" border-t"
                >
                  <td className="p-2 px-2">
                    <p>{Number(currentPage - 1) * itemPerPage + index + 1}</p>
                  </td>

                  <td className="font-bold px-2 whitespace-nowrap">{service.roomId.roomName}</td>
                  <td className="px-2 whitespace-nowrap">{service.userId.username}</td>
                  <td className="px-2">{service.userId.phone}</td>
                  <td className="px-2 whitespace-nowrap">
                    {service.serviceType}
                  </td>
                  <td className={``}>
                    <p
                      className={` 
                    ${service.status === "pending"
                          ? "bg-amber-200 text-amber-700 "
                          : service.status === "accepted"
                            ? "bg-green-200 text-green-700"
                            : "bg-red-200 text-red-700"
                        } capitalize px-2 w-max py-1 rounded `}
                    >
                      {service.status}
                    </p>
                  </td>
                  <td className="px-2 whitespace-nowrap">
                    <p>
                      {service.status === "cancelled"
                        ? formatDateTime(service.startDate)
                        : formatDateOnly(service.startDate) +
                        "-Time: " +
                        formatTo12Hour(service.startTime)}
                    </p>
                  </td>
                  <td className="">
                    {service.status === "pending" ? (
                      <div className="flex gap-2">
                        <div className="flex gap-2 flex-wrap py-1">
                          <button
                            onClick={() => handleAccept(service._id, service.userId.telegramChatId)}
                            type="button"
                            className="bg-green-400 px-4 rounded-full text-white"
                          >
                            Accept
                          </button>
                          <button
                            onClick={() => handleCancel(service._id)}
                            type="button"
                            className="bg-red-400 px-4 rounded-full text-white"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <></>
                    )}
                  </td>
                  <td className="w-max px-2 whitespace-nowrap">
                    {formatDateTime(service.createdAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {isClick === "Processing" && (
          <table className="min-w-[800px] w-full table-auto border rounded-lg shadow">
            <thead className="bg-gray-100 text-left">
              <tr className="p-4 border-b">
                <th className="text-start p-4">No</th>
                <th className="text-start p-2 whitespace-nowrap">Room</th>
                <th className="text-start p-2 whitespace-nowrap">Guest</th>
                <th className="text-start p-2 whitespace-nowrap">
                  Processing
                </th>
                <th className="text-start p-2 whitespace-nowrap">Status</th>
                <th className="text-start p-2 whitespace-nowrap">Schedule</th>
                <th className="text-start p-2 whitespace-nowrap">Action</th>
                <th className="text-start p-2 whitespace-nowrap">CreatedAt</th>
              </tr>
            </thead>
            <tbody>
              {services.length > 0 ? (
                services?.map((service, index) => (
                  <tr
                    title={service.note}
                    key={service._id || index}
                    className=" border"
                  >
                    <td className="p-2">
                      <p>{Number(currentPage - 1) * itemPerPage + index + 1}</p>
                    </td>

                    <td className="font-bold">{service.roomId.roomName}</td>

                    <td className="font-bold">{service.userId.phone}</td>
                    <td className="font-bold px-2 whitespace-nowrap">
                      {service.serviceType}
                    </td>
                    <td className={`px-2 whitespace-nowrap`}>
                      <p
                        className={` 
                   bg-amber-200 text-amber-700 capitalize w-max px-2 rounded-full `}
                      >
                        In process
                      </p>
                    </td>
                    <td className="px-2 whitespace-nowrap">
                      {formatDateOnly(service.startDate) +
                        "-Time: " +
                        formatTo12Hour(service.startTime)}
                    </td>
                    <td className="">
                      {service.status === "accepted" ? (
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleCompleted(service._id)}
                            type="button"
                            className="bg-green-400 hover:bg-green-500 rounded-full text-white px-2 whitespace-nowrap"
                          >
                            Mark as completed
                          </button>
                        </div>
                      ) : (
                        <></>
                      )}
                    </td>
                    <td className="px-2 whitespace-nowrap">
                      {formatDateTime(service.createdAt)}
                    </td>
                  </tr>
                ))) : (<tr>
                  <td colSpan="8" className="text-primary text-center py-4">
                    No processing services found.
                  </td>
                </tr>)}
            </tbody>
          </table>
        )}

        {isClick === "Completed" && (
          <table className="w-full bg-slate-500">
            <thead className="bg-primary text-tertiary">
              <tr className="p-4 border-b">
                <th className="text-start py-4">No</th>
                <th className="text-start px-2 whitespace-nowrap">Room</th>
                <th className="text-start px-2 whitespace-nowrap">Guest</th>
                <th className="text-start px-2 whitespace-nowrap">Completed</th>
                <th className="text-start px-2 whitespace-nowrap">Schedule</th>
                <th className="text-start px-2 whitespace-nowrap">Status</th>

                <th className="text-start">CompletedAt</th>

                <th className="text-start">Action</th>
              </tr>
            </thead>
            <tbody>
              {services.length > 0 ? (
                services?.map((service, index) => (
                  <tr
                    title={service.note}
                    key={service._id || index}
                    className=" odd:bg-green-100 even:bg-green-200 text-gray-900 dark:odd:bg-slate-200 dark:even:bg-gray-100 dark:text-tertiary"
                  >
                    <td className="p-2">
                      <p>{Number(currentPage - 1) * itemPerPage + index + 1}</p>
                    </td>

                    <td className="font-bold px-2 whitespace-nowrap">
                      {service.roomId.roomName}
                    </td>

                    <td className="font-bold px-2 whitespace-nowrap">
                      {service.userId.phone}
                    </td>
                    <td className="font-bold px-2 whitespace-nowrap">
                      {service.serviceType}
                    </td>
                    <td className="px-2 whitespace-nowrap">
                      {formatDateOnly(service.startDate) +
                        "-Time: " +
                        formatTo12Hour(service.startTime)}
                    </td>
                    <td className={``}>
                      <p
                        className={` 
                   bg-green-300 text-green-700 capitalize w-max px-2 rounded-full `}
                      >
                        Completed
                      </p>
                    </td>
                    <td className="px-2 whitespace-nowrap">
                      {formatDateTime(service.completedDate)}
                    </td>
                    <td className="">
                      {service.status === "completed" ? (
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleAsRead(service._id)}
                            type="button"
                            className="border whitespace-nowrap bg-slate-100 hover:bg-slate-200 px-4 rounded-full text-slate-700"
                          >
                            Mark as read
                          </button>
                        </div>
                      ) : (
                        <div className="flex justify-start px-2 items-center text-lg">
                          <BiCheckDouble />
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center py-4">
                    No completed services found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
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
