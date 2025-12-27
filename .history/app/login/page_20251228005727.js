import LoginForm from '@/components/LoginForm'
import { getServerSession } from 'next-auth'
import React from 'react'
import { authOptions } from '../api/auth/[...nextauth]/route'
import { signOut } from 'next-auth/react'
import SignOutButton from '@/components/SignOutButton'

const  LoginPage = async () => {
  const session = await getServerSession(authOptions)

  if (session) {
    return (
      <>
        Signed in as {session.user.email} <br />
        <SignOutButton />
      </>
    )
  }
  return (
    <div>
      <LoginForm />
    </div>
  )
}

export default LoginPage