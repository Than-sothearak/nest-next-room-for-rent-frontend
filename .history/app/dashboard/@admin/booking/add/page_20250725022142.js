import { getRoom } from '@/actions/rooms';
import { getUsers } from '@/actions/users'
import BookingForm from '@/components/BookingForm'
import { mongoDb } from '@/utils/connectDB';
import React from 'react'

const addBookingPage = async () => {
    await mongoDb()
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