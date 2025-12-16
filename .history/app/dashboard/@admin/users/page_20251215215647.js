import SearchComponent from "@/components/SearchComponent";
import Link from "next/link";
import React from "react";
import { getUsers } from "@/actions/users";
import TableComponent from "@/components/TableComponent";
import { auth } from "@/auth";
import Pagination from "@/components/Pagination";

const userPage = async ({ searchParams }) => {
  const session = await auth();
    if (!session || !session.user?.isAdmin) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-2xl font-bold">Unauthorized</h1>
      </div>
    );
  }
  const { query } = await searchParams;
  
  const {page} = await searchParams || 1;
  const {users, count} = await getUsers(query, page);
  const ITEM_PER_PAGE = 10
  const countPage = Math.ceil(parseFloat(count/ITEM_PER_PAGE)) || 1;
  
  
  const userColumns = [
   
    { header: "Username", accessor: "username" },
    { header: "Email", accessor: "email" },
    { header: "Status", accessor: "status" },
    { header: "Role", accessor: "isAdmin" },
    { header: "Ip", accessor: "lastIP" },
     { header: "Location", accessor: "location" },
    { header: "Device", accessor: "deviceModel" },
    { header: "Active", accessor: "lastLogin" },
    { header: "Created At", accessor: "createdAt" },
  ,
  ];


  return (
    <div className="p-4 justify-center bg-primary rounded-lg">
      <div className="flex justify-between items-center gap-4">
        <div>
         
          <SearchComponent
            placeHolder="Search for product..."
            linkPage="/dashboard/users"
          />
        </div>
        <Link
          href="/dashboard/users/add"
          className="bg-blue-500 px-2 py-1 text-center rounded-md hover:bg-blue-900 text-sm text-secondarytext"
        >
          Add new
        </Link>
      </div>
      

      {/* Users Table */}
  <TableComponent 
  currentPage={page || 1}
  itemPerPage={ITEM_PER_PAGE}
  data={JSON.parse(JSON.stringify(users))} pageName="users" columns={userColumns} session={session} />

      {/* Pagination Buttons */}
      <Pagination 
      pathname={"users"}
      totalPages={countPage} currentPage={page} query={query} />
    </div>
  );
};

export default userPage;
