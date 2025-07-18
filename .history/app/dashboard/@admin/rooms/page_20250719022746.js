import { getRoom } from "@/actions/rooms";
import { auth } from "@/auth";
import Pagination from "@/components/Pagination";
import { RoomGrid } from "@/components/RoomGrid";
import SearchComponent from "@/components/SearchComponent";
import Link from "next/link";

const roomPage = async ({ searchParams }) => {
  const session = await auth();
  const { query } = await searchParams;

  const pathname = "room"
  const { page } = (await searchParams) || 1;
  const { sort } = await searchParams 
  const {sortDirection }= await searchParams || "descending";
  const { rooms, count, ITEM_PER_PAGE } = await getRoom(query, page, sort, sortDirection);
  const countPage = Math.ceil(parseFloat(count / ITEM_PER_PAGE)) || 1;
 
  const productColumns = [
    
    { header: "Room Number", accessor: "roomName" },
    { header: "Category", accessor: "category" },
    { header: "Floor", accessor: "floor" },
     { header: "Price", accessor: "price" },
      { header: "Status", accessor: "status" },
    { header: "Created At", accessor: "createdAt" },
  ];

  return (
    <div className="p-4 bg-primary mt-4 rounded-lg max-sm:p-2">
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
