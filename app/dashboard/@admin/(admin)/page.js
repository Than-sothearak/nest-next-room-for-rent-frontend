import { auth } from "@/auth";
import { AdminDashboard } from "@/components/AdminDashboard";
import LastTransactionComponent from "@/components/LastTransactionsComponent";
import LineChartComponent from "@/components/LineChartComponent";
import { Booking } from "@/models/Booking";
import { Order } from "@/models/Order";
import { Payment } from "@/models/Payment";
import { User } from "@/models/User";
const AdminDashboardPage = async () => {
  const session = await auth();
  {
    if (!session) {
      return <div>Please log in to access the dashboard.</div>;
    }
  }

  {
    if (session?.user?.isAdmin) {
      const latestPayment = await Payment.find()
        .populate("userId")
        .sort({ date: -1 })
        .limit(10)
        .lean();
      const users = await User.find();
      const payments = await Payment.find().populate("userId");
      const booking = await Booking.find();

      const formatted = latestPayment.map((payment) => ({
        name: payment.userId ? payment.userId?.username : "Unknown",
        date: new Date(payment.paidAt).toLocaleDateString(),
        amount: payment.amount,
        status: payment.status === "paid" ? "Completed" : "Padding",
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
      <AdminDashboard users={users} payments={payments} booking={booking} />
      <LastTransactionComponent data={formatted} />
      <LineChartComponent data={result} />
       </>
  )
    }
} 

}

export default AdminDashboardPage;
