// utils/sendTelegramMessage.js

export async function sendTelegramMessage(chatId, text) {
  const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
  const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: "Markdown", // or "HTML"
    }),
  });

  const data = await res.json();

  if (!data.ok) {
    console.error("Telegram send failed:", data);
  }

  return data;
}
