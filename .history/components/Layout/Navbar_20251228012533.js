"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { IoMdMenu } from "react-icons/io";
import { useState } from "react";
import SideBarMain from "@/components/Layout/SideBarMain";


export const Navbar = ({ session, user, navigation, servicesCount, link}) => {
  const [isOpen, setIsOpen] = useState(false);

  function handleClick() {
    setIsOpen((prev) => !prev);
  }

  const pathName = usePathname();
  const pathArray = pathName.split("/").filter(Boolean);

  const currentPathname = pathName.split("/").pop();

  let name;

  return (
    <div className="h-14 shadow-md bg-primary py-4 px-4 w-full max-sm:block flex justify-between items-center max-md:sticky top-0 z-30">
      <div className="max-sm:mb-2 flex gap-4 items-center">
        <button
          className="lg:hidden"
          onClick={handleClick}
          aria-label="Open Sidebar"
          title="Open Sidebar"
        >
          <IoMdMenu size={28} />
        </button>

        <div className="capitalize text-sm text-primarytext flex gap-1 items-center  overflow-hidden whitespace-nowrap">
          {pathArray.map((p, index) => {
            const linkPath = `/${pathArray.slice(0, index + 1).join("/")}`;
            return (
              <Link
                href={linkPath}
                key={index}
                className={`flex gap-1 ${
                  p === currentPathname
                    ? "text-primarytext font-bold text-md"
                    : "hover:text-blue-500"
                }`}
              >
                {p}
                <span>{index !== pathArray.length - 1 ? ">" : ""}</span>
              </Link>
            );
          })}
        </div>
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
