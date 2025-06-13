import { getRoom } from '@/actions/rooms';
import { getUsers } from '@/actions/users'
import React from 'react'

const bookPage = async () => {
    const {users} = await getUsers();
    const { rooms } = await getRoom()
  return (
    <div>
       
    </div>
  )
}

export default bookPage