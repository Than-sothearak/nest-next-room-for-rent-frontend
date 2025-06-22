import InvoicePreview from '@/components/InvoicePreview'
import { Payment } from '@/models/Payment';
import { mongoDb } from '@/utils/connectDB';
import React from 'react'

export const InvoicePage = async () => {
 await mongoDb()
     const payments = JSON.parse(JSON.stringify(await Payment.find({ userId: user._id }).populate('userId').populate('roomId').populate('bookingId').sort({ startDate: -1 })));
  return (
      <div>
              <InvoicePreview data={payments[0]}/>
            </div>
  )
}

