import { NextResponse } from 'next/server';
import { mongoDb } from '@/utils/connectDB';
import { Booking } from '@/models/Booking';
import { generateInvoicePdf } from '@/utils/generateInvoicePdf';
import mongoose from 'mongoose';


export async function POST(req) {
  try {
    await mongoDb();
    const { bookingId } = await req.json();
    if (!mongoose.Types.ObjectId.isValid(bookingId)) {
      return new NextResponse('Invalid booking ID', { status: 400 });
    }
    const booking = await Booking.findById(bookingId)
      .populate("userId")
      .populate({
        path: "roomId",
        populate: { path: "category" },
      });

    if (!booking) {
      return new Response('Booking not found', { status: 404 });
    }

    const pdfBuffer = await generateInvoicePdf(booking);
   console.log('PDF buffer length:', pdfBuffer.length);

    return new Response(pdfBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="invoice.pdf"',
        'Content-Length': pdfBuffer.length.toString(),
      },
    });
  } catch (error) {
    console.error('Error generating invoice PDF:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

