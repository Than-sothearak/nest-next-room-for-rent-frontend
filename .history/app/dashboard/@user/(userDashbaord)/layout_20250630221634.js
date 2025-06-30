import React from 'react'

const UserLayoutPage = async ({children, userDashboard}) => {
  return (
   <>
    <div>{children}</div>
    <div>{userDashboard}</div>
   </>
  )
}

export default UserLayoutPage