import { getProduct } from "@/actions/rooms";
import { auth } from "@/auth";
import PosCard from "@/components/PosCard";


const posPage = async ({searchParams}) => {
  const session = await auth();

    const { query } = await searchParams;
  
    const { page } = (await searchParams) || 1;
    const { products, count } = await getProduct(query, page);
    const ITEM_PER_PAGE = 20;
    const countPage = Math.ceil(parseFloat(count / ITEM_PER_PAGE)) || 1;



  return (
    <div className="flex gap-2 max-sm:flex-col">
   <PosCard products={JSON.parse(JSON.stringify(products))} />
    </div>
  );
};

export default posPage;
