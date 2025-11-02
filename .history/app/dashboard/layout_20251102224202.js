import { auth } from "@/auth";
import { Navbar } from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { User } from "@/models/User";
import { pageNavigation, userNavigation } from "@/lib/navLinks";
import Footer from "@/components/Footer";
import { Service } from "@/models/Service";
import { mongoDb } from "@/utils/connectDB";

export default async function DashboardLayout({ children, admin, user }) {
  const session = await auth();
  await mongoDb();
  await new Promise((res) => setTimeout(res, 10000));
  const userId = await User.findOne({ _id: session?.user?._id });

  if (!session || !userId) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-2xl font-bold">Unauthorized</h1>
      </div>
    );
  }
  let services = [];
  if (session?.user?.isAdmin) {
    services = await Service.find({ status: "pending" });
  }

  return (
    <>
      {session?.user?.isAdmin ? (
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
                <div className="max-lg:mac object-right"> {children}</div>
             
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
                navigation={pageNavigation}
                session={session}
                user={JSON.parse(JSON.stringify(userId))}
              />
              <div className="max-lg:mx-2 overflow-x-auto">{children}</div>

              <div className="max-lg:mx-2 overflow-x-auto my-4">{user}</div>
            </div>
            <Footer />
          </div>
        </div>
      )}
    </>
  );
}
