import { getCategories } from "@/actions/categories";
import RoomForm from "@/components/RoomForm";

export default async function addRoomPage() {
  const fecthCategories = await getCategories()
  const getCategory =  JSON.parse(JSON.stringify(fecthCategories))
  const parentCategory = JSON.parse(JSON.stringify(fecthCategories.filter(category => !category.parentCategory)))

  return (
    <>
    <RoomForm categories={getCategory} parentCategory={parentCategory}/></>
  );
}
