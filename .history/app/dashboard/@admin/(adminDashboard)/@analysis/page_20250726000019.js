import { getRoom } from "@/actions/rooms";
import { auth } from "@/auth";
import AnalysisGrid from "@/components/AnalysisGrid";
import { Booking } from "@/models/Booking";
import { Payment } from "@/models/Payment";
import { User } from "@/models/User";
import { serializeDoc } from "@/utils/serializeDoc";
const AnalysisPage = async () => {
  await mongoDb()
  const session = await auth();
  {
    if (!session) {
      return <div>Please log in to access the dashboard.</div>;
    }
  }
  {
    if (session?.user?.isAdmin) {

      const users = serializeDoc(await User.find().lean());
      const payments = serializeDoc(await Payment.find().populate("userId"));
      const booking = serializeDoc(await Booking.find().populate("roomId"));
      const {count} = await getRoom()
      const roomCount =count
      const parking = serializeDoc(booking.reduce((acc, b) => {
        const type = b.parking?.slot;
        const qty = Number(b.parking?.size);

        if (!type || isNaN(qty)) return acc;

        acc[type] = (acc[type] || 0) + qty;

        return acc;

      }, {})
)
    
      return (
        <>
          <AnalysisGrid roomCount={roomCount} users={users} payments={payments} booking={booking} parking={parking}/>
        </>
      );
    }
  }
};

export default AnalysisPage;
