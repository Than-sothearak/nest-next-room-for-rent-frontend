import { mongoDb } from "@/utils/connectDB";
import mongoose from "mongoose";
import { getCategories } from "@/actions/categories";
import { Room } from "@/models/Room";
import RoomForm from "@/components/RoomForm";

export default async function singleProductPage(props) {
  await mongoDb();
  const params = await props.params;
  const id = await params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return <p className="text-red-500">Invalid product ID!</p>;
  }
  const room = await Room.findOne({ _id: id })
    .lean()
    .populate("category")
    .populate("parentCategory")

  if (!room) {
    return <p className="text-red-500">Room not found!</p>;
  }

  const fecthCategories = await getCategories();
  const getCategory = JSON.parse(JSON.stringify(fecthCategories));
  const parentCategory = JSON.parse(
    JSON.stringify(
      fecthCategories.filter((category) => !category.parentCategory)
    )
  );

  return (
    <RoomForm
      categories={getCategory}
      parentCategory={parentCategory}
      room={JSON.parse(JSON.stringify(room))}
      roomId={id}
    />
  );
}
