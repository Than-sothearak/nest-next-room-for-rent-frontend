import { mongoDb } from "@/utils/connectDB";
import ProductForm from "@/components/RoomForm";
import { Product } from "@/models/Product";
import mongoose from "mongoose";
import { getCategories } from "@/actions/categories";

export default async function singleProductPage(props) {
  await mongoDb();
  const params = await props.params;
  const id = await params.id;
  await new Promise((resolve) => setTimeout(resolve, 1000));

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return <p className="text-red-500">Invalid product ID!</p>;
  }
  const product = await Product.findOne({ _id: id })
    .lean()
    .populate("category")
    .populate("parentCategory")

  if (!product) {
    return <p className="text-red-500">Product not found!</p>;
  }

  const fecthCategories = await getCategories();
  const getCategory = JSON.parse(JSON.stringify(fecthCategories));
  const parentCategory = JSON.parse(
    JSON.stringify(
      fecthCategories.filter((category) => !category.parentCategory)
    )
  );

  return (
    <ProductForm
      categories={getCategory}
      parentCategory={parentCategory}
      product={JSON.parse(JSON.stringify(product))}
      productId={id}
    />
  );
}
