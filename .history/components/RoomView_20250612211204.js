import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaEdit, FaStickyNote } from "react-icons/fa";
import {
  FaBed,
  FaBook,
  FaEye,
  FaRegClock,
  FaRegSnowflake,
  FaRulerCombined,
  FaStairs,
  FaWifi,
} from "react-icons/fa6";
import { GrStatusGood } from "react-icons/gr";
import { IoPersonAdd } from "react-icons/io5";
import { MdOutlineSmokeFree } from "react-icons/md";

export const RoomView = ({ data }) => {
  const iconMap = {
    Notes: FaStickyNote,
    "Air Conditioner": FaRegSnowflake,
    "Free Wi-Fi": FaWifi,
    "Minimum Stay": FaRegClock,
    "Bed Type": FaBed,
    Notes: MdOutlineSmokeFree,
    Size: FaRulerCombined,
  };

  return (
    <div className="my-4">
      <h1 className="text-2xl font-bold mb-4">Room List</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {data.map((room, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md w-full flex flex-col justify-between"
          >
            <div className="w-full">
              <div className="relative w-full h-64 rounded-md group">
                {/* Overlay */}
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-40 transition-opacity duration-300 rounded-md z-10" />
                <Image
                  className="object-cover rounded-md transition-opacity duration-300 group-hover:opacity-80"
                  fill
                  alt="Example image"
                  sizes="100vw"
                  src={room.imageUrls[0]}
                />
                <div className="absolute z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center gap-4 text-white font-bold text-lg">
                  <button
                    className="flex justify-center items-center text-slate-200 transition-all opacity-0 group-hover:opacity-100
                duration-300 
               transform  hover:scale-125 bg-black/70 p-4  rounded-full"
                    title="Booking room"
                  >
                    <FaBook />
                  </button>

                     <button
                    className="flex justify-center items-center text-slate-200 transition-all opacity-0 group-hover:opacity-100
                duration-300 
               transform  hover:scale-125 bg-black/70 p-4  rounded-full"
                    title="View room details"
                  >
                    <FaEye />
                  </button>

                     <Link
                     href={`/dashboard/admin/rooms/${room._id}`}
                    className="flex justify-center items-center text-slate-200 transition-all opacity-0 group-hover:opacity-100
                duration-300 
               transform  hover:scale-125 bg-black/70 p-4  rounded-full"
                    title="Editing"
                  >
                    <FaEdit />
                  </Link>
                </div>
              </div>

              <div className="p-2">
                <h2 className="text-md font-semibold mb-2">
                  Room number: {room.roomName}
                </h2>
                <div>
                  <p>{room.category.category}</p>
                </div>
              </div>

              <div className="w-full justify-between flex px-4 ">
                <div
                  className={`flex gap-1 items-center ${
                    room?.status === 1 ? "text-green-500" : "text-red-500"
                  }`}
                >
                  <GrStatusGood />
                  {room?.status === 1 ? "available" : "unavailable"}
                </div>
                  <div className="flex gap-1 items-center">
                  <FaStairs />
                  {room?.floor}
                </div>
                <div className="flex gap-1 items-center">
                  <IoPersonAdd />
                  {room?.capacity}
                </div>
              </div>
            </div>
            <div className="flex flex-wrap items-center px-4 py-2">
              {room?.properties?.map((property, index) => {
                const Icon = iconMap[property.part] || FaStickyNote;

                return (
                  <div
                    key={index}
                    className="text-sm flex items-center text-gray-600 px-2 py-1 bg-gray-100 rounded-full mr-2 mb-2"
                  >
                    <Icon className="w-4 h-4 text-gray-500 mr-1" />
                    <p> {property.value}</p>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
