"use client";

import { InlineKeyboard } from "grammy";

export default function ConnectTelegram({ userId }) {
  const telegramStartUrl = `https://t.me/@wbc_notifications_bot?start=${userId}`;

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
