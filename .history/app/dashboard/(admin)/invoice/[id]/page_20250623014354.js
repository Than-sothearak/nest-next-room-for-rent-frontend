import { auth } from '@/auth';
import InvoicePreview from '@/components/InvoicePreview'
import { Payment } from '@/models/Payment';
import { mongoDb } from '@/utils/connectDB';
import React from 'react'

const invoicePage = async (props) => {

      await mongoDb();
      const session = await auth();
    
      const params = await props.params;
      const id = await params.id;

       const payment = JSON.parse(JSON.stringify(await Payment.find({ _id: id }).populate('userId').populate('roomId').populate('bookingId').sort({ startDate: -1 })));
     
  return (
    <div><InvoicePreview data={payment}/></div>
  )
}

export default invoicePage