// app/api/telegram-webhook/route.js

export async function GET() {
  return new Response("GET not supported here, please send POST requests.", { status: 200 });
}

export async function POST(request) {
  const body = await request.json();
  console.log("Telegram webhook body:", body);

  return new Response("OK", { status: 200 });
}
