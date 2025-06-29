import { getPayments } from '@/actions/payments';
import { auth } from '@/auth';
import Pagination from '@/components/Pagination';
import SearchCompoenent from '@/components/SearchComponent';
import { formatDate } from '@/utils/formatDate';
import Link from 'next/link';
import React from 'react'
import { BiPrinter } from 'react-icons/bi';

const ServicePage = async ({ searchParams }) => {
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
  const { sortKey } = (await searchParams) || "requesting";
  const { sortDate } = (await searchParams) || "date";
  const { sortDirection } = await searchParams || "descending";
  const { payments, count, ITEM_PER_PAGE, } = await getPayments(
    query,
    page,
    sortKey,
    sortDate,
    sortDirection,
  );
  
  const getPayments = JSON.parse(JSON.stringify(payments))
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
  
      </div>

      <div className="mt-4 w-1/2 max-lg:w-full justify-start items-start p-4 bg-primary rounded-lg ">
        <h1 className="text-xl font-bold">Last payment</h1>
        {getPayments.map((payment) => (
          <div className="bg-slate-100 p-2 mt-2" key={payment._id}>
            <div className="flex items-center justify-between font-bold">
              <p>
                Recipts: {formatDate(payment.startDate)}-
                {formatDate(payment.dueDate)}{" "}
              </p>
              <div className="flex items-center gap-4">
                <p className="text-green-500">{payment.status}</p>
                <Link href={`invoice/${payment._id}`}>
                  <BiPrinter size={28} />
                </Link>
              </div>
            </div>
            <hr className="my-2"></hr>

            <div className="flex items-center justify-between">
              <p>Paid at</p>{" "}
              <p>{payment.paidAt}</p>
            </div>

            <div className="flex items-center justify-between">
              <p>Consumer</p> <p>{payment.userId.username}</p>
            </div>

            <div className="flex items-center justify-between">
              <p>Amount</p> <p>$ {payment.amount + (payment.properties?.reduce((sum, item) => {
                return sum + Number(item.price);
              }, 0) || 0)}</p>
            </div>
          </div>
        ))}
      </div>
      <Pagination
        totalPages={countPage}
        pathname={'/services'}
        itemPerPage={ITEM_PER_PAGE}
        currentPage={page} query={query} />


    </div>
  )
}

export default ServicePage