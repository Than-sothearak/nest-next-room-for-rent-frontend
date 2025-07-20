import { auth } from "@/auth";
import AnalysisGrid from "@/components/AnalysisGrid";
import { Booking } from "@/models/Booking";
import { Payment } from "@/models/Payment";
import { User } from "@/models/User";
const AnalysisPage = async () => {
  const session = await auth();
  {
    if (!session) {
      return <div>Please log in to access the dashboard.</div>;
    }
  }

  {
    if (session?.user?.isAdmin) {

      const users = await User.find();
      const payments = await Payment.find().populate("userId");
      const booking = await Booking.find();

      console.log(booking)
     const count = booking.reduce((acc, b) => {
      const type = b.parking?.slot;
       const qty = Number(b.parking?.size);

      if (!type || isNaN(qty)) return acc;

  acc[type] = (acc[type] || 0) + qty;

 return acc;
       
     }, {})

     console.log(count)
      return (
        <>
          <AnalysisGrid users={users} payments={payments} booking={booking} />
        </>
      );
    }
  }
};

export default AnalysisPage;
