"use server";

import { Category } from "@/models/Category";
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { auth } from "@/auth";

export async function getCategories (query) {

    const session = await auth();
    if (!session?.user?.isAdmin) {
      return console.log("Access denied! you are not admin");
    }
  
  await new Promise((resolve) => setTimeout(resolve, 500));
  try {
    if (query) {
      return await Category.find({
        $or: [{ category: { $regex: query, $options: "i" } }],
      });
    }
     return await Category.find().sort({ createdAt: -1 })
    
  } catch (err) {
    console.error("Error fetching categories:", err);
    return { error: "Failed to fetch due to a server error" };
  }
}

export async function getSingleCategory (catId) { 
    const session = await auth();
    if (!session?.user?.isAdmin) {
      return console.log("Access denied! you are not admin");
    }
  
  try {
    if (!catId) {
      return { error: "No category ID provided" };
    }
    const category = await Category.findById(catId);
    return category;
}
catch (err) {
    console.error("Error fetching category:", err);
    return { error: "Failed to fetch due to a server error" };
  }
}

export async function addCategory(prevState, formData) {

     const session = await auth();
    if (!session?.user?.isAdmin) {
      return console.log("Access denied! you are not admin");
    }
  

  if (!formData || typeof formData.get !== "function") {
    console.error("Invalid or missing formData:", formData);
    return { error: "No valid form data received" };
  }


  const parsedData = parseFormData(formData);
  const category = parsedData.category;
  let errors = {};

  const existingCatByName = await Category.findOne({ category: formData.get('category') });
  if (existingCatByName) {
    errors.category = "This category is already have";
    return { errors };
  }
  
  if (!category) {
    if (!category) errors.category = "Category is required";
    return { errors };
  }

  try {
    await Category.create(parsedData);

  } catch (err) {
    console.error("Error saving category:", err);
    return { error: "Failed to save due to a server error" };
  }

   revalidatePath(`/dashboard/admin/categories/`);
    redirect("/dashboard/admin/categories/");
}

export async function updateCategory(catId, prevState, formData) {
  await new Promise((resolve) => setTimeout(resolve, 500));
     const session = await auth();
    if (!session?.user?.isAdmin) {
      return console.log("Access denied! you are not admin");
    }
  try {
    const parsedData = parseFormData(formData);

    const category = await Category.findById(catId);

    if (!category) {
      return { error: "Category not found" };
    }

    console.log(formData)
    // await Category.updateOne({ _id: catId }, parsedData);

  } catch (err) {
    console.error("Error updating category:", err);
    return { error: "Failed to update category due to a server error" };
  }

  revalidatePath(`/dashboard/categories/${catId}`);
}

// Helper function to parse FormData
function parseFormData(formData) {
  const result = {
    category: "",
    parentCategory: null,
    properties: [],
  };

  let currentPart = null;

  for (const [name, value] of formData.entries()) {
    if (name === "category") {
      result.category = value;
    } else if (name === "parentCategory") {
      result.parentCategory = value || null;
    } else if (name === "part") {
      currentPart = { part: value, values: [] };
      result.properties.push(currentPart);
    } else if (name === "values" && currentPart) {
      const splitValues = value.split(";");
      currentPart.values = [...currentPart.values, ...splitValues];
    }
  }

  return result;
}
