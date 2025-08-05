"use client";

import React, { useOptimistic, useState } from "react";
import { FaShower, FaStickyNote } from "react-icons/fa";
import {
  FaBed,
  FaBook,
  FaEye,
  FaKitchenSet,
  FaRegClock,
  FaRegSnowflake,
  FaRulerCombined,
  FaStairs,
  FaWifi,
} from "react-icons/fa6";

import {
  MdBalcony,
  MdOutlineSmokeFree,
  MdOutlineTableBar,
} from "react-icons/md";
import { TbDesk } from "react-icons/tb";
import { useRouter, useSearchParams } from "next/navigation";
import { BiCabinet } from "react-icons/bi";
import RoomGridView from "./RoomGridView";
import RoomListView from "./RoomListView";
import { set } from "date-fns";
import { IoGrid } from "react-icons/io5";
import { IoIosList } from "react-icons/io";

export const RoomGrid = ({ data, session, count,ITEM_PER_PAGE, currentPage }) => {
  const [view, setView] = useState("grid");

  // const handleView = () => {
  //   setView((prev) => (prev === "grid" ? "list" : "grid"));
  // };
  const iconMap = {
    Notes: FaStickyNote,
    "Air conditioner": FaRegSnowflake,
    "Free Wi-Fi": FaWifi,
    "Shower room": FaShower,
    Furniture: FaBed,
    "Kitchen/kitchenette": FaKitchenSet,
    "Mini-glass closet & kitchen shelves": BiCabinet,
    "Private balcony": MdBalcony,
    "Study tables": TbDesk,
    "Dining table & chair": MdOutlineTableBar,
    Notes: MdOutlineSmokeFree,
    "Room area": FaRulerCombined,
  };
  const searchParams = useSearchParams();
  const current = new URLSearchParams(searchParams.toString());
  const router = useRouter();
  const handleChangeSort = (e) => {
    current.set("sort", e.target.value);
    router.push(`?${current.toString()}`);
  };

  const [optimisticData, setOptimisticData] = useOptimistic(
    data,
    (currentData, id) => {
      return currentData.filter((data) => data._id !== id);
    }
  );

  return (
    <div className="my-4">
      <div className="w-full flex justify-between items-center my-4 gap-4">
        <h1 className="text-center text-2xl font-bold whitespace-nowrap">
          Room List    <span className="whitespace-nowrap font-normal text-sm">Total: {count}</span>
        </h1>
     
        <div className="flex items-center gap-4">
          <div className="flex gap-2">
            <h1>View</h1>
            <button 
            onClick={() => setView('grid')} className="hover:text-blue-500"><IoGrid /></button>
          
          <button 
          onClick={() => setView('list')}
          className="hover:text-blue-500"><IoIosList size={22}/></button>
          </div>
          <div className="flex items-center gap-2">
            <label
            htmlFor="sort"
            className="text-sm font-medium text-gray-700 whitespace-nowrap"
          >
            Sort by
          </label>
          <select
            onChange={handleChangeSort}
            id="sort"
            name="sort"
            className="flex gap-2 w-full px-3 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-700"
            defaultValue="date"
          >
            <option value="date-desc">Date: a → z</option>
            <option value="date-asc">Date: z → a</option>
            <option value="status-asc">Unavailable</option>
            <option value="status-desc">Available</option>
          </select>
          </div>
        </div>
      </div>
      {view === "grid" ? (
        <RoomGridView
          iconMap={iconMap}
          optimisticData={optimisticData}
          session={session}
          setOptimisticData={setOptimisticData}
        />
      ) : (
        <RoomListView
          currentPage={currentPage} // Assuming you want to show the first page
          itemPerPage={ITEM_PER_PAGE} // Assuming you want to show 10 items per page
          iconMap={iconMap}
          optimisticData={optimisticData}
          session={session}
          setOptimisticData={setOptimisticData}
        />
      )}
    </div>
  );
};
