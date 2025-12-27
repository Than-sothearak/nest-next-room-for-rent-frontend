import { pageNavigation, userNavigation } from "@/lib/navLinks";
import { Navbar } from "@/components/Layout/Navbar";
import Footer from "@/components/Layout/Footer";
import Sidebar from "@/components/Layout/Sidebar";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function DashboardLayout({ children, admin, user }) {
  const session = await getServerSession(authOptions);
  const data  = await fetch(`${process.env.BASE_URL}/users/${session.user.id}`, {
    headers: {
      Authorization: `Bearer ${session?.user?.accessToken}`,
    },
  });

  const currentUser = await data.json();

  return (
    <>
      <div className="flex">
        <div className="bg-primary">
          <Sidebar
            navigation={pageNavigation}

            link={"/dashboard/users/"}
          />
        </div>
        <div className="flex flex-col justify-between w-full lg:mx-4 lg:overflow-x-auto h-screen ">
          <div className="">
            <Navbar
              link={"/dashboard/users/"}
              navigation={pageNavigation}
               user={currentUser}

            />
            <div className="max-lg:mx-2 overflow-x-auto">{children}</div>
            <div className="max-lg:mx-2 overflow-x-auto my-4">{admin}</div>

          </div>
          <Footer />
        </div>
      </div>
    </>
  );
}
