import LoginForm from '@/components/LoginForm'
import { getServerSession } from 'next-auth'
import React from 'react'
import { authOptions } from '../api/auth/[...nextauth]/route'
import SignOutButton from '@/components/SignOutButton'

const LoginPage = async () => {
  const session = await getServerSession(authOptions)

  if (session) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 p-4">
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full text-center">
          <h1 className="text-2xl font-semibold mb-4">Welcome Back!</h1>
          <p className="text-gray-700 mb-2">Signed in as:</p>
          <p className="text-blue-600 font-medium mb-6">{session.user.email}</p>

          <div className="flex flex-col gap-4">
            <SignOutButton />
            <a
              href="/dashboard"
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium transition"
            >
              Go to Dashboard
            </a>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 p-4">
      <LoginForm />
    </div>
  )
}

export default LoginPage
