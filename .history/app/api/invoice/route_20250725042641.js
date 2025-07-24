import { NextRequest, NextResponse } from 'next/server';
import { mongoDb } from '@/utils/connectDB';
import { Booking } from '@/models/Booking';
import { generateInvoicePdf } from '@/utils/generateInvoicePdf';
import { Room } from '@/models/Room'; // 

export async function POST(req) {
  await mongoDb();
  const { bookingId } = await req.json();

  const booking =  await Booking.findById(bookingId)
            .populate("userId")
            .populate({
              path: "roomId",
              populate: { path: "category" },
            })
          
            console.log(booking)
  if (!booking) {
    return new NextResponse('Booking not found', { status: 404 });
  }

  const pdfBuffer = await generateInvoicePdf(booking);

  return new NextResponse(pdfBuffer, {
    status: 200,
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename="invoice.pdf"',
    },
  });
}
