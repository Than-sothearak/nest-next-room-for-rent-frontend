import { getCategories } from "@/actions/categories";
import { auth } from "@/auth";
import SearchCompoenent from "@/components/SearchComponent";
import TableCategory from "@/components/TableCategory";
import Link from "next/link";

export default async function categoryPage ({ searchParams }) {
    const session = await auth()
  
  const { query } = await searchParams;
  const fecthCategories = await getCategories(query);
  const categories = JSON.parse(JSON.stringify(fecthCategories));
  
  const categoryColumns = [
    { header: "No", accessor: "_id" },
    { header: "Category", accessor: "category" },
    { header: "Parent", accessor: "parentCategory" },
    { header: "Created At", accessor: "createdAt" },
  ];

    return <div className="overflow-x-auto p-4 bg-primary mt-4 rounded-lg">
    <div className="flex justify-between items-center gap-4">
    <div> <SearchCompoenent placeHolder="Search for category..." linkPage="/dashboard/categories"/></div>
    <Link href="/dashboard/categories/add" className="bg-blue-500 px-2 py-1 rounded-md hover:bg-blue-900 text-sm text-center text-secondarytext">Add new</Link>
    </div>
    
    <TableCategory
    session={session}
        data={categories}
        pageName="categories"
        columns={categoryColumns}
      />

    <div className="flex justify-between text-secondarytext">
      <button className="text-sm bg-slate-500 px-2 py-1 rounded-md hover:bg-secondary">Previus</button>

      <button className="text-sm bg-slate-500 px-2 py-1 rounded-md hover:bg-secondary">Next</button>
    </div>
  </div>
}