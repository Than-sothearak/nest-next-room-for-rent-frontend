import { getCategories } from "@/actions/categories";
import CategoryForm from "@/components/CategoryForm";

export default async function addCategory() {
  const fecthCategories = await getCategories();
  const categories = JSON.parse(JSON.stringify(fecthCategories))
  return (
    <div className="p-4 bg-primary mt-4 rounded-lg">
      <CategoryForm categories={categories} />
    </div>
  );
}