import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaBook, FaEdit, FaEye, FaStickyNote } from "react-icons/fa";
import { TbAirConditioning } from "react-icons/tb";
import ButtonDelete from "./ButtonDelete";
import { GrStatusDisabled, GrStatusGood } from "react-icons/gr";
import { IoPersonAdd } from "react-icons/io5";
import { FaStairs } from "react-icons/fa6";
import { getFormattedAgoText } from "@/utils/formatDate";

const RoomGridView = ({
  iconMap,
  optimisticData,
  session,
  setOptimisticData,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {optimisticData?.map((room, index) => (
        <div
          key={index}
          className="bg-white rounded-lg shadow-md w-full flex flex-col justify-between relative"
        >
          <div className="w-full">
            <div className="relative w-full h-64 rounded-md group">
              {/* Overlay */}
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-40 transition-opacity duration-300 rounded-md z-10" />
              <Image
                className="object-cover rounded-md transition-opacity duration-300 group-hover:opacity-80"
                fill
                alt="Example image"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                src={
                  room?.imageUrls[0] ||
                  "https://cdn.pixabay.com/photo/2016/11/30/08/48/bedroom-1872196_1280.jpg"
                }
              />
              <div className="p-4 absolute z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center gap-4 text-white font-bold text-lg w-full flex-wrap">
                {room?.bookings && room.bookings?.length > 0 ? (
                  <Link
                    href={`/dashboard/booking/${room.bookings[0]?._id}`}
                    className="flex justify-center items-center text-slate-200 transition-all opacity-0 group-hover:opacity-100
                duration-300 
               transform  hover:scale-125 bg-black/70 p-4  rounded-full"
                    title="Edit your booking"
                  >
                    <FaBook />
                  </Link>
                ) : (
                  <Link
                    href={`/dashboard/booking/${room._id}`}
                    className="flex justify-center items-center text-slate-200 transition-all opacity-0 group-hover:opacity-100
                duration-300 
               transform  hover:scale-125 bg-black/70 p-4  rounded-full"
                    title="Go to booking"
                  >
                    <FaBook />
                  </Link>
                )}

                <Link
                  href={`/dashboard/rooms/view/${room._id}`}
                  className="flex justify-center items-center text-slate-200 transition-all opacity-0 group-hover:opacity-100
                duration-300 
               transform  hover:scale-125 bg-black/70 p-4  rounded-full"
                  title="View room details"
                >
                  <FaEye />
                </Link>

                <Link
                  href={`/dashboard/rooms/${room._id}`}
                  className="flex justify-center items-center text-slate-200 transition-all opacity-0 group-hover:opacity-100
                duration-300 
               transform  hover:scale-125 bg-black/70 p-4  rounded-full"
                  title="Editing"
                >
                  <FaEdit />
                </Link>

                <div
                  className="flex justify-center items-center text-slate-200 transition-all opacity-0 group-hover:opacity-100
                duration-300 
               transform  hover:scale-125 bg-black/70 p-4  rounded-full"
                >
                  <ButtonDelete
                    session={session}
                    id={room._id}
                    setOptimisticData={setOptimisticData}
                  />
                </div>
              </div>
            </div>

            <div className="p-2">
              <h2 className="text-md font-semibold mb-2">
                Room number: {room.roomName}
              </h2>
              <div>
                <p>{room.category?.category}</p>
              </div>
            </div>

            <div className="w-full justify-between flex px-4 flex-wrap">
              <div
                className={`flex gap-1 items-center ${
                  room?.status === 1 ? "text-green-500" : "text-red-500"
                }`}
              >
                {room?.status === 1 ? (
                  <div className="flex items-center gap-1">
                    <GrStatusGood />
                    <p>available</p>
                  </div>
                ) : (
                  <div className="flex items-center gap-1">
                    <GrStatusDisabled />
                    <p>unavailable</p>
                  </div>
                )}
              </div>
              <div className="flex gap-2">
                <div className="flex gap-1 items-center" title="Floor">
                  <FaStairs />
                  {room?.floor}
                </div>
                <div className="flex gap-1 items-center" title="Capacity">
                  <IoPersonAdd />
                  {room?.capacity}
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap items-center px-4 py-2">
            {room?.properties?.map((property, index) => {
              const Icon = iconMap[property.part] || FaStickyNote;

              return (
                <div
                  title={property?.part}
                  key={index}
                  className="text-sm flex items-center text-gray-600 px-2 py-1 bg-gray-100 rounded-full mr-2 mb-2"
                >
                  <Icon className="w-4 h-4 text-gray-500 mr-1" />
                  <p> {property?.value}</p>
                </div>
              );
            })}
          </div>

          <div className="absolute bg-primary/50 w-full p-2 flex gap-2">
            <TbAirConditioning size={24} />
            {room?.airConditionerCleanDate ? (
              <span className="italic text-sm">
                ({getFormattedAgoText(room?.airConditionerCleanDate || "")})
              </span>
            ) : (
              "N/A"
            )}
          </div>

          {/* Confirmation Modal */}
        </div>
      ))}
    </div>
  );
};

export default RoomGridView;
