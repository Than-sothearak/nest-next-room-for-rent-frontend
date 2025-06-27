"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const Pagination = ({ pathname, totalPages, currentPage, query }) => {
    const searchParams = useSearchParams()
    const sortKey = searchParams.get("sortKey");
    const sortDirection = searchParams.get("sortDirection");
  if (totalPages <= 1) return null;

  const pageNum = Math.ceil(Number(currentPage)) || 1;
  const getHref = (page) =>
    `/dashboard/${pathname}?page=${page}${query ? `&query=${query}` : ""}&sortKey=${sortKey || "createdAt"}&sortDirection=${sortDirection || "descending"}`;

  return (
    <div className="w-full flex justify-center items-center gap-2 mt-4">
      {/* Prev Button */}

      {pageNum > 1 ? (
        <Link
          href={getHref(pageNum - 1)}
          className={` bg-tertiary text-primary px-4 py-1 rounded-md hover:bg-tertiary hover:text-primary`}
        >
          Prev
        </Link>
      ) : (
        <div className="bg-secondary opacity-15 cursor-not-allowed px-4 py-1 rounded-md hover:bg-tertiary hover:text-primary">
          Prev
        </div>
      )}

      <div className="flex gap-2 overflow-auto max-w-full px-2">
        {/* Page Numbers */}
        {[...Array(totalPages)].map((_, i) => {
          const page = i + 1;
          return (
            <Link
              key={page}
              href={getHref(page)}
              className={`px-3 py-1 rounded-md ${
                page === pageNum
                  ? "bg-blue-700 text-white"
                  : "bg-secondary text-black hover:bg-gray-300"
              }`}
            >
              {page}
            </Link>
          );
        })}
      </div>

      {pageNum < totalPages ? (
        <Link
          href={getHref(pageNum + 1)}
          className={` bg-tertiary text-primary px-4 py-1 rounded-md hover:bg-tertiary hover:text-primary`}
        >
          Next
        </Link>
      ) : (
        <div className="bg-tertiary text-primary opacity-15 cursor-not-allowed px-4 py-1 rounded-md">
          Next
        </div>
      )}
    </div>
  );
};

export default Pagination;
