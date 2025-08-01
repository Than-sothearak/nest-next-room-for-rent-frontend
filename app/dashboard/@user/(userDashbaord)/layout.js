import CreatePaymentLinkForm from '@/components/CreatePaymentLinkForm'
import React from 'react'

const UserLayoutPage = async ({children, userDashboard, requestingServices, lastPayment}) => {
  return (
   <>
    
    <div>{requestingServices}</div>
    <div>{children}</div>
    <div>{userDashboard}</div>
    <div>{lastPayment}</div>
 
   </>
  )
}

export default UserLayoutPage