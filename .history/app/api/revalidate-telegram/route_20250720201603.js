import { revalidatePath } from 'next/cache';

export async function POST() {
  revalidatePath('/dashboard'); // or your actual path
  return Response.json({ revalidated: true });
}
