"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

export default function IncomeLineChart() {
  const combinedData = [
    { month: "Jan", y2024: 3200, y2025: 4100 },
    { month: "Feb", y2024: 2800, y2025: 3900 },
    { month: "Mar", y2024: 4500, y2025: 4800 },
    { month: "Apr", y2024: 4700, y2025: 5000 },
  ];

  const incomeKeys =
    combinedData.length > 0
      ? Object.keys(combinedData[0]).filter((key) => key !== "month")
      : [];

  const colors = ["#8884d8", "#82ca9d", "#ffc658", "#ff7300", "#a83279"];

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={combinedData} margin={{ top: 20, right: 30, bottom: 5, left: 0 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
        
        {incomeKeys.map((key, index) => (
          <Line
            key={key}
            type="monotone"
            dataKey={key}
            stroke={colors[index % colors.length]}
            strokeWidth={3}
            name={key.replace("y", "Year ")}
          />
        ))}

        <Legend align="right" />
      </LineChart>
    </ResponsiveContainer>
  );
}
