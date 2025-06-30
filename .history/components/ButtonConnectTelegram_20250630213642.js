"use client";

export default function ConnectTelegram({ userId, user }) {
  const telegramStartUrl = `https://t.me/wbc_notifications_bot?start=${userId}`;
console.log(user)
  return (
    <div className={`${user.telegramChatId ? 'bg-slate-600 text-white hover:bg-slate-500' : 'bg-slate-200 hover:bg-slate-300'} cursor-pointer flex flex-col items-center justify-center p-4  w-full border border-slate-300 rounded-xl`}>
      
      <a
        href={telegramStartUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="btn"
      >
        {user.telegramChatId ? "Connected" : "Connect your Telegram"}
      </a>
    </div>
  );
}
