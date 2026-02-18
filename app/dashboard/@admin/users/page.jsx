import SearchComponent from "@/components/SearchComponent";
import Link from "next/link";
import React from "react";
import { getUsers } from "@/actions/users";
import TableComponent from "@/components/(users)/TableComponent";
import Pagination from "@/components/Pagination";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const UserPage = async ({ searchParams }) => {

  const session = await getServerSession(authOptions);

  if (!session?.user) {

    redirect("/login");
  
  }

  const query = searchParams?.query || "";
  const page = parseInt(searchParams?.page) || 1;
  const limit = parseInt(searchParams?.limit) || 10;

  const { users, countPage, totalItems } = await getUsers(query, page, limit);

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
  ];

  return (
    <div className="p-4 justify-center bg-primary rounded-lg">
      <div className="flex justify-between items-center gap-4">
        <SearchComponent placeHolder="Search for product..." linkPage="/dashboard/users" />
        <Link
          href="/dashboard/users/add"
          className="bg-blue-500 px-2 py-1 text-center rounded-md hover:bg-blue-900 text-sm text-secondarytext"
        >
          Add new
        </Link>
      </div>

      {/* Users Table */}
      <TableComponent
        currentPage={page}
        itemPerPage={countPage}
        data={users}
        totalItems={totalItems}
        pageName="users"
        columns={userColumns}
      />

      {/* Pagination Buttons */}
      <Pagination pathname={"users"} totalPages={countPage} currentPage={page} query={query} />
    </div>
  );
};

export default UserPage;
