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
  let formattedData;
   formattedData = incomeData.map((item) => {
    const month = item._id.month.toString().padStart(2, "0");
    return {
      month: `${item._id.year}-${month}`,
      income: item.totalIncome,
    };
  });
console.log(formattedData.push([{month: '2025-08', income: 4010}]))

console.log(formattedData)
  return (
    <div className="p-4 bg-white rounded-lg shadow-md mt-4">
      <h2 className="text-2xl mb-6">Income Last 6 Months</h2>
      <IncomeLineChart data={formattedData} />
    </div>
  );
}
