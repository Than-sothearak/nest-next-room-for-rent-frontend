"use client";
import { addCategory, updateCategory } from "@/actions/categories";
import { useActionState, useState } from "react";
import AddPropertyForm from "./AddPropertyForm";

const CategoryForm = ({ catData, catId, categories }) => {


  const [formData, setFormData] = useState({
    category: catData?.category || "",
    parentCategory: catData?.parentCategory || "",
    properties: catData?.properties || [],
  });

  const updateCategoryWithId = updateCategory.bind(null, catData?._id);

  const [state, action, isPending] = useActionState(
    catId ? updateCategoryWithId : addCategory,
    undefined,
    catId
  );


  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };


  return (
    <form action={action} className="space-y-2 text-sm">
      <div className="grid gap-4">
        <div>
          <div className="flex gap-4">
            <div className="w-full flex flex-col gap-2">
              <label className="block font-bold">Category</label>
              <div className="flex flex-col">
              <input
                placeholder="Enter category (e.g., Desktop)"
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full p-2 rounded-md bg-secondary border-none text-xs focus:ring-0 focus:outline-none"
              />
              {state?.errors?.category && (
                <p className="text-red-500 mt-1 ml-2">{state.errors.category}</p>
              )}
              </div>
            </div>
            <div className="w-full flex flex-col gap-2">
              <label className="block font-bold">Parent Category</label>
              <select
                name="parentCategory"
                value={formData.parentCategory}
                onChange={handleChange}
                className="w-full p-2 rounded-md bg-secondary border-none text-xs focus:ring-0 focus:outline-none"
              >
                <option value="">Select a parent category</option>
                {categories?.map(item => 
                     <option key={item._id} value={item._id}>{item.category}</option>
                )}
               
                <option value="Computer">Computer</option>
                <option value="Smartphone">Smartphone</option>
              </select>
            </div>
          </div>
        </div>

     <AddPropertyForm formData={formData} setFormData={setFormData}/>
      </div>
      <button
        type="submit"
        disabled={isPending}
        className={`text-secondarytext p-2 bg-blue-600 w-full mt-6 hover:bg-blue-500 hover:text-slate-200 rounded-md ${
          isPending ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {isPending ? (catId ? "Updating..." : "Adding...") : catId ? "Update" : "Add"}
      </button>

      {state?.success && (
        <p className="text-green-400 text-sm mt-4 text-center">
          Category {catId ? "updated" : "added"} successfully!
        </p>
      )}
    </form>
  );
};

export default CategoryForm;
