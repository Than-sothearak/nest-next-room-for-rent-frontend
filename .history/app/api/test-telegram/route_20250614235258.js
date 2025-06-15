import { sendTelegramMessage } from "@/utils/sendTelegramMessage";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const chatId = searchParams.get("chatId");

  if (!chatId) {
    return new Response(JSON.stringify({ error: "chatId is required" }), { status: 400 });
  }

  try {
    const message = "Hello from Next.js! This is a test message.";
    const telegramResponse = await sendTelegramMessage(chatId, message);

    return new Response(
      JSON.stringify({ success: true, telegramResponse }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
