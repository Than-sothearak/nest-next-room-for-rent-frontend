import { getRoom } from '@/actions/rooms';
import { getUsers } from '@/actions/users'
import BookingForm from '@/components/BookingForm'
import React from 'react'

const addBookingPage = async () => {
    const {users} = await getUsers();
    const { rooms } = await getRoom()
  return (
    <div>
        <BookingForm 
        users={JSON.parse(JSON.stringify(users))}
        rooms={JSON.parse(JSON.stringify(rooms))}
        
        />
    </div>
  )
}

export default addBookingPage;