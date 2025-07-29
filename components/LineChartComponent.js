"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

export default function IncomeLineChart({ data }) {

  const combinedData = [
  { month: "Jan", 2024: 3200, 2025: 4100 },
  { month: "Feb", 2024: 2800, 2025: 3900 },
  { month: "Mar", 2024: 4500, 2025: 4800 },
  { month: "Apr", 2024: 4700, 2025: 5000 },
  { month: "May", 2024: 4900, 2025: 5300 },
  { month: "Jun", 2024: 4200, 2025: 4600 },
  { month: "Jul", 2024: 4600, 2025: 4700 },
  { month: "Aug", 2024: 4100, 2025: 5200 },
  { month: "Sep", 2024: 4700, 2025: 5100 },
  { month: "Oct", 2024: 5000, 2025: 5500 },
  { month: "Nov", 2024: 4400, 2025: 4900 },
  { month: "Dec", 2024: 4800, 2025: 5300 },
];


    const incomeKeys = data.length > 0
    ? Object.keys(data[0]).filter((key) => key !== "month")
    : [];
const colors = ["#8884d8","#82ca9d", "#ffc658", "#ff7300", "#a83279"];

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={combinedData} margin={{ top: 20, right: 30, bottom: 5, left: 0 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis dataKey="2025" />
        <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
        {incomeKeys.map((key, index) => (
          <Line
            key={key}
            type="monotone"
            dataKey={key}
            stroke={colors[index % colors.length]}  // assign a unique color per line
            strokeWidth={3}
            name={`Year ${key}`}
          />
        ))}
             <Legend align="right" />
      </LineChart>
 
    </ResponsiveContainer>
  );
}
