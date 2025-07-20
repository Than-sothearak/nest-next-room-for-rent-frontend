import { revalidatePath } from 'next/cache';

export async function POST() {
  revalidatePath('/dashboard'); // your path here
  return Response.json({ revalidated: true });
}
