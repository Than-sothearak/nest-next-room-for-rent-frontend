import ClientService from '@/components/ClientServiceGrid'
import React from 'react'

const RequestingServices = () => {
  return (
      <ClientService 
      services={services}
      isClicked={isClicked} 
      setIsClicked={setIsClicked} 
      booking={booking} 
      user={user}/>
  )
}

export default RequestingServices