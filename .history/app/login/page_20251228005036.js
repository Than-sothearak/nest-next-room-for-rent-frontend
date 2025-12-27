import LoginForm from '@/components/LoginForm'
import { getServerSession } from 'next-auth'
import React from 'react'
import { authOptions } from '../api/auth/[...nextauth]/route'

const  LoginPage = async () => {
  const session = await getServerSession(authOptions)

   console.log("Current session data:", session)
  return (
    <div>
      <LoginForm />
    </div>
  )
}

export default LoginPage