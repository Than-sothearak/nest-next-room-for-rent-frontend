import { getPayments } from "@/actions/payments";
import { auth } from "@/auth";
import Pagination from "@/components/Pagination";
import SearchCompoenent from "@/components/SearchComponent";
import { formatDate, formatDateTime } from "@/utils/formatDate";
import Link from "next/link";
import {
  BiPrinter,
  BiSortAlt2,
  BiUpArrowAlt,
  BiDownArrowAlt,
} from "react-icons/bi";
import React from "react";

export default async function ServicePage({ searchParams }) {
  const session = await auth();
  if (!session || !session.user?.isAdmin) {
    return (
      <div className="p-4 bg-primary mt-4 rounded-lg">
        <h1 className="text-2xl font-bold">Access Denied</h1>
        <p className="text-lg">You do not have permission to view this page.</p>
      </div>
    );
  }
  const { query } = await searchParams;

  const { page } = await searchParams || 1;
  const { sortKey } = (await searchParams) || "requesting";
  const { sortDate } = (await searchParams) || "date";
  const { sortDirection } = (await searchParams) || "descending";

  const { payments, count, ITEM_PER_PAGE } = await getPayments(
    query,
    page || 1,
    sortKey,
    sortDate,
    sortDirection
  );
  const countPage = Math.ceil(parseFloat(count / ITEM_PER_PAGE));

  const nextDirection =
    sortDirection === "descending" ? "ascending" : "descending";
  const sortIcon =
    sortDirection === "ascending" ? (
      <BiUpArrowAlt size={16} />
    ) : (
      <BiDownArrowAlt size={16} />
    );

  return (
    <div className="p-4 bg-primary mt-4 rounded-lg">
      {/* TOP BAR */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <SearchCompoenent
          placeHolder="Search for username or phone number..."
          linkPage="/dashboard/payments"
        />
        {/* you can add “Create payment” button here later */}
      </div>

      {/* TABLE */}
      <div className="mt-4 overflow-x-auto">
        <h1 className="text-xl font-bold mb-2">Payments</h1>
        <table className="min-w-[800px] w-full table-auto border rounded-lg shadow">
          <thead className="bg-gray-100 text-left text-sm">
            <tr>
              <th className="p-2">
                <Link
                  href={{
                    pathname: "/dashboard/payments",
                    query: {
                      query,
                      page,
                      sortKey,
                      sortDate: "date",
                      sortDirection: nextDirection,
                    },
                  }}
                  className="inline-flex items-center gap-1 hover:underline"
                >
                  Paid&nbsp;at
                  {sortDate === "paidAt" ? sortIcon : <BiSortAlt2 size={16} />}
                </Link>
              </th>

              <th className="p-2">Status</th>
              <th className="p-2">Receipt</th>
              {/* Toggle sort when clicking “Paid at” header */}


              <th className="p-2">Consumer</th>
              <th className="p-2 text-right">Amount ($)</th>
              <th className="p-2 text-center">Invoice</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((p) => {
              const extra = Array.isArray(p.services)
                ? p.services.reduce((sum, it) => sum + Number(it?.values), 0)
                : 0;
              const total = p.amount + extra;

              return (
                <tr key={p._id} className="border-t text-sm">
                  <td className="p-2 whitespace-nowrap">
                    {formatDateTime(p.paidAt)}
                  </td>

                  <td className="p-2" title={`${p.note}: ${p.method}`}>
                    <span
                      className={`px-2 py-1 rounded ${p.status === "paid"
                          ? "bg-green-200 text-green-800"
                          : "bg-yellow-200 text-yellow-800"
                        }`}
                    >
                      {p.status}
                    </span>
                  </td>
                  <td className="p-2 whitespace-nowrap">
                    {formatDate(p.startDate)} – {formatDate(p.dueDate)}
                  </td>
                  <td className="p-2 whitespace-nowrap">
                    {formatDateTime(p.paidAt)}
                  </td>
                  <td className="p-2 whitespace-nowrap">{p.userId.username}</td>
                  <td className="p-2 text-right">${total.toFixed(2)}</td>
                  {/* <td className="p-2 text-center">
                    <Link href={`/invoice/${p._id}`} title="Print invoice">
                      <BiPrinter
                        size={20}
                        className="inline hover:text-blue-600"
                      />
                    </Link>
                  </td> */}
                </tr>
              );
            })}
            {payments.length === 0 && (
              <tr>
                <td colSpan={6} className="p-4 text-center text-gray-500">
                  No payments found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Pagination
        totalPages={countPage}
        pathname={"/payments"}
        itemPerPage={ITEM_PER_PAGE}
        currentPage={page}
        query={query}
      />
      {/* PAGINATION */}
    </div>
  );
}
