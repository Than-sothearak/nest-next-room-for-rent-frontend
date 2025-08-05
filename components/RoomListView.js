import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaBook, FaEdit, FaEye } from "react-icons/fa";
import { TbAirConditioning } from "react-icons/tb";
import ButtonDelete from "./ButtonDelete";
import { GrStatusDisabled, GrStatusGood } from "react-icons/gr";
import { IoPersonAdd } from "react-icons/io5";
import { FaStairs } from "react-icons/fa6";
import { getFormattedAgoText } from "@/utils/formatDate";

const RoomListView = ({
  iconMap,
  optimisticData,
  session,
  setOptimisticData,
  currentPage,
  itemPerPage,
}) => {
  return (
    <div className="overflow-x-auto w-full">
      <table className="min-w-full border border-gray-300 bg-white rounded-lg shadow-md">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="px-4 py-2">No</th>
            <th className="px-4 py-2">Image</th>
            <th className="px-4 py-2">Room Number</th>
            <th className="px-4 py-2">Category</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Floor</th>
            <th className="px-4 py-2">Capacity</th>
            <th className="px-4 py-2">Aircon Cleaned</th>
            <th className="px-4 py-2 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {optimisticData?.map((room, index) => (
            <tr
              key={index}
              className="border-t border-gray-200 hover:bg-gray-50 transition"
            >
                 <td className="px-4 py-2 whitespace-nowrap">
                <strong>{(currentPage - 1) * itemPerPage + index + 1} </strong>
              </td>
              {/* Image */}
              <td className="px-4 py-2 whitespace-nowrap">
                <Image
                  className="object-cover w-20 h-20 rounded-md whitespace-nowrap"
                  width={80}
                  height={80}
                  alt="Room image"
                  src={
                    room?.imageUrls[0] ||
                    "https://cdn.pixabay.com/photo/2016/11/30/08/48/bedroom-1872196_1280.jpg"
                  }
                />
              </td>

              {/* Room Number */}
              <td className="px-4 py-2 whitespace-nowrap">
                <strong>{room.roomName}</strong>
              </td>

              {/* Category */}
              <td className="px-4 py-2 whitespace-nowrap">{room.category?.category}</td>

              {/* Status */}
              <td className="px-4 py-2">
                <div
                  className={`flex items-center gap-1 ${
                    room?.status === 1 ? "text-green-600" : "text-red-500"
                  }`}
                >
                  {room?.status === 1 ? (
                    <>
                      <GrStatusGood /> <span>Available</span>
                    </>
                  ) : (
                    <>
                      <GrStatusDisabled /> <span>Unavailable</span>
                    </>
                  )}
                </div>
              </td>

              {/* Floor */}
              <td className="">
                <div className="px-4 py-2 flex items-center gap-1">
                <FaStairs /> {room?.floor}
                  </div>
              </td>

              {/* Capacity */}
              <td className="">
                <div className="px-4 py-2 flex items-center gap-1">
                    <IoPersonAdd /> {room?.capacity}
                </div>
              </td>

              {/* Aircon Clean Date */}

              <td>
                <div className="flex items-center gap-1 px-4">
                  <TbAirConditioning size={20} />
                  {room?.airConditionerCleanDate ? (
                    <span className="italic text-sm whitespace-nowrap">
                      ({getFormattedAgoText(room?.airConditionerCleanDate)})
                    </span>
                  ) : (
                    <span>N/A</span>
                  )}
                </div>
              </td>
              {/* Actions */}
              <td className="px-4 py-2 text-center">
                <div className="flex justify-center gap-3 text-lg">
                  <Link
                    href={
                      room?.bookings && room.bookings.length > 0
                        ? `/dashboard/booking/${room.bookings[0]?._id}`
                        : `/dashboard/booking/${room._id}`
                    }
                    title="Booking"
                  >
                    <FaBook />
                  </Link>

                  <Link href={`/dashboard/rooms/view/${room._id}`} title="View">
                    <FaEye />
                  </Link>

                  <Link href={`/dashboard/rooms/${room._id}`} title="Edit">
                    <FaEdit />
                  </Link>

                  <ButtonDelete
                    session={session}
                    id={room._id}
                    setOptimisticData={setOptimisticData}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RoomListView;
