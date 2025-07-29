import IncomeLineChart from "@/components/LineChartComponent";
import { Payment } from "@/models/Payment";

export default async function IncomeChart() {
  const today = new Date();
  const sixMonthsAgo = new Date(today.getFullYear(), today.getMonth() - 5, 1);

  const incomeData = await Payment.aggregate([
    {
      $match: {
        paidAt: { $gte: sixMonthsAgo, $lte: today },
        status: "paid",
      },
    },
    {
      $group: {
        _id: { year: { $year: "$paidAt" }, month: { $month: "$paidAt" } },
        totalIncome: { $sum: "$amount" },
      },
    },
    { $sort: { "_id.year": 1, "_id.month": 1 } },
  ]);

  let formattedData = incomeData.map((item) => {
    const month = item._id.month.toString().padStart(2, "0");
    return {
      month: `${item._id.year}-${month}`,
      income: item.totalIncome,
    };
  });

  const currentYear = today.getFullYear(); // e.g., 2025
  const lastYear = currentYear - 1;

  const incomeCurrent = {};
  const incomeLast = {}; // e.g., 2024

  formattedData.forEach((item) => {
    const [year, monthNum] = item.month.split("-");
    const monthName = new Date(`${item.month}-01`).toLocaleString("default", {
      month: "short",
    }); // e.g., "Aug"

    if (Number(year) === lastYear) {
      incomeLast[monthName] = item.income;
    } else if (Number(year) === currentYear) {
      incomeCurrent[monthName] = item.income;
    }
  });

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const combinedData = months.map((month) => ({
    month,
    [`${lastYear}`]: incomeLast[month] || 0,
    [`${currentYear}`]: incomeCurrent[month] || 0,
  }));

  return (
    <div className="p-4 bg-white rounded-lg shadow-md mt-4">
      <h2 className="text-2xl mb-6">
        Income last 12 months {currentYear}
      </h2>
      <IncomeLineChart data={combinedData} />
    </div>
  );
}
