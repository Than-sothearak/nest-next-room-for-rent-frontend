import { Room } from "@/models/Room";
import { mongoDb } from "@/utils/connectDB";

export default async function singleBookingPage (props) {
    await mongoDb();
  const params = await props.params;
  const id = await params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return <p className="text-red-500">Invalid room ID!</p>;
    }
    const room = await Room.findOne({ roomId: id })
      .lean()
      .populate("category")
      .populate("parentCategory")
  
    if (!room) {
      return <p className="text-red-500">Room not found!</p>;
    }
return (
<></>
)
}