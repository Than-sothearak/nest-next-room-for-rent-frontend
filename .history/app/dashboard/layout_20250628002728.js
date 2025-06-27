import { auth } from "@/auth";
import { Navbar } from "@/components/dashboard/navbar/navbar";
import Sidebar from "@/components/dashboard/sidebar/sidebar";
import { User } from "@/models/User";
import { mongoDb } from "@/utils/connectDB";
import { pageNavigation, userNavigation } from "@/lib/navLinks";

export default async function DashboardLayout({ children, admin, user }) {
  await mongoDb();
  const session = await auth();
  const userId = await User.findOne({ _id: session?.user?._id });

  if (!session || !userId) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-2xl font-bold">Unauthorized</h1>
      </div>
    );
  }

  return (
    <>
      {session?.user?.isAdmin ? (
        <div className="flex">
          <div className="bg-primary h-screen">
            <Sidebar
            navigation={pageNavigation}
              session={session}
           
            />
          </div>
          <div className="w-full overflow-x-auto lg:mx-4">
            <Navbar 
             navigation={pageNavigation}
            session={session} user={JSON.parse(JSON.stringify(userId))} />
            <div className="max-lg:mx-4 overflow-x-auto">{children}</div>
            <div>{admin}</div>
          </div>
        </div>
      ) : (
        <div className="flex">
          <div className="bg-primary h-screen">
             <Sidebar
             navigation={userNavigation}
              session={session}
           
            />
          </div>
          <div className="w-full overflow-x-auto lg:mx-4">
            <Navbar 
             navigation={userNavigation}
            session={session} user={JSON.parse(JSON.stringify(userId))} />
            <div className="max-lg:mx-4 overflow-x-auto">{children} </div>
            <div>{user}</div>
          </div>
        </div>
      )}
    </>
  );
}
