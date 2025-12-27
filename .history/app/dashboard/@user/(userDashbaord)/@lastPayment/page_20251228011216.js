import ClientLastPayment from '@/components/ClientLastPayment'
import React from 'react'

const LastPaymentPage = async ({searchParams}) => {
    
  return (
    <div>
        <ClientLastPayment payments={clientPayments}/>
    </div>
  )
}

export default LastPaymentPage