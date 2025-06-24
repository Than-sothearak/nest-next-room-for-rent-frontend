"use client";
import React, { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { formatDate } from "@/utils/formatDate";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import ToggleToPaid from "./ToggleToPaid";
import ButtonEditAndCancel from "./ButtonEditAndCancel";
import ConnectTelegram from "./ConnectTelegram";
import ProcessBilling from "./ProcessBilling";
import SendInvoiceButton from "./SendInvoiceButton";
import { BsTelegram } from "react-icons/bs";

// Your helper function to get next payment due date

const ServiceList = ({

}) => {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const [direction, setDirection] = useState("ascending");

    const searchParams = useSearchParams();

    const getSortIcon = (key) => {
        if (key === sortKey) {
            return direction === "ascending" ? <IoIosArrowUp /> : <IoIosArrowDown />;
        } else {
            return <IoIosArrowDown />;
        }
    };

    async function handleRun() {
        if (!confirm("Are you sure you want to run the billing update?")) return;

        setLoading(true);
        setMessage("");

        try {
            const res = await fetch("/api/cron/process-billing");
            const data = await res.json();
            setMessage(data.message || "Billing update completed.");
        } catch (error) {
            setMessage("Failed to run billing update.");
        }

        setLoading(false);
    }

    return (
        <div className="w-full h-full mt-4">
            <div className="">
                <ProcessBilling />
            </div>
            <table className="w-full bg-slate-500 max-lg:hidden">
                <thead className="bg-primary text-tertiary">
                    <tr className="p-4">
                        <th className="text-start py-4">No</th>
                        <th className="text-start">Room</th>
                        <th className="text-start">Guest</th>
                        <th className="text-center">Paid</th>
                        <th className="text-center">Invoice Status</th>
                        <th className="text-start">Action</th>
                    </tr>
                </thead>
                <tbody>
                   
                        <tr
                     
                            className="odd:bg-white even:bg-gray-100 text-gray-900 dark:odd:bg-slate-200 dark:even:bg-gray-100 dark:text-tertiary"
                        >
                            <td className="p-2">
                                <p>12</p>
                            </td>

                            <td className="font-bold">12</td>

                            <td className="p-2 font-bold">12</td>

                            <td className="">12</td>

                            <td className="">
                              12
                            </td>

                  

                        
                        </tr>
              
                </tbody>
            </table>

            <div className="lg:hidden">

           
                    <div
                     
                        className="bg-white border mt-4 dark:bg-slate-200 p-4 mb-4 rounded-lg shadow-md"
                    >
                        <div className="flex justify-between items-center">
                            <h3 className="font-bold text-lg">
                                <p className="text-xl">
                                    <strong>Room:</strong>sad
                                </p>
                            </h3>
                        
                        </div>

                        <div className="flex item-center gap-2 font-bold text-xl">
                            <p>Guest:</p> <h2>sd</h2>
                        </div>
                        <p>
                            <strong>Price/m:</strong> asd
                        </p>
                        <p>
                            <strong>Date:</strong> das
                        </p>
                        <p>
                            <strong>Due Date:</strong> {formatDate(item.dueDate)}
                        </p>
                        <div className="flex justify-between items-center">
                       
                            <div className="flex gap-2">

                            
                            </div>
                        </div>
                    </div>
             
            </div>

        </div>
    );
};

export default ServiceList;
