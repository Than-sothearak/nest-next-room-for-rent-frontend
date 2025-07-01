import { auth } from "@/auth";
import { ClientDashboard } from "@/components/ClientDashboard";
import { Booking } from "@/models/Booking";
import { Payment } from "@/models/Payment";
import { User } from "@/models/User";
const UserDashboardPage = async () => {
  const session = await auth();
  {
    if (!session) {
      return <div>Please log in to access the dashboard.</div>;
    }
  }

  const user = await User.findById(session.user._id);
  const clientData = await Booking.findOne({ userId: user._id })
    .populate("userId") // First populate userId
    .populate("roomId"); // Then roomId

  const clientBooking = JSON.parse(JSON.stringify(clientData));

  const clientPayments = JSON.parse(
    JSON.stringify(
      await Payment.find({ userId: user._id })
        .populate("userId")
        .populate("roomId")
        .populate("bookingId")
        .sort({ startDate: -1 })
    )
  );

  return (
    <div>
      <ClientDashboard
        session={session}
        payments={clientPayments}
        booking={clientBooking}
      />
    </div>
  );
};

export default UserDashboardPage;
