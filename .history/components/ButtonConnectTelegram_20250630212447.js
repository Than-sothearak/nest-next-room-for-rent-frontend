"use client";

import { InlineKeyboard } from "grammy";

export default function ConnectTelegram({ userId }) {
  const telegramStartUrl = `https://t.me/wbc_notifications_bot?start=${userId}`;

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-slate-200 hover:bg-slate-300 w-full border rounded-lg">
      
      <a
        href={telegramStartUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="btn"
      >
        Connect Telegram
      </a>
    </div>
  );
}
