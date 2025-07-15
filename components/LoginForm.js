'use client';

import { useSearchParams } from 'next/navigation';
import { useActionState } from 'react';
import { authenticate } from '@/lib/actions';
import Link from 'next/link';

export default function LoginForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined
  );

  return (
    <div className="flex flex-col p-4 gap-8 h-screen w-full justify-center items-center max-md:bg-primary">
      <div className="bg-primary w-full m-2 sm:max-w-md max-sm:p-4 space-y-6 rounded-xl p-8 lg:shadow-lg">
        <div className="lg:text-center flex flex-col gap-10">
          <h1 className="text-2xl font-bold">Login Page</h1>
          <p>Please login to continue</p>
        </div>
        <form action={formAction} className="space-y-6">
          <div className="space-y-4">
            <div className="flex flex-col">
              <label className="font-bold">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="w-full p-4 rounded-md bg-secondary text-md"
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="font-bold">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                className="w-full p-4 rounded-md bg-secondary text-md"
                required
              />
            </div>
          </div>
          <button
            value={callbackUrl}
            type="submit"
            disabled={isPending}
            className={`w-full rounded-lg bg-blue-600 p-3 text-primary font-semibold hover:bg-blue-700 transition ${isPending ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isPending ? 'Loading...' : 'Login'}
          </button>

          {errorMessage && (
            <p className="text-center text-sm text-red-500">{errorMessage}</p>
          )}

          <Link
            href="/"
            className="flex items-center text-sm text-blue-600 hover:underline"
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
      </div>
    </div>
  );
}
