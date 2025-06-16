import { auth } from "@/auth";
import { Navbar } from "@/components/dashboard/navbar/navbar";
import Sidebar from "@/components/dashboard/sidebar/sidebar";
import { User } from "@/models/User";
import { mongoDb } from "@/utils/connectDB";
import { pageNavigation, userNavigation } from "@/lib/navLinks";

export default async function DashboardLayout({ children }) {
  await mongoDb();
  const session = await auth();
  const user = await User.findOne({ _id: session?.user?._id });

  if (!session || !user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-2xl font-bold">Unauthorized</h1>
      </div>
    );
  }
console.log(session)
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
            session={session} user={JSON.parse(JSON.stringify(user))} />
            <div className="max-lg:mx-4 overflow-x-auto">{children}</div>
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
            session={session} user={JSON.parse(JSON.stringify(user))} />
            <div className="max-lg:mx-4 overflow-x-auto">{children}</div>
          </div>
        </div>
      )}
    </>
  );
}
