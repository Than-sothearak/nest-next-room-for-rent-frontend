import ClientService from '@/components/ClientServiceGrid'
import { auth } from "@/auth";
import { Booking } from "@/models/Booking";

import { Service } from "@/models/Service";
import { User } from '@/models/User';

const RequestingServices = async () => {
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
    const services = JSON.parse(
      JSON.stringify(await Service.find({ userId: user._id }))
    );

      const clientBooking = JSON.parse(JSON.stringify(clientData));
  
  return (
      <ClientService 
      services={services}
      isClicked={isClicked} 
      setIsClicked={setIsClicked} 
      booking={booking} 
      user={user}/>
  )
}

export default RequestingServices