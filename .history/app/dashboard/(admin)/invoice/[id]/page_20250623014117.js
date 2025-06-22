import { auth } from '@/auth';
import InvoicePreview from '@/components/InvoicePreview'
import { mongoDb } from '@/utils/connectDB';
import React from 'react'

const invoicePage = async (props) => {

      await mongoDb();
      const session = await auth();
    
      const params = await props.params;
      const id = await params.id;
     
  return (
    <div><InvoicePreview data={payments[2]}/></div>
  )
}

export default invoicePage