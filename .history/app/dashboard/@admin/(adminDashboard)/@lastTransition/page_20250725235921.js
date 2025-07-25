import { auth } from "@/auth";
import LastTransactionComponent from "@/components/LastTransactionsComponent";
import { Payment } from "@/models/Payment";
import { mongoDb } from "@/utils/connectDB";
const LastTransitionPage = async () => {
  await mongoDb()
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
        .sort({ paidAt: -1 })
        .limit(10)
        .lean();

      const formatted = latestPayment.map((payment) => ({
        name: payment.userId ? payment.userId?.username : "Unknown",
        date: new Date(payment.paidAt).toLocaleDateString(),
        amount: (
          (Number(payment.amount) || 0) +
          (payment.services?.reduce((sum, item) => sum + Number(item.price), 0) || 0)
        ),


        status: payment.status === "paid" ? "Completed" : "Padding",
      }));


      return (
        <>
          <LastTransactionComponent data={formatted} />
        </>
      );
    }
  }
};

export default LastTransitionPage;
