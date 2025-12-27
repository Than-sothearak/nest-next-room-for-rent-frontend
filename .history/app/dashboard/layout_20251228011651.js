import { Navbar } from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { pageNavigation, userNavigation } from "@/lib/navLinks";
import Footer from "@/components/Footer";
import { cookies } from "next/headers";

export default async function DashboardLayout({ children, admin, user }) {
//  const cookie = cookies();
//  const token = cookie.get("access_token")
//   const session = null; //await getSession();
//  if (token === null) {
//    return <div>Please log in to access the dashboard.</div>;
//  }

  return (
    <>
      {/* {session?.user?.isAdmin ? (
        <div className="flex">
          <div className="bg-primary">
            <Sidebar
              navigation={pageNavigation}
              session={session}
              servicesCount={services.length}
              link={"/dashboard/users/"}
            />
          </div>
          <div className="flex flex-col justify-between w-full lg:mx-4 lg:overflow-x-auto h-screen ">
            <div className="">
              <Navbar
                link={"/dashboard/users/"}
                servicesCount={services.length}
                navigation={pageNavigation}
                session={session}
                user={JSON.parse(JSON.stringify(userId))}
              />
                <div className="max-lg:mx-2 overflow-x-auto">{children}</div>
                <div className="max-lg:mx-2 overflow-x-auto my-4">{admin}</div>
             
            </div>
            <Footer />
          </div>
        </div>
      ) : (
        <div className="flex">
          <div className="bg-primary">
            <Sidebar
              navigation={userNavigation}
              session={session}
              link={"/dashboard/client-page/"}
            />
          </div>
          <div className="flex flex-col justify-between w-full lg:mx-4 lg:overflow-x-auto h-screen">
            <div>
              <Navbar
                link={"/dashboard/client-page/"}
                servicesCount={services.length}
                navigation={userNavigation}
                session={session}
                user={JSON.parse(JSON.stringify(userId))}
              />
              <div className="max-lg:mx-2 overflow-x-auto">{children}</div>

              <div className="max-lg:mx-2 overflow-x-auto my-4">{user}</div>
            </div>
            <Footer />
          </div>
        </div>
      )} */}

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
