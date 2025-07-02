import { getRoom } from "@/actions/rooms";
import { getUsers } from "@/actions/users";
import BookingForm from "@/components/BookingForm";
import { Booking } from "@/models/Booking";
import { Room } from "@/models/Room";
import { mongoDb } from "@/utils/connectDB";
import mongoose from "mongoose";

export default async function singleBookingPage (props) {
    await mongoDb();
  const params = await props.params;
  const id = await params.id;

  const {users} = await getUsers();
  const { rooms } = await getRoom()
  const  booking  = await Booking.findOne({_id: id}).populate('roomId')

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return <p className="text-red-500">Invalid room ID!</p>;
    }
    const oneRoom = await Room.findOne({ _id: booking.roomId._id})
      .lean()
  
return (
<>
<BookingForm 
  booking={JSON.parse(JSON.stringify(booking))}
  users={JSON.parse(JSON.stringify(users))}
  rooms={JSON.parse(JSON.stringify(rooms))}
  oneRoom={JSON.parse(JSON.stringify(oneRoom))}
/>
</>
)
}