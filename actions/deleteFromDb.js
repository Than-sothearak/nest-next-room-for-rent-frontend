"use server";

import { Category } from "@/models/Category";
import { Product } from "@/models/Product";
import { User } from "@/models/User";
import { mongoDb } from "@/utils/connectDB";
import { deleteFileFromS3 } from "@/utils/uploadImageFileToS3";
import { revalidatePath } from "next/cache";

export async function deleteById(id) {
  await mongoDb();

  try {
    if (!id) {
      return { error: "ID is required" };
    }

    const [user, category, product] = await Promise.all([
      User.findById(id),
      Category.findById(id),
      Product.findById(id),
    ]);

    if (user) {
      let userImage = user?.imageUrl;
      const oldKey = userImage?.split("/").pop();
      if (oldKey) {
        await deleteFileFromS3(oldKey);
      }
      await User.deleteOne({ _id: id });

      revalidatePath("/dashboard/users");
      return { success: "User deleted successfully" };
    }

    if (category) {
      await Category.deleteOne({ _id: id });
      revalidatePath("/dashboard/categories");
      return { success: "Category deleted successfully" };
    }

    if (product) {
      let productImages = product.imageUrls
    
      if (productImages && productImages.length > 0) {
        for ( const image of productImages) {
           const oldKey = image.split("/").pop()
           if (oldKey) {
            await deleteFileFromS3(oldKey)
          
           }
        }
      }
      await Product.deleteOne({ _id: id });
      revalidatePath("/dashboard/products");
      return { success: "Product deleted successfully" };
    }
  } catch (err) {
    console.error("Error deleting...:", err);
    return { error: "Failed to delete user due to a server error" };
  }
}
