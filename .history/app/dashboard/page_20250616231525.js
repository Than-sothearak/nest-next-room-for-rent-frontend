import { auth } from "@/auth";
import { AdminDashboard } from "@/components/AdminDashboard";
import LastTransactionComponent from "@/components/LastTransactionsComponent";
import LineChartComponent from "@/components/LineChartComponent";
import { Order } from "@/models/Order";
const dashboardPage = async () => {
  const session = await auth();

  const latestOrders = await Order.find().sort({ date: -1 }).limit(10).lean();

  const formatted = latestOrders.map((order) => ({
    name: order.customerID ? order.customerID : "Unknown",
    date: new Date(order.date).toLocaleDateString(),
    amount: order.totalAmount,
    status: order.paymentStatus || "Pending",
  }));

  const data = await Order.find();
  const monthlyDataMap = {};

  data.forEach((order) => {
    const date = new Date(order.date);
    const dateFormat = `${date.getFullYear()}-${String(
      date.getMonth() + 1
    ).padStart(2, "0")}`;
    if (!monthlyDataMap[dateFormat]) {
      monthlyDataMap[dateFormat] = {
        dateFormat,
        totalSales: 0,
        totalItems: 0,
      };
    }
    monthlyDataMap[dateFormat].totalSales += order.totalAmount;
    const itemQty = order.items.reduce((sum, item) => sum + item.quantity, 0);
    monthlyDataMap[dateFormat].totalItems += itemQty;
  });

  const result = Object.values(monthlyDataMap).sort((a, b) =>
    a.dateFormat.localeCompare(b.dateFormat)
  );
  return (
    <>
      {session?.isAdmin ? (
        <div>
          <AdminDashboard />
          <LastTransactionComponent data={formatted} />
          <LineChartComponent data={result} />
        </div>
      ) : (
        <div>sds</div>
      )}
    </>
  );
};

export default dashboardPage;
