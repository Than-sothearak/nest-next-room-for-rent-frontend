import { getRoom } from '@/actions/rooms';
import { getUsers } from '@/actions/users'
import BookingForm from '@/components/BookingForm'
import { Invoice } from '@/models/Invoice';
import { mongoDb } from '@/utils/connectDB';
import React from 'react'

const addBookingPage = async () => {
    await mongoDb()
    const {users} = await getUsers();
    const { rooms } = await getRoom()
            const invoices = await Invoice.findOne()
   
  console.log(invoices.number)
  return (
    <div>
        <BookingForm 
        invoices={invoices.number}
        users={JSON.parse(JSON.stringify(users))}
        rooms={JSON.parse(JSON.stringify(rooms))}
        
        />
    </div>
  )
}

export default addBookingPage;