import { getRoom } from "@/actions/rooms";
import { auth } from "@/auth";
import Pagination from "@/components/Pagination";
import { RoomGrid } from "@/components/RoomGrid";
import SearchComponent from "@/components/SearchComponent";
import { mongoDb } from "@/utils/connectDB";
import Link from "next/link";

const roomPage = async ({ searchParams }) => {
  await mongoDb();
  const session = await auth();
  if (!session || !session.user?.isAdmin) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-2xl font-bold">Unauthorized</h1>
      </div>
    );
  }
  const { query } = await searchParams;
 
  const pathname = "rooms"
  const { page } = (await searchParams) || 1;
  const { sort } = await searchParams 
  const { rooms, count, ITEM_PER_PAGE } = await getRoom(query, page, sort);
  const countPage = Math.ceil(parseFloat(count / ITEM_PER_PAGE)) || 1;
 

  return (
    <div className="p-4 bg-primary rounded-lg max-sm:p-2 h-full overflow-y-auto">
      <div className="flex justify-between items-center gap-4">
        <div>
          <SearchComponent
            placeHolder="Search for product..."
            linkPage="/dashboard/rooms"
          />
        </div>
        <Link
          href="/dashboard/rooms/add"
          className="bg-blue-500 text-secondarytext px-2 py-1 text-center rounded-md hover:bg-blue-900 text-sm"
        >
          Add new
        </Link>
      </div>
      <RoomGrid
      ITEM_PER_PAGE={ITEM_PER_PAGE}
      currentPage={page || 1}
      count={count}
      session={session}
      data={JSON.parse(JSON.stringify(rooms))} 
      pageName="admin/rooms"/>

      {/* Pagination Buttons */}
      <Pagination 
      totalPages={countPage} 
      pathname={pathname}
      currentPage={page} query={query} />
    </div>
  );
};

export default roomPage;
