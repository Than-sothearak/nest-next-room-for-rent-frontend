import CreatePaymentLinkForm from '@/components/CreatePaymentLinkForm'
import React from 'react'

const UserLayoutPage = async ({children, userDashboard, requestingServices}) => {
  return (
   <>
    <CreatePaymentLinkForm />
      <div>{requestingServices}</div>
    <div>{children}</div>
    <div>{userDashboard}</div>
 
   </>
  )
}

export default UserLayoutPage