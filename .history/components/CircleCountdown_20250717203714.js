import { useEffect, useState } from "react";

export default function CircleCountdown({ seconds = 150, size = 100 }) {
  const [timeLeft, setTimeLeft] = useState(seconds);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const progress = (timeLeft / seconds) * 100;
  const strokeDashoffset = circumference * (1 - progress / 100);

  const minutes = Math.floor(timeLeft / 60);
  const secondsDisplay = (timeLeft % 60).toString().padStart(2, "0");

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size}>
        <circle
          stroke="#e5e7eb"
          fill="transparent"
          strokeWidth="6"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <circle
          stroke="#3b82f6"
          fill="transparent"
          strokeWidth="6"
          r={radius}
          cx={size / 2}
          cy={size / 2}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 1s linear" }}
        />
      </svg>
      <div className="absolute text-xs font-semibold">
        {minutes}:{secondsDisplay}
      </div>
    </div>
  );
}
