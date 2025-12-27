import { Navbar } from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { pageNavigation, userNavigation } from "@/lib/navLinks";
import Footer from "@/components/Footer";
import { cookies } from "next/headers";

export default async function DashboardLayout({ children, admin, user }) {

  return (
    <>
        <div className="flex">
          <div className="bg-primary">
            <Sidebar
              navigation={pageNavigation}

              // servicesCount={services.length}
              link={"/dashboard/users/"}
            />
          </div>
          <div className="flex flex-col justify-between w-full lg:mx-4 lg:overflow-x-auto h-screen ">
            <div className="">
              <Navbar
                link={"/dashboard/users/"}
                // servicesCount={services.length}
                navigation={pageNavigation}
              
                // user={JSON.parse(JSON.stringify(userId))}
              />
                <div className="max-lg:mx-2 overflow-x-auto">{children}</div>
                {/* <div className="max-lg:mx-2 overflow-x-auto my-4">{admin}</div> */}
             
            </div>
            <Footer />
          </div>
        </div>
    </>
  );
}
