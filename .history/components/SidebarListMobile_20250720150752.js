"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation';

export const SidebarListMobile = ({navList}) => {
    const pathName = usePathname();
  return (
    <div className="z-10 mt-4">
    <ul className="flex flex-col gap-1 mt-2 cursor-pointer">
      {navList.links.map((item) => (
        <Link
        title={item.name}
          href={item.path}
          key={item.path}
          className={` flex gap-2 justify-center items-center hover:bg-secondary ${
            pathName === item.path ? "bg-blue-500 hover:bg-blue-400 text-secondarytext" : "bg-balck "
          } rounded-xl px-4 py-4 w-max`}
        >
          <div>{item.icon}</div>
      
        </Link>
      ))}
    </ul>
  </div>
  )
}
