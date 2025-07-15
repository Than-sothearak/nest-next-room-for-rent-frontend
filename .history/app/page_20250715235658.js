import { auth } from "@/auth";
import Logout from "@/components/Logout";
import Link from "next/link";

export default async function Home() {
  const session = await auth();

  if (!session) {
    // Not logged in: show login button
    return (


      <div className="w-full min-h-screen bg-white flex items-center justify-center px-6">
        <div
          className={`w-full text-center transition-all duration-700 ease-out transform `}
        >

          <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to MyApp</h1>
          <p className="text-gray-500 text-lg mb-8">
            Your smart way to manage everything.
          </p>

          <Link
            href="/login"
            className="bg-blue-600 text-white w-full px-8 py-3 rounded-full text-lg font-semibold shadow-lg hover:bg-blue-700 active:scale-95 transition transform duration-300"
          >
           <p className="w-full">Get Started</p>
          </Link>
        </div>
      </div>
    );
  }

  if (session?.user?.isAdmin) {
    // Admin: show dashboard link
    return (
      <div className="flex flex-col bg-tertiary text-primary items-center justify-center h-screen gap-11">
        <h1 className="text-4xl font-extrabold text-primary leading-tight tracking-tight">
          Welcome, Admin!
        </h1>
        <p>This is room for rent system</p>
        <Link
          href="/dashboard"
          className="mt-10 px-6 py-3 bg-primary text-tertiary rounded-lg hover:bg-secondary transition-colors"
        >
          Go to Dashboard
        </Link>
        <div className="text-black">
          <Logout />
        </div>
      </div>
    );
  }

  // Logged in as user (not admin): show logout button only
  return (
    <div className="flex flex-col bg-tertiary text-primary items-center justify-center h-screen gap-11">
      <div className="flex items-center gap-3 group cursor-pointer transition-all duration-300 hover:scale-105">
        {/* Icon */}
        <div className="bg-gradient-to-tr from-blue-600 to-blue-400 text-white p-3 rounded-xl shadow-md">
          <svg
            className="w-11 h-11"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0h4"
            />
          </svg>
        </div>
        {/* Text */}
        <div>
          <h1 className="text-4xl font-extrabold text-primary leading-tight tracking-tight">
            ManageRoom
          </h1>
          <p className="text-sm text-gray-500 tracking-wide">
            All-in-One Management System
          </p>
        </div>
      </div>
      <div>
        <h1 className="text-4xl text-center font-extrabold text-primary leading-tight tracking-tight">
          Welcome, {session?.user?.username || "No login"}!
        </h1>
      </div>
      <Link
        href="/dashboard"
        className="mt-10 px-6 py-3 bg-primary text-tertiary rounded-lg hover:bg-secondary transition-colors"
      >
        Go to Dashboard
      </Link>
      <div className="text-black">
        <Logout />
      </div>
    </div>
  );
}