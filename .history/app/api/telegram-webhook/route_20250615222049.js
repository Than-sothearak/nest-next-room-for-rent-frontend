export async function POST(request) {
  const body = await request.json();
  console.log("Telegram update received:", body);

  // Respond quickly to Telegram with 200 OK
  return new Response("OK", { status: 200 });
}
