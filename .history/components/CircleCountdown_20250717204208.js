import { useEffect, useState } from "react";

export default function CircleTimeout({ totalSeconds = 150, size = 120 }) {
  const [timeLeft, setTimeLeft] = useState(totalSeconds);

  useEffect(() => {
    if (timeLeft === 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft]);

  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  // Calculate how much stroke to hide by subtracting progress
  const progress = timeLeft / totalSeconds;
  const strokeDashoffset = circumference * (1 - progress);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = (timeLeft % 60).toString().padStart(2, "0");

  return (
    <div style={{ width: size, height: size, position: "relative" }}>
      <svg width={size} height={size}>
        {/* Background circle */}
        <circle
          stroke="#ddd"
          fill="none"
          strokeWidth="2"
          r={radius}
          cx={size / 6}
          cy={size / 6}
        />
        {/* Progress circle */}
        <circle
          stroke="#3b82f6"
          fill="none"
          strokeWidth="2"
          r={radius}
          cx={size / 6}
          cy={size / 6}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 1s linear" }}
          transform={`rotate(-90 ${size / 2} ${size / 2})`} // start from top
        />
      </svg>

      {/* Time text in center */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontSize: "1.5rem",
          fontWeight: "bold",
          userSelect: "none",
        }}
      >
       
      </div>
    </div>
  );
}
