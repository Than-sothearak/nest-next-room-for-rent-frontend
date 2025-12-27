'use client'
import { signOut } from 'next-auth/react'
import React from 'react'

const SignOutButton = () => {
  return (
    <button
      onClick={() => signOut({ callbackUrl: '/login' })}
      className="
        bg-red-500 
        hover:bg-red-600 
        text-white 
        px-6 
        py-2 
        rounded-lg 
        font-medium 
        shadow-md 
        transition 
        duration-200
        ease-in-out
        focus:outline-none
        focus:ring-2
        focus:ring-red-400
      "
    >
      Sign Out
    </button>
  )
}

export default SignOutButton
