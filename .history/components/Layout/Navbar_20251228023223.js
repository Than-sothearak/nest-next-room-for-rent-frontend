"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { IoMdMenu } from "react-icons/io";
import { useState } from "react";
import SideBarMain from "@/components/Layout/SideBarMain";
import ProfileUser from "./ProfileUser";


export const Navbar = ({ session, user, navigation, servicesCount, link }) => {
  const [isOpen, setIsOpen] = useState(false);

  function handleClick() {
    setIsOpen((prev) => !prev);
  }

  const pathName = usePathname();
  const pathArray = pathName.split("/").filter(Boolean);

  const currentPathname = pathName.split("/").pop();

  return (
    <div className="h-14 shadow-md bg-primary py-4 px-4 w-full max-sm:block flex justify-between items-center max-md:sticky top-0 z-30">
      <div className="flex justify-between w-full relative">
        <div className="max-sm:mb-2 flex gap-4 items-center w-full">
          <button
            className="lg:hidden"
            onClick={handleClick}
            aria-label="Open Sidebar"
            title="Open Sidebar"
          >
            <IoMdMenu size={28} />
          </button>


        <nav className="flex gap-1 items-center text-gray-700 text-sm capitalize overflow-hidden whitespace-nowrap">
  {pathArray.map((p, index) => {
    const linkPath = `/${pathArray.slice(0, index + 1).join("/")}`;
    const isLast = index === pathArray.length - 1;

    // Highlight the last breadcrumb if currentPathname starts with this path
    const isActive =
      currentPathname === linkPath || (!isLast && currentPathname.startsWith(linkPath + "/"));

    return (
      <div key={index} className="flex items-center gap-1">
        <Link
          href={linkPath}
          className={`${
            isActive
              ? "font-semibold text-gray-900"
              : "hover:text-blue-500 transition"
          }`}
        >
          {p}
        </Link>
        {!isLast && <span className="text-gray-400">{">"}</span>}
      </div>
    );
  })}
</nav>

        </div>
        <ProfileUser currentUser={user} />
      </div>

      <div className="lg:hidden">
        <SideBarMain
          link={link}
          servicesCount={servicesCount}
          navigation={navigation}
          currentUser={user}
          handleClick={handleClick}
          isOpen={isOpen}
          session={session}
        />
      </div>
      {/* Overlay (closes sidebar when clicked) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 lg:hidden z-20"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};
