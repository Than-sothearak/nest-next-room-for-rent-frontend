'use client';

import Image from 'next/image';

export default function LastTransactionComponent({data}) {
 

  const statusColors = {
    Completed: "bg-green-100 text-green-700",
    Pending: "bg-yellow-100 text-yellow-700",
    Failed: "bg-red-100 text-red-700",
    Refunded: "bg-blue-100 text-blue-700",
  };

  return (
    <div className="mt-4 rounded-lg bg-primary p-4 w-full">
      <h1 className="text-2xl">Last Transactions</h1>
      <div className='w-full overflow-x-auto'>
        <table className="rounded-lg w-full">
          <thead className="text-sm">
            <tr>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Date</th>
              <th className="p-4 text-right">Amount</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {data.map((transaction, index) => (
              <tr key={index} className="transition-all">
                <td className="pr-10 flex gap-2 items-center whitespace-nowrap">
                  <Image
                    width={36}
                    height={36}
              
                    className="object-cover w-9 h-9 rounded-full"
                    src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=1160&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Profile"
                  />
                  {transaction.name}
                </td>
                <td className="px-4 whitespace-nowrap">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      statusColors[transaction.status] || "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {transaction.status}
                  </span>
                </td>
                <td className="p-3">{transaction.date}</td>
                <td className="p-3 font-semibold text-right">${transaction.amount ?? '0.00'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
