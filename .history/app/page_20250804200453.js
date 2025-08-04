import { auth } from "@/auth";
import { User } from "@/models/User";
import { mongoDb } from "@/utils/connectDB";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const session = await auth();
  await mongoDb();
  const user = await User.find()
  // Not logged in: show login button
  return (
    <div className="w-full min-h-screen bg-white flex items-center justify-center px-6 ">
      <div
        className={`w-full lg:w-96 gap-4 text-center transition-all duration-700 ease-out transform flex flex-col max-md:min-h-screen max-md:justify-around `}
      >
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Welcome to Manegement System
        </h1>
        <div className="w-full flex justify-center">
          <Image
            src="/images/logo system.png" // Use `src`, not `href`
            alt="Logo"
            width={200}
            height={100}
            priority // (Optional) preload on page load
          />
        </div>{" "}
        <div className="flex gap-4 flex-col">
          <h2 className="text-blue-500 font-bold text-2xl">Make a booking</h2>
          <p className="text-gray-500 text-sm mb-8">
            A powerful tool to simplify how you handle bookings and manage your
            space. Focus on what matters, we’ll handle the rest.
          </p>
        </div>
        <Link
          href="/login"
          className="bg-blue-600 text-white w-full px-8 py-3 rounded-xl text-lg font-semibold shadow-lg hover:bg-blue-700 active:scale-95 transition transform duration-300"
        >
          {user[0]?.username}
          Get Started
        </Link>
      </div>
    </div>
  );
}
