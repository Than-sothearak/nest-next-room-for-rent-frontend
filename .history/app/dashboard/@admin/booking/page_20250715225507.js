import { getBooking } from '@/actions/Booking';
import { auth } from '@/auth';
import BookingTable from '@/components/BookingTable';
import SearchCompoenent from '@/components/SearchComponent';
import Link from 'next/link';
import React from 'react'

const bookPage = async ({searchParams}) => {
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

  return (
    <div className='p-4 bg-primary mt-4 rounded-lg max-sm:p-2'>
         <div className="flex justify-between items-center gap-4">
        <div>
          <SearchCompoenent
            placeHolder="Search for booking..."
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
      <BookingTable
      session={session}
        booking={JSON.parse(JSON.stringify(booking))}
        currentPage={page ||1}
        itemPerPage={ITEM_PER_PAGE}
        sortKey={sortKey}
        sortDirection={sortDirection}
        pathname={"booking"}
        totalPages={countPage}
        query={query}
      />
      {/* <PDFPreview  data={JSON.parse(JSON.stringify(booking))}/> */}
     
    </div>
  )
}

export default bookPage