import { getRoom } from "@/actions/rooms";
import { getUsers } from "@/actions/users";
import BookingForm from "@/components/BookingForm";
import { Room } from "@/models/Room";
import { mongoDb } from "@/utils/connectDB";
import mongoose from "mongoose";

export default async function singleBookingPage (props) {
    await mongoDb();
  const params = await props.params;
  const id = await params.id;

  const {users} = await getUsers();
 const { rooms } = await getRoom()
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return <p className="text-red-500">Invalid room ID!</p>;
    }
    const oneRoom = await Room.findOne({ _id: id })
      .lean()
  
    if (!oneRoom) {
      return <p className="text-red-500">Room not found!</p>;
    }
return (
<>
<BookingForm 
  users={JSON.parse(JSON.stringify(users))}
  rooms={JSON.parse(JSON.st)}
  roomId={JSON.parse(JSON.stringify(oneRoom))}
/>
</>
)
}