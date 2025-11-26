"use client";
import React, { useState } from "react";
import { SidebarList } from "./SidebarList";
import Logout from "./Logout";
import { IoClose } from "react-icons/io5";
import { HiMenuAlt2 } from "react-icons/hi";
import ChooseSingleImageFile from "./ChooseSingleImage";
import { IoMdClose, IoMdMenu } from "react-icons/io";
import Link from "next/link";
import Image from "next/image";


import ConnectTelegram from "./ButtonConnectTelegram";
import { SidebarListMobile } from "./SidebarListMobile";

const SideBarMain = ({ handleClick, isOpen, session, currentUser, navigation,servicesCount,link }) => {
  const [isClicked, setIsClicked] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapse = () => {
    setIsCollapsed((prev) => !prev);
    setIsProfileOpen(false); // hide profile on collapse
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

        {/* Profile (only when expanded) */}
        {!isCollapsed && (
          <button
            onClick={() => setIsProfileOpen((prev) => !prev)}
            className="flex items-center gap-2"
          >
            <Image
              width={44}
              height={44}
              alt="user"
              className="h-11 w-11 rounded-full object-cover"
              src={
                currentUser?.imageUrl ||
                "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
              }
            />
            <div>
              <h1 className="text-sm font-bold">{currentUser?.username}</h1>
              <p className="text-xs">
                {session?.user?.isAdmin ? "Admin" : "User"}
              </p>
            </div>
          </button>
        )}

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

      {/* Profile Dropdown */}
      {!isCollapsed && isProfileOpen && (
        <div className="relative mt-2">
          <div className="bg-slate-100 shadow-lg border border-slate-300 rounded-lg p-4 absolute top-1 left-0 w-full max-w-xs z-50">
            <button
              onClick={() => setIsProfileOpen(false)}
              className="absolute top-2 right-2 p-1 hover:bg-secondary rounded-full"
            >
              <IoMdClose size={20} />
            </button>

            <div className="flex flex-col items-center gap-2 pt-4">
              <p>{session?.user?.email}</p>

              <ChooseSingleImageFile
                imageUrl={
                  currentUser?.imageUrl ||
                  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                }
              />

              <p className="text-2xl">Hi, {currentUser?.username}!</p>

              <Link
                href={`${session?.user?.isAdmin ? '/dashboard/users/' : '/dashboard/client-page/'}${session?.user?._id}`}
                className="bg-slate-200 hover:bg-slate-300  w-full text-center flex gap-2 justify-center items-center border border-slate-300 p-4 rounded-xl cursor-pointer"
              >
                <p>Edit your account information</p>
              </Link>

              <ConnectTelegram userId={currentUser._id} user={currentUser} />

              <Logout />
            </div>
          </div>
        </div>
      )}

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
