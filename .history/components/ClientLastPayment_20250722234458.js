"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { BiPrinter } from "react-icons/bi";
import { PiInvoiceBold } from "react-icons/pi";
import dayjs from "dayjs";
import { formatDate } from "@/utils/formatDate";
const ClientLastPayment = ({ payments }) => {
const [sort, setSort] = useState(3)
  const router = useRouter();

  const handleChange = (e) => {
    const value = e.target.value;
    setSort(value)
    if (value !== "default") {
      router.push(`dashboard/?sort=${value}`);
    }
  };

  return (
    <div className="mt-4 w-1/2 max-lg:w-full">
      <div className="w-full justify-start items-start flex gap-4 p-4 bg-primary rounded-lg ">
        <div>
          <PiInvoiceBold size={28} />
        </div>
        <div className="flex flex-col gap-4">
          <h2>Total spaned</h2>
          <h1 className="text-2xl font-bold">
            {payments
              .reduce((sum, item) => {
                return sum + item.amount;
              }, 0)
              .toLocaleString("en")}
            $
          </h1>
          <p className="text-green-500 text-xs">
            Last <span className="text-primarytext">{sort} months</span>
          </p>
        </div>

      </div>

      
      {/* Payment History  */}
      <div className="mt-4 w-full max-lg:w-full justify-start items-start bg-primary rounded-lg">
        <div className="flex gap-2 justify-between p-4">
          <h1 className="text-xl font-bold">Last payment</h1>
          <select className="border p-1 rounded-md" onChange={handleChange}>
            <option value="3">Last 3 months</option>
            <option value="6">Last 6 months</option>
            <option value="12">Last 12 months</option>
            <option value="24">Last 24 months</option>
          </select>
        </div>
       <div className="h-[28rem] overflow-y-auto px-4 pb-4">
         {payments.map((payment) => (
          <div className="bg-slate-100 p-2 mt-2 " key={payment._id}>
            <div className="flex items-center justify-between font-bold text-sm">
              <p>
                Date: {formatDate(payment.startDate)}-
                {formatDate(payment.dueDate)}{" "}
              </p>
              <div className="flex items-center gap-4 ">
                <p className="text-green-500">{payment.status}</p>
                <Link href={`invoice/${payment._id}`} className="hover:bg-blue-300 p-2">
                  <BiPrinter size={28} />
                </Link>
              </div>
            </div>
            <hr className="my-2"></hr>

            <div className="flex items-center justify-between">
              <p>Paid at</p>{" "}
              <p>{dayjs(payment.paidAt).format("YYYY-MM-DD HH:mm:ss")}</p>
            </div>

            <div className="flex items-center justify-between">
              <p>Consumer</p> <p>{payment.userId.username}</p>
            </div>

            <div className="flex items-center justify-between">
              <p>Amount</p>{" "}
              <p>
                ${" "}
                {payment.amount +
                  (payment.services?.reduce((sum, item) => {
                    return sum + Number(item.price);
                  }, 0) || 0)}
              </p>
            </div>
          </div>
        ))}
       </div>
      </div>
    </div>
  );
};

export default ClientLastPayment;
