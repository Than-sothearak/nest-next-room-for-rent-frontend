"use client";

export default function ConnectTelegram({ userId, user }) {
  const telegramStartUrl = `https://t.me/wbc_notifications_bot?start=${userId}`;

  return (
    <div className="cursor-pointer flex flex-col items-center justify-center p-4 bg-slate-200 hover:bg-slate-300 w-full border border-slate-300 rounded-xl">
      
      <a
        href={telegramStartUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="btn"
      >
        Connect your Telegram
      </a>
    </div>
  );
}
