import { getRoom } from '@/actions/rooms';
import { getUsers } from '@/actions/users'
import SearchCompoenent from '@/components/SearchComponent';
import Link from 'next/link';
import React from 'react'

const bookPage = async () => {
    const {users} = await getUsers();
    const { rooms } = await getRoom()
  return (
    <div>
         <div className="flex justify-between items-center gap-4">
        <div>
          <SearchCompoenent
            placeHolder="Search for product..."
            linkPage="/dashboard/admin/rooms"
          />
        </div>
        <Link
          href="/dashboard/admin/booking/add"
          className="bg-blue-500 text-secondarytext px-2 py-1 text-center rounded-md hover:bg-blue-900 text-sm"
        >
          Add new
        </Link>
      </div>
    </div>
  )
}

export default bookPage