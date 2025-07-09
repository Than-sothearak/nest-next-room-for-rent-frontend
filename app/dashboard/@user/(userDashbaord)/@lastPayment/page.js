import { auth } from '@/auth';
import ClientLastPayment from '@/components/ClientLastPayment'
import { Payment } from '@/models/Payment';
import React from 'react'

const LastPaymentPage = async ({searchParams}) => {
    
     const session = await auth();
      {
        if (!session) {
          return <div>Please log in to access the dashboard.</div>;
        }
      }
    const { sort } = await searchParams || 3;

      const clientPayments = JSON.parse(
        JSON.stringify(
          await Payment.find({ userId: session.user._id })
            .populate("userId")
            .populate("roomId")
            .populate("bookingId")
            .sort({ startDate: -1 }).limit(sort || 3)
        )
      );
  return (
    <div>
        <ClientLastPayment payments={clientPayments}/>
    </div>
  )
}

export default LastPaymentPage