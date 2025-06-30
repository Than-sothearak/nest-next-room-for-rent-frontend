import React from 'react'

const UserLayoutPage = async ({children, userDashboard, requestingServices}) => {
  return (
   <>
    <div>{children}dsds</div>
    <div>{userDashboard}</div>
    <div>@requestingServices</div>
   </>
  )
}

export default UserLayoutPage