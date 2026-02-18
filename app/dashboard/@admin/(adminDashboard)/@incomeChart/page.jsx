import IncomeLineChart from "@/components/LineChartComponent";

export default async function IncomeChart() {
  const today = new Date();
  const sixMonthsAgo = new Date(today.getFullYear(), today.getMonth() - 5, 1);



  return (
    <div className="p-4 bg-white rounded-lg shadow-md mt-4">
      <h2 className="text-2xl mb-6">
        Income last 12 months
      </h2>
      <IncomeLineChart  />
    </div>
  );
}
