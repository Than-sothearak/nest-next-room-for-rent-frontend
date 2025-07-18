import { auth } from "@/auth";
import LastTransactionComponent from "@/components/LastTransactionsComponent";
import { Payment } from "@/models/Payment";
const LastTransitionPage = async () => {
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
 
      const formatted = latestPayment.map((payment) => ({
        name: payment.userId ? payment.userId?.username : "Unknown",
        date: new Date(payment.paidAt).toLocaleDateString(),
        amount: payment.amount + payment?.services?.reduce((sum, item) => sum + item.price, 0) || payment.amount ,
        status: payment.status === "paid" ? "Completed" : "Padding",
      }));
   
      console.log(formatted)

      return (
        <>
          <LastTransactionComponent data={formatted} />
        </>
      );
    }
  }
};

export default LastTransitionPage;
