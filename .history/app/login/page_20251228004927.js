import LoginForm from '@/components/LoginForm'
import { useSession } from 'next-auth/react'
import React from 'react'

const LoginPage = () => {
   const { data: session } = useSession()

   console.log("Current session data:", session)
  return (
    <div>
      <LoginForm />
    </div>
  )
}

export default LoginPage