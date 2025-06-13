import { getOrders } from "@/actions/orders";
import OrderHistory from "@/components/OrderHistory";
import Pagination from "@/components/Pagination";

const OrderPage = async ({ searchParams }) => {
  const { query } = await searchParams;
  const { page } = (await searchParams) || 1;
  const {sortKey} = (await searchParams) || "date";
  const {sortDirection }= await searchParams || "descending";
  const { orders, count } = await getOrders(
    query,
    page,
    sortKey,
    sortDirection
  );
  const ITEM_PER_PAGE = 20;
  const countPage = Math.ceil(parseFloat(count / ITEM_PER_PAGE)) || 1;
  
  return (
    <div className="p-4 bg-primary mt-4 rounded-lg w-full">
      <h1 className="text-2xl font-bold mb-4">Order History</h1>
      <OrderHistory
        orders={JSON.parse(JSON.stringify(orders))}
        currentPage={page ||1}
        itemPerPage={ITEM_PER_PAGE}
        sortKey={sortKey}
        sortDirection={sortDirection}
        pathname={"orders"}
        totalPages={countPage}
        query={query}
      />
      {/* Pagination Buttons */}
      <Pagination
        pathname={"orders"}
        totalPages={countPage}
        currentPage={page}
        query={query}
      />
    </div>
  );
};

export default OrderPage;
