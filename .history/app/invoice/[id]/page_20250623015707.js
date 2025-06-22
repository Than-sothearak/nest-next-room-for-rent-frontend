"use client"
import { auth } from '@/auth';
import InvoicePreview from '@/components/InvoicePreview'
import { Payment } from '@/models/Payment';
import { mongoDb } from '@/utils/connectDB';
import dynamic from 'next/dynamic';
import React from 'react'

const invoicePage = async (props) => {

    //   await mongoDb();
    //   const session = await auth();
    
    //   const params = await props.params;
    //   const id = await params.id;

    //    const payment = JSON.parse(JSON.stringify(await Payment.find({ _id: id }).populate('userId').populate('roomId').populate('bookingId').sort({ startDate: -1 })));
    //  console.log(payment)

  return (
    <div><InvoicePreview data={{
    _id: '68584a3e054947de9a53951d',
    bookingId: {
      _id: '685062b5e92832748d8f02bf',
      userId: '684a750f803f50e6ec3ffeb6',
      roomId: '6848631bb92041c5065bb60a',
      startDate: '2025-04-01T00:00:00.000Z',
      dueDate: '2025-05-01T00:00:00.000Z',
      contract: 12,
      rent: 300,
      deposit: 180,
      paymentStatus: 'unpaid',
      status: 'active',
      notes: '',
      files: [Array],
      properties: [Array],
      invoiceSent: true,
      createdAt: '2025-06-16T18:30:13.471Z',
      updatedAt: '2025-06-22T18:24:13.067Z',
      __v: 0
    },
    userId: {
      _id: '684a750f803f50e6ec3ffeb6',
      username: 'Mr. THAN Sothearak',
      email: 'guest1@gmail.com',
      phone: '099876543',
      address: '2004',
      imageUrl: '',
      password: '$2b$10$oylb/LqNZBBWPxnIaO.CKuuiUj5ef.GviqKpbcXVsKwCXz4m2ZXTW',
      isAdmin: false,
      createdAt: '2025-06-12T06:34:55.267Z',
      updatedAt: '2025-06-22T17:30:49.157Z',
      __v: 0,
      telegramChatId: '274173966'
    },
    roomId: {
      _id: '6848631bb92041c5065bb60a',
      roomName: '110E',
      description: 'About this property\r\n' +
        '\r\n' +
        'Comfortable Accommodations: The Palms of Destin-2116 in Destin offers spacious rooms with air-conditioning, private bathrooms, and balconies. Each room includes a kitchen, washing machine, and modern amenities for a pleasant stay.\r\n' +
        '\r\n' +
        'Exceptional Facilities: Guests can enjoy spa and wellness facilities, a year-round outdoor swimming pool, tennis court, and fitness room. Additional amenities include a hot tub, garden, terrace, and free WiFi throughout the resort.\r\n' +
        '\r\n' +
        'Dining Experience: The family-friendly restaurant serves American, Italian, Mediterranean, and seafood cuisines, alongside brunch, lunch, and dinner. Live music and evening entertainment enhance the dining experience.\r\n' +
        '\r\n' +
        'Prime Location: Destin Beach is a 7-minute walk away, while Destin Harbor Boardwalk lies 6 km from the resort. Nearby attractions include Big Kahunas and Emerald Coast Science Center, each within 20 km.',
      floor: '2',
      price: 190,
      status: 0,
      capacity: 2,
      imageUrls: [Array],
      parentCategory: '68484b574900689b9edd530f',
      category: '6848e9f6a4561cf22bb13bdd',
      properties: [Array],
      createdAt: '2025-06-10T16:53:47.565Z',
      updatedAt: '2025-06-16T18:30:13.520Z',
      __v: 0
    },
    startDate: '2025-01-01T00:00:00.000Z',
    dueDate: '2025-02-01T00:00:00.000Z',
    amount: 300,
    method: 'manual',
    note: 'Paid by admin',
    status: 'paid',
    paidAt: '2025-06-22T18:23:58.435Z',
    createdAt: '2025-06-22T18:23:58.435Z',
    updatedAt: '2025-06-22T18:23:58.435Z',
    __v: 0
  }}/></div>
  )
}

export default invoicePage