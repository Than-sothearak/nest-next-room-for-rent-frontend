"use client";
import React from "react";
import { useActionState } from "react";
import { useSearchParams } from "next/navigation";
import { authenticate } from "@/lib/actions";
import Link from "next/link";

export default function LoginForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined
  );

  return (
    <div className="flex flex-col p-4 gap-8 h-full w-full justify-center items-center max-md:bg-primary">
      
      <div className="bg-primary w-full m-2 sm:max-w-md max-sm:p-4 space-y-6 rounded-xl p-8 lg:shadow-lg">

        <div className="lg:text-center flex flex-col gap-10">
          <h1 className="text-2xl font-bold">Login Page</h1>
          <p>Please login to continous</p>
        </div>
        <form action={formAction} className="space-y-6">
          <div className="space-y-4">
            <div className="flex flex-col">
              <label className="font-bold">Email</label>
              <input
                onKeyDown={(e) => e.key === " " && e.preventDefault()}
                type="email"
                name="email"
                placeholder="Enter your email provided by admin"
                className="w-full p-4 rounded-md bg-secondary border-none border-white text-md focus:ring-0 focus:outline-none"
                required
              />
            </div>

            <div className="flex flex-col">
              <label className="font-bold">Password</label>
              <input
                onKeyDown={(e) => e.key === " " && e.preventDefault()}
                type="password"
                name="password"
                placeholder="Enter your password"
                className="w-full p-4 rounded-md bg-secondary border-none border-white text-md focus:ring-0 focus:outline-none"
                required
                minLength={6}
              />
            </div>
          </div>
          <button
            value={callbackUrl}
            type="submit"
            disabled={isPending}
            className={`w-full rounded-lg bg-blue-600 p-3 text-primary font-semibold hover:bg-blue-700 transition ${isPending ? "opacity-50 cursor-not-allowed" : ""
              }`}
          >
            {isPending ? "Loading..." : "Login"}
          </button>

          {errorMessage && (
            <>
              <p className="text-center text-sm text-red-500">{errorMessage}</p>
            </>
          )}
          <Link
            href="/"
            className="flex items-center text-center text-sm text-blue-600 hover:underline"
          >
            <svg
              className="w-6 h-6 text-blue-600"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                d="M19 12H5M11 18l-6-6 6-6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p>Back to Home</p>
          </Link>
        </form>
        {/* <div>
        <div className="flex items-center gap-2 text-sm text-primarytext">
          <hr className="w-full border-gray-300" />
          or
          <hr className="w-full border-gray-300" />
        </div>

        <button className="w-full flex items-center justify-center gap-2 rounded-lg border border-gray-300 p-3  hover:bg-secondary transition">
          <svg className="h-5 w-5" viewBox="0 0 48 48">
            <path fill="#4285F4" d="M24 20v8h11.6c-.6 2.7-3 8-11.6 8-7 0-12.6-5.6-12.6-12.6S17 11 24 11c4 0 6.5 1.5 8.1 2.8L35 10C32.6 8.2 28.5 6 24 6 13 6 6 13 6 24s7 18 18 18c9.8 0 17-6.9 17-17 0-1.1-.1-1.9-.3-2.8H24z"></path>
          </svg>
          <p>Login with Google</p>
        </button>

        <p className="text-center text-sm ">
          Don't have an account?
          <a href="#" className="text-blue-600 hover:underline">
            Sign up
          </a>
        </p>
      </div> */}
      </div>
    </div>
  );
}
