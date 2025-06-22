"use server"
import InvoicePreview from '@/components/InvoicePreview'
import { Payment } from '@/models/Payment';
import { mongoDb } from '@/utils/connectDB';
import React from 'react'

export default async function InvoicePage (props) {
   
        await mongoDb();
      const params = await props.params;
      const id = await params.id;
    const payments = JSON.parse(JSON.stringify(await Payment.find({ _id: id }).populate('userId').populate('roomId').populate('bookingId').sort({ startDate: -1 })));
    return (
        <div>
            <InvoicePreview data={payments[0]} />
        </div>
    )
}

