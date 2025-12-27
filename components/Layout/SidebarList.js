'use client';
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BiBell } from "react-icons/bi";

export const SidebarList = ({ navList, handleClick, servicesCount }) => {
  const pathName = usePathname();
  if (!navList) return null;

  // Keep only the first 1-2 segments for tracking main section
  const currentBasePath = pathName.split("/").filter(Boolean).slice(0, 2).join("/");

  return (
    <div className="mt-8 font-bold">
      {navList.name}
      <ul className="h-full flex flex-col gap-1 mt-2 cursor-pointer">
        {navList.links.map((item) => {
          // Normalize the item path to first 1-2 segments
          const itemBasePath = item.path.split("/").filter(Boolean).slice(0, 2).join("/");

          const isActive = currentBasePath === itemBasePath;

          return (
            <Link
              onClick={handleClick}
              title={item.name}
              href={item.path}
              key={item.path}
              className={`hover:bg-blue-100 flex gap-2 justify-between items-center ${
                isActive
                  ? "bg-blue-500 text-secondary hover:bg-blue-700 hover:text-secondarytext"
                  : "bg-transparent"
              } rounded-xl px-4 py-4`}
            >
              <div className="flex gap-2 justify-start items-center">
                <div>{item.icon}</div>
                <h2 className="font-normal">{item.name}</h2>
              </div>
              {item.name === "Services" && (
                <div className="relative text-center justify-center items-center flex">
                  <BiBell size={24} />
                  <p
                    className={`${
                      servicesCount <= 0 ? "" : "bg-red-500"
                    } rounded-full absolute -top-3 w-5 h-5 text-primary -right-2`}
                  >
                    {servicesCount <= 0 ? "" : servicesCount}
                  </p>
                </div>
              )}
            </Link>
          );
        })}
      </ul>
    </div>
  );
};
