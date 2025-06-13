"use client";
import { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import AddTransaction from "@/components/AddTransaction";
import LineChartComponent from "@/components/LineChartComponent";
import {
    CategoryScale,
    Chart as ChartJS,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  } from 'chart.js';
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
  

export default function ExpensePage() {
    const [transactions, setTransactions] = useState([
        { id: 1, type: "expense", category: "Food", amount: 10, date: "2025-03-15" },
        { id: 2, type: "income", category: "Salary", amount: 500, date: "2025-03-01" },
        { id: 3, type: "expense", category: "Shopping", amount: 100, date: "2025-02-20" },
        { id: 4, type: "expense", category: "Transport", amount: 50, date: "2025-03-10" },
        { id: 5, type: "income", category: "Freelance", amount: 250, date: "2025-03-12" },
        { id: 6, type: "expense", category: "Entertainment", amount: 75, date: "2025-03-08" },
        { id: 7, type: "expense", category: "Bills", amount: 120, date: "2025-03-05" },
        { id: 8, type: "income", category: "Gift", amount: 100, date: "2025-03-18" },
        { id: 9, type: "expense", category: "Dining", amount: 60, date: "2025-03-14" },
        { id: 10, type: "income", category: "Bonus", amount: 200, date: "2025-03-17" },
        { id: 11, type: "expense", category: "Travel", amount: 300, date: "2025-03-13" },
        { id: 12, type: "income", category: "Investment", amount: 400, date: "2025-03-16" },
        { id: 13, type: "expense", category: "Healthcare", amount: 150, date: "2025-03-07" },
        { id: 14, type: "income", category: "Consulting", amount: 350, date: "2025-03-20" },
        { id: 15, type: "expense", category: "Groceries", amount: 80, date: "2025-03-11" },
        { id: 16, type: "expense", category: "Subscriptions", amount: 25, date: "2025-03-09" },
        { id: 17, type: "income", category: "Royalties", amount: 150, date: "2025-03-21" },
        { id: 18, type: "expense", category: "Education", amount: 200, date: "2025-03-04" },
        { id: 19, type: "income", category: "Side Project", amount: 180, date: "2025-03-19" },
        { id: 20, type: "expense", category: "Personal Care", amount: 50, date: "2025-03-06" },
      ]);

  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  // Filter transactions based on selected month and year
  const filteredTransactions = transactions.filter((t) => {
    const date = new Date(t.date);
    return date.getMonth() + 1 === selectedMonth && date.getFullYear() === selectedYear;
  });

  const totalBalance = filteredTransactions.reduce(
    (acc, t) => acc + (t.type === "income" ? t.amount : -t.amount),
    0
  );

  // Process data for LineChartComponent
  const chartData = filteredTransactions.reduce((acc, t) => {
    const date = t.date; // Keep the full date format
    const existingEntry = acc.find((entry) => entry.date === date);

    if (existingEntry) {
      existingEntry[t.type] += t.amount;
    } else {
      acc.push({
        date,
        expense: t.type === "expense" ? t.amount : 0,
        income: t.type === "income" ? t.amount : 0,
      });
    }

    return acc;
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Expense Tracker</h1>

      {/* Month & Year Selection */}
      <div className="flex gap-4 mt-4">
        <select className="border p-2" value={selectedMonth} onChange={(e) => setSelectedMonth(Number(e.target.value))}>
          {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
            <option key={month} value={month}>
              {new Date(2025, month - 1, 1).toLocaleString("default", { month: "long" })}
            </option>
          ))}
        </select>

        <select className="border p-2" value={selectedYear} onChange={(e) => setSelectedYear(Number(e.target.value))}>
          {[2023, 2024, 2025, 2026].map((year) => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
      </div>

      <h2 className="text-xl mt-4">Balance for {selectedMonth}/{selectedYear}: ${totalBalance}</h2>

      {/* Transaction List */}
      <ul className="mt-4">
        {filteredTransactions.map((t) => (
          <li key={t.id} className="p-2 border-b">
            {t.category}: {t.type === "income" ? "+" : "-"}${t.amount} ({t.date})
          </li>
        ))}
      </ul>

      {/* Add Transaction */}
      <AddTransaction setTransactions={setTransactions} />

      {/* Expense Chart */}
      <Bar
        data={{
          labels: filteredTransactions.map((t) => t.category),
          datasets: [
            {
              label: "Expenses",
              data: filteredTransactions.map((t) => t.amount),
              backgroundColor: filteredTransactions.map((t) => (t.type === "income" ? "green" : "red")),
            },
          ],
        }}
      />

  
    </div>
  );
}
