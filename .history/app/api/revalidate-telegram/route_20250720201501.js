// app/api/revalidate-telegram/route.js or route.ts
import { revalidatePath } from 'next/cache';

export async function GET() {
  revalidatePath('/dashboard'); // or your actual path
  return Response.json({ revalidated: true });
}
