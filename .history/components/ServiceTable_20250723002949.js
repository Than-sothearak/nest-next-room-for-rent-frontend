"use client";
import {
  acceptService,
  cancelService,
  markAsCompleted,
  markAsRead,
} from "@/actions/services";
import {
  formatDateOnly,
  formatDateTime,
  formatTo12Hour,
} from "@/utils/formatDate";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { BiCheckDouble, BiSortAlt2 } from "react-icons/bi";

const ServiceTable = ({
  services,
  serviceCount,
  currentPage,
  itemPerPage,
  query,
}) => {
  const searchParams = useSearchParams();
  const [loadingId, setLoadingId] = useState(null); // holds service._id
  const [loadingAction, setLoadingAction] = useState(null); // "accept" or "cancel"

  const [isClick, setIsClick] = useState("Requesting");
  const [direction, setDirection] = useState("descending");

  const statuses = ["pending", "accepted", "cancelled"];
  const [status, setStatus] = useState("");

  const handleSort = (e) => {
    setStatus((prev) => {
      const currentIndex = statuses.indexOf(prev);
      const nextIndex = (currentIndex + 1) % statuses.length;
      const params = new URLSearchParams(searchParams.toString());
      params.set("sortDirection", direction);
      params.set("sortKey", status);
      return statuses[nextIndex];
    });
  };

  const router = useRouter();

  // Update router query when status changes
  useEffect(() => {
    if (status) {
      router.push(
        `/dashboard/services?sortKey=${status}&sortDate=date&sortDirection=descending`
      );
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
    setLoadingId(serviceId);
    setLoadingAction("cancel");
    const response = await cancelService(serviceId);
    if (response.error) {
      console.error("Error cancelling service:", response.error);
    } else {
      console.log("Service cancelled successfully:", response.message);
      setLoadingId(null);
      setLoadingAction(null);
    }
  };

  const handleAccept = async (serviceId, telegramChatId) => {
    setLoadingId(serviceId);
    setLoadingAction("accept");
    const response = await acceptService(serviceId, telegramChatId);
    if (response.error) {
      console.error("Error accepting service:", response.error);
    } else {
      console.log("Service accepted:", response.message);
      setLoadingId(null);
      setLoadingAction(null);
    }
  };

  const handleCompleted = async (serviceId, roomId) => {
    const response = await markAsCompleted(serviceId, roomId);
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
    <div className="mt-8">
      <div className="flex max-sm:justify-center justify-start gap-2 rounded-3xl ">
        {buttonName.map((item) => (
          <div key={item.name} className="relative ">
            <span
              className={`${
                serviceCount?.find(
                  (service) => service.status?.toLowerCase() === item?.value
                ).count > 0
                  ? "bg-red-500"
                  : "hidden"
              } absolute -top-4 right-0  text-white text-xs rounded-full w-6 h-6 flex items-center justify-center z-10`}
            >
              {serviceCount.find(
                (service) =>
                  service.status.toLowerCase() === item.value.toLowerCase()
              )?.count || 0}
            </span>
            <Link
              href={`/dashboard/services?sortKey=${
                item.name === "Requesting"
                  ? "requesting"
                  : item.value.toLowerCase()
              }`}
              value={item.name}
              onClick={() => handleClick(item.name)}
              className="group"
            >
              <div
                className={`${
                  item.name === isClick ? "bg-blue-500 text-primary" : "bg-slate-200"
                } rounded-3xl p-4 z-0 transition-all duration-300 `}
              >
                {item.name}
              </div>
            </Link>
          </div>
        ))}
      </div>

      
      <div className="mt-8 overflow-x-auto">
        {isClick === "Requesting" && (
          <table className="min-w-[800px] w-full table-auto border rounded-lg shadow">
            <thead className="bg-gray-100 text-left">
              <tr className="p-4 border-b">
                <th className="text-start p-2 inline-flex items-center gap-1 hover:underline">
                  No
                </th>
                <th className="text-start p-2 whitespace-nowrap ">Room</th>
                <th className="text-start whitespace-nowrap">
                  <Link
                    href={`/dashboard/services?query=${query}&sortKey=${status}&sortDate=date&sortDirection=${direction}`}
                    className="flex text-center items-center gap-2 rounded-md w-max"
                    onClick={handleSort}
                  >
                    <p className="capitalize">{status ? status : "Status"}</p>
                    <BiSortAlt2 size={16} />
                  </Link>
                </th>
                <th className="text-start p-2 whitespace-nowrap">Guest name</th>
                <th className="text-start p-2 whitespace-nowrap">Phone</th>
                <th className="text-start p-2 whitespace-nowrap">Requesting</th>

                <th className="text-start px-2 whitespace-nowrap">
                  <Link
                    href={`/dashboard/services?sortKey=${status}&sortDate=date&sortDirection=${direction}`}
                    className="flex text-center items-center gap-2 rounded-md w-max"
                    onClick={() => handleSortDate()}
                  >
                    <p> Schedule</p>
                    <BiSortAlt2 size={16} />
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

                  <td className="font-bold px-2 whitespace-nowrap">
                    {service.roomId.roomName}
                  </td>
                  <td className={``}>
                    <p
                      className={` 
                    ${
                      service.status === "pending"
                        ? "bg-amber-200 text-amber-700 "
                        : service.status === "accepted"
                        ? "bg-green-200 text-green-700"
                        : service.status === "completed"
                        ? "bg-green-300 text-green-700"
                        : service.status === "marked as read"
                        ? "bg-green-300 text-green-700"
                        : "bg-red-200 text-red-700"
                    } capitalize px-2 w-max py-1 rounded `}
                    >
                      {service.status === "marked as read"
                        ? "Completed"
                        : service.status}
                    </p>
                  </td>
                  <td className="px-2 whitespace-nowrap">
                    {service.userId.username}
                  </td>
                  <td className="px-2">{service.userId.phone}</td>
                  <td className="px-2 whitespace-nowrap">
                    {service.serviceType}
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
                            onClick={() =>
                              handleAccept(
                                service._id,
                                service.userId.telegramChatId
                              )
                            }
                            type="button"
                            className={`px-4 rounded-full text-white transition ${
                              loadingId === service._id &&
                              loadingAction === "accept"
                                ? "bg-green-400 opacity-50 cursor-wait"
                                : "bg-green-400 hover:bg-green-500"
                            }`}
                          >
                            Accept
                          </button>
                          <button
                            onClick={() => handleCancel(service._id, service.userId.telegramChatId )}
                            type="button"
                            className={`px-4 rounded-full text-white transition ${
                              loadingId === service._id &&
                              loadingAction === "cancel"
                                ? "bg-red-900 opacity-50 cursor-wait"
                                : "bg-red-900 hover:bg-red-500"
                            }`}
                          >
                            Cancel {service.userId}
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
                <th className="text-start p-2">No</th>
                <th className="text-start p-2 whitespace-nowrap">Room</th>
                <th className="text-start p-2 whitespace-nowrap">Guest name</th>
                <th className="text-start p-2 whitespace-nowrap">Phone</th>
                <th className="text-start p-2 whitespace-nowrap">Processing</th>
                <th className="text-start px-2 whitespace-nowrap">
                  <p>Status</p>
                </th>
                <th className="text-start px-2 whitespace-nowrap">
                  <Link
                    href={`/dashboard/services?sortKey=accepted${
                      query ? `&query=${query}` : ""
                    }&sortDate=date&sortDirection=${direction}`}
                    className="flex text-center items-center gap-2 px-2 py-1 border rounded-md w-max"
                    onClick={() => handleSortDate()}
                  >
                    <p>Schedule</p>
                  </Link>
                </th>
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
                    className=" border-b"
                  >
                    <td className="p-2">
                      <p>{Number(currentPage - 1) * itemPerPage + index + 1}</p>
                    </td>

                    <td className="font-bold">{service.roomId.roomName}</td>
                    <td className="p-2 whitespace-nowrap">
                      {service.userId.username}
                    </td>
                    <td className="">{service.userId.phone}</td>
                    <td className="font-bold px-2 whitespace-nowrap">
                      {service.serviceType}
                    </td>
                    <td className={`px-2 whitespace-nowrap`}>
                      <p
                        className={` 
                   bg-amber-200 text-amber-700 capitalize w-max px-2 rounded`}
                      >
                        {service.status}
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
                            onClick={() =>
                              handleCompleted(service._id, service.roomId._id)
                            }
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
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center py-4">
                    No processing services found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}

        {isClick === "Completed" && (
          <table className="min-w-[800px] w-full table-auto border rounded-lg shadow">
            <thead className="bg-gray-100 text-left">
              <tr className="p-4 border-b">
                <th className="text-start p-2">No</th>
                <th className="text-start p-2 whitespace-nowrap">Room</th>
                <th className="text-start p-2 whitespace-nowrap">Guest</th>
                <th className="text-start p-2 whitespace-nowrap">Completed</th>
                <th className="text-start p-2 whitespace-nowrap">Schedule</th>
                <th className="text-start p-2 whitespace-nowrap">Status</th>

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
                    className="border-b"
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
    </div>
  );
};

export default ServiceTable;
