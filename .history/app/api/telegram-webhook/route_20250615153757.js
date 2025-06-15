// app/api/telegram-webhook/route.js
export async function POST(request) {
  const body = await request.json();
  console.log("📦 Telegram Webhook Payload:", body);

  // You can handle the Telegram message here

  return new Response("OK", { status: 200 });
}
