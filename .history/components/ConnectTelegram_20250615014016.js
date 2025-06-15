"use client";

import { InlineKeyboard } from "grammy";

export default function ConnectTelegram({ userId, botUsername }) {
  const telegramStartUrl = `https://t.me/${botUsername}?start=${userId}`;

  return (
    <div>
      <h2>Connect your Telegram</h2>
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
