import InvoicePreview from '@/components/InvoicePreview'
import { Payment } from '@/models/Payment';
import { mongoDb } from '@/utils/connectDB';
import React from 'react'

export default async function InvoicePage () {
    await mongoDb()
    const payments = JSON.parse(JSON.stringify(await Payment.find({ _id: '68584a3e054947de9a53951d' }).populate('userId').populate('roomId').populate('bookingId').sort({ startDate: -1 })));
    return (
        <div>
            <InvoicePreview data={payments[0]} />
        </div>
    )
}

