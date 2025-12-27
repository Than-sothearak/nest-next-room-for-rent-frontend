import { MdMeetingRoom, MdOutlinePayment, MdSpaceDashboard } from "react-icons/md";
import { FaUserCircle, FaUsers } from "react-icons/fa";
import { BiBookBookmark, BiCategory,  BiSolidReport } from "react-icons/bi";
import { MdOutlineWorkHistory } from "react-icons/md";
import { IoSettings, IoSettingsSharp } from "react-icons/io5";
import { IoIosHelpCircle } from "react-icons/io";
import { FaBuromobelexperte} from "react-icons/fa6";
export const pageNavigation = {
  name: "Pages",
  links: [ {
    path: "/dashboard",
    name: "Dashboard",
    icon: <MdSpaceDashboard size={18} />,
  },
   {
    path: "/dashboard/rooms",
    name: "Rooms",
    icon: <MdMeetingRoom size={18} />, 
  },
  {
path: "/dashboard/booking",
    name: "Booking",
    icon: <BiBookBookmark size={18} />, 
  },

   {
    path: "/dashboard/services",
    name: "Services",
    icon: <IoSettings size={18} />,
  },

  
   {
    path: "/dashboard/payments",
    name: "Payments",
    icon: <MdOutlinePayment size={18} />,
  },
 
 
  {
    path: "/dashboard/categories",
    name: "Category",
    icon: <BiCategory size={18} />, 
  },
  {
    path: "/dashboard/users",
    name: "Users",
    icon: <FaUserCircle size={18} />,
  }, {
    path: "/dashboard/expense",
    name: "Expense",
    icon: <FaBuromobelexperte size={18} />,
  },
]

}

export const analyticNavigation = {
  name: "Analytics",
  links: [
    {
      path: "/reports",
      name: "Reports",
      icon: <BiSolidReport size={18} />,
    },
    {
      path: "/revenue",
      name: "Revenue",
      icon: <MdOutlineWorkHistory size={18} />, 
    },
    {
      path: "/dashboard/teams",
      name: "Teams",
      icon: <FaUsers size={18} />,
    },
  ]
}

export const userNavigation = {
  name: "Users",
  links: [
    {
    path: "/dashboard",
    name: "Dashboard",
    icon: <MdSpaceDashboard size={18} />,
  },
    {
      path: "/setting",
      name: "Setting",
      icon: <IoSettingsSharp size={18} />,
    },
    {
      path: "/help",
      name: "Help",
      icon: <IoIosHelpCircle size={18} />, 
    },

  ]
}
    
  ;
  
