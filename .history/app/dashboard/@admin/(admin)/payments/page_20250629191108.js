import { getPayments } from '@/actions/payments';
import { auth } from '@/auth';
import Pagination from '@/components/Pagination';
import SearchCompoenent from '@/components/SearchComponent';
import ServiceList from '@/components/ServiceList';
import Link from 'next/link';
import React from 'react'

const ServicePage = async ({searchParams}) => {
   const session = await auth();

   if (!session || !session.user?.isAdmin) {
    return (
      <div className='p-4 bg-primary mt-4 rounded-lg'>
        <h1 className='text-2xl font-bold'>Access Denied</h1>
        <p className='text-lg'>You do not have permission to view this page.</p>
      </div>
    );
  } 
   const { query } = await searchParams;
 
    const { page } = (await searchParams) || 1;
    const {sortKey} = (await searchParams) || "requesting";
    const {sortDate} = (await searchParams) || "date";
    const {sortDirection }= await searchParams || "descending";
    const { payments, count, ITEM_PER_PAGE, paymentCount } = await getPayments(
      query,
      page,
      sortKey,
      sortDate,
      sortDirection,
    );

    const countPage = Math.ceil(parseFloat(count / ITEM_PER_PAGE)) || 1;

  return (
    <div className='p-4 bg-primary mt-4 rounded-lg'>
         <div className="flex justify-between items-center gap-4">
        <div>
          <SearchCompoenent
            placeHolder="Search for product..."
            linkPage="/dashboard/services"
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
      
      services={JSON.parse(JSON.stringify(payments))}
        currentPage={page ||1}
        itemPerPage={ITEM_PER_PAGE}
        sortKey={sortKey}
        sortDirection={sortDirection}   
        serviceCount={paymentCount}
      />

           <Pagination 
            totalPages={countPage} 
            pathname={'/services'}
            itemPerPage={ITEM_PER_PAGE}
            currentPage={page} query={query} />
     
     
    </div>
  )
}

export default ServicePage