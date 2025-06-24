import { getBooking } from '@/actions/Booking';
import { getRoom } from '@/actions/rooms';
import { getUsers } from '@/actions/users'
import { auth } from '@/auth';
import BookingList from '@/components/BookingList';
import SearchCompoenent from '@/components/SearchComponent';
import ServiceList from '@/components/ServiceList';
import Link from 'next/link';
import React from 'react'

const servicePage = async ({searchParams}) => {
   const session = await auth();
   const { query } = await searchParams;
    const { page } = (await searchParams) || 1;
    const {sortKey} = (await searchParams) || "date";
    const {sortDirection }= await searchParams || "descending";
    const { booking, count } = await getBooking(
      query,
      page,
    );
    const ITEM_PER_PAGE = 20;
    const countPage = Math.ceil(parseFloat(count / ITEM_PER_PAGE)) || 1;
    const {users} = await getUsers();
    const { rooms } = await getRoom()

  return (
    <div className='p-4 bg-primary mt-4 rounded-lg'>
         <div className="flex justify-between items-center gap-4">
        <div>
          <SearchCompoenent
            placeHolder="Search for product..."
            linkPage="/dashboard/booking"
          />
        </div>
        <Link
          href="/dashboard/booking/add"
          className="bg-blue-500 text-secondarytext px-2 py-1 text-center rounded-md hover:bg-blue-900 text-sm"
        >
          Add new
        </Link>
      </div>
      <ServiceList
      />
     
    </div>
  )
}

export default servicePage