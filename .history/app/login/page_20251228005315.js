"use client"
import LoginForm from '@/components/LoginForm'
import React from 'react'
import { signOut, useSession } from 'next-auth/react'

const  LoginPage = () => {
  const { data: session } = useSession()

  if (session) {
    return (
      <>
        Signed in as {session.user.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
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