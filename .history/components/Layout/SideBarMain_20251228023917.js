"use client";
import React, { useState } from "react";
import { SidebarList } from "./SidebarList";
import { IoClose } from "react-icons/io5";
import { HiMenuAlt2 } from "react-icons/hi";
import { SidebarListMobile } from "./SidebarListMobile";

const SideBarMain = ({ handleClick, isOpen, currentUser, navigation, servicesCount, link }) => {
  const [isClicked, setIsClicked] = useState(false);
 
  const [isCollapsed, setIsCollapsed] = useState(false);

  const session = currentUser ? { user: currentUser } : null;
  const toggleCollapse = () => {
    setIsCollapsed((prev) => !prev);

  };


  return (
    <div
      className={`bg-primary text-primarytext ${isCollapsed ? 'p-0' : 'p-2'} h-full overflow-y-auto transition-all duration-300 ease-in-out
        max-lg:fixed top-0 left-0 z-50
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        ${isCollapsed ? "w-14 justify-start flex-col items-center flex " : "w-80  "} 
        lg:translate-x-0  `}
    >
      {/* Top Section */}
      <div className="flex items-center justify-between pb-2 mt-2 border-b">

        {!isCollapsed && (<div className="font-bold whitespace-nowrap">Admin Dashboard</div>)

        }

        {/* Toggle Menu Button */}
        <button
          onClick={toggleCollapse}
          className="p-2 hover:bg-secondary rounded-full max-lg:hidden"
        >
          <HiMenuAlt2 size={22} />
        </button>

        {/* Close Button for mobile */}
        {!isCollapsed && (
          <button onClick={handleClick} className="lg:hidden">
            <IoClose size={28} />
          </button>
        )}
      </div>


      {isCollapsed && (
        <div className="z-50">
          <SidebarListMobile navList={navigation} />
        </div>
      )}

      {/* Navigation Menu */}

      <div className={`mt-4 ${isCollapsed ? 'hidden' : 'w-full'}`}>
        <SidebarList
          servicesCount={servicesCount}
          navList={navigation}
          handleClick={handleClick}
          isCollapsed={isCollapsed}
        />
      </div>

    </div>
  );
};

export default SideBarMain;
