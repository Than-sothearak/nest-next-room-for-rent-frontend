import { auth } from "@/auth";
import { Navbar } from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { User } from "@/models/User";
import { mongoDb } from "@/utils/connectDB";
import { pageNavigation, userNavigation } from "@/lib/navLinks";
import Footer from "@/components/Footer";

export default async function DashboardLayout({
  children,
  admin,
  user,
}) {
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
          <div className="bg-primary">
            <Sidebar navigation={pageNavigation} session={session} />
          </div>
          <div className="w-full overflow-x-auto lg:mx-4">
            <Navbar
              navigation={pageNavigation}
              session={session}
              user={JSON.parse(JSON.stringify(userId))}
            />
            <div className="max-lg:mx-4 overflow-x-auto">{children}</div>

            <div className="max-lg:mx-4 overflow-x-auto">{admin}</div>
              <Footer />
          </div>
        </div>
      ) : (
        <div className="flex">
          <div className="bg-primary">
            <Sidebar navigation={userNavigation} session={session} />
          </div>
          <div className="w-full overflow-x-auto lg:mx-4 relative">
            <Navbar
              navigation={userNavigation}
              session={session}
              user={JSON.parse(JSON.stringify(userId))}
            />
            <div className="max-lg:mx-4 overflow-x-auto">{children} </div>
            <div className="max-lg:mx-4 overflow-x-auto">{user}</div>
             <Footer />
          </div>
        </div>
      )}
    </>
  );
}
