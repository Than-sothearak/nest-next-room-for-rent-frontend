"use client";
import { BiTrash } from "react-icons/bi";
import ChooseImageFile from "./ChooseImageFile";
import { useActionState, useEffect, useState } from "react";
import ProductPropertyForm from "./ProductPropertyForm"; // You can rename this later if desired
import { addRoom, updateRoom } from "@/actions/rooms"; // Adjust import paths & function names accordingly
import Image from "next/image";
import { MdSmsFailed } from "react-icons/md";

export default function RoomForm({
  categories, // e.g. Room Types
  roomId,
  parentCategory, // This is your list of parent categories (e.g., Buildings)
  room,
}) {
  // State for description text area
  const [description, setDescription] = useState(room?.description || "");

  // Form state initialization with room properties
  const [formData, setFormData] = useState({
    roomName: room?.roomName || "", // Changed from brandName/productName
    category: room?.category?._id || "", // Ensure it's the ID if category is an object
    description: description,
    parentCategory: room?.parentCategory?._id || "", // Ensure it's the ID
    capacity: room?.capacity || "", // Instead of stock, number of people room can hold
    price: room?.price || "", // e.g. rent price
    status: room?.status !== undefined ? room.status : 1, // 1 = available, 0 = unavailable
    imageUrls: room?.imageUrls || [],
    properties: room?.properties || [], // Extra features or amenities
  });

  // currentProperties should hold properties relevant to the selected 'category' (room type)
  // not parentCategory. If parentCategory defines properties, you'd need another state.
  const [categorySpecificProperties, setCategorySpecificProperties] = useState([]);


  const [files, setFiles] = useState([]); // Initialize with empty array, not null

  // Initialize category-specific properties when room data is loaded or categories change
  useEffect(() => {
    if (room?.category?._id && categories.length > 0) {
      const initialCategory = categories.find(
        (cat) => cat._id === room.category._id
      );
      if (initialCategory) {
        setCategorySpecificProperties(initialCategory.properties || []);
      }
    }
  }, [room, categories]);


  const handleRemoveImage = (index) => {
    setFormData((prevFormData) => {
      const removedImage = prevFormData.imageUrls[index]; // Keep track of removed images if needed for deletion on backend

      return {
        ...prevFormData,
        imageUrls: prevFormData.imageUrls.filter((_, i) => i !== index),
        // Add removedImages to formData if you plan to send them to the backend for deletion
        removedImages: [...(prevFormData.removedImages || []), removedImage],
      };
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "status" ? Number(value) : value,
    }));
  };

  // Modified handleCategoryChange to handle both 'category' and 'parentCategory'
  const handleSelectChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // If the changed field is 'category' (Room Type), update categorySpecificProperties
    if (name === "category") {
      const selectedCategory = categories.find(
        (category) => category._id === value
      );
      setCategorySpecificProperties(selectedCategory?.properties || []);
    }
    // If the changed field is 'parentCategory' (Building), you might want to
    // update something else, or if parentCategory has properties, add a separate state for them.
    // For now, it just updates formData.
  };

  // Function to handle changes in properties coming from ProductPropertyForm
  const handlePropertiesChange = (updatedProperties) => {
    setFormData((prev) => ({
      ...prev,
      properties: updatedProperties,
    }));
  };


  const updateRoomWithId = updateRoom.bind(null, roomId);
  const [state, action, isPending] = useActionState(
    roomId ? updateRoomWithId : addRoom,
    undefined
  );

  useEffect(() => {
    // This useEffect is likely for handling successful form submission or errors
    // and resetting files. The formData initialization is done directly on useState.
    if (state?.errors || state?.success) {
      setFiles([]);
    }
  }, [state]);

  console.log("Parent Category Prop:", parentCategory); // Debugging parentCategory prop
  console.log("Form Data Category:", formData.category); // Debugging formData.category
  console.log("Form Data Parent Category:", formData.parentCategory); // Debugging formData.parentCategory
  console.log("Category Specific Properties:", categorySpecificProperties); // Debugging category-specific properties

  return (
    <div className="mt-4 rounded-lg text-black relative">
      <form action={action} className="text-sm">
        <div className="flex max-lg:flex-wrap gap-4">
          <div className="space-y-4 w-full bg-primary rounded-lg">
            {state?.success && (
              <div className="text-sm flex items-center gap-2 p-2 justify-center text-center rounded-t-md bg-green-500 text-primary">
                <MdSmsFailed size={20} /> {state?.message}
              </div>
            )}
            {state?.errors && (
              <div className="text-sm flex items-center gap-2 p-2 justify-center text-center rounded-t-md bg-red-500 text-primary">
                <MdSmsFailed size={20} /> Failed to add room!
              </div>
            )}
            <div className="space-y-4 w-full p-4 bg-primary rounded-lg">
              <h1 className="font-bold text-lg">Basic Information</h1>
              <div className="space-y-4">
                <div>
                  <label className="block font-medium">Room Name/Number</label>
                  <input
                    defaultValue={formData?.roomName}
                    onChange={handleChange}
                    type="text"
                    name="roomName"
                    placeholder="Enter room name or number..."
                    className="w-full p-2 rounded-md mt-2 bg-secondary border-none border-white text-xs focus:ring-0 focus:outline-none"
                  />
                  {state?.errors?.roomName && (
                    <p className="text-red-500 mt-2">{state.errors.roomName}</p>
                  )}
                </div>
                <div className="flex gap-4">
                  <div className="w-full">
                    <label className="mb-2 block font-medium">
                      Category (Room Type)
                    </label>
                    <select
                      name="category"
                      value={formData?.category}
                      onChange={handleSelectChange} // Use the generic select handler
                      className="w-full p-2 rounded-md bg-secondary border-none text-xs focus:ring-0 focus:outline-none"
                    >
                      <option value="">Select a category</option>
                      {categories?.map((category) => (
                        <option key={category._id} value={category._id}>
                          {category.category}
                        </option>
                      ))}
                    </select>
                    {state?.errors?.category && (
                      <p className="text-red-500 mt-2">{state.errors.category}</p>
                    )}
                  </div>

                  <div>
                    <label className="block font-medium">Price (per night)</label>
                    <input
                      name="price"
                      onChange={handleChange}
                      placeholder="Enter price"
                      type="number"
                      defaultValue={formData?.price}
                      className="w-full p-2 rounded-md mt-2 bg-secondary border-none border-white text-xs focus:ring-0 focus:outline-none"
                    />
                    {state?.errors?.price && (
                      <p className="text-red-500 mt-2">{state.errors.price}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block font-medium">Capacity</label>
                  <input
                    onChange={handleChange}
                    defaultValue={formData?.capacity}
                    placeholder="Enter capacity (e.g., number of guests)"
                    name="capacity"
                    type="number"
                    className="mt-2 w-full p-2 rounded-md bg-secondary border-none border-white text-xs focus:ring-0 focus:outline-none"
                  />
                  {state?.errors?.capacity && (
                    <p className="text-red-500 mt-2">{state.errors.capacity}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block font-medium">Description</label>
                <textarea
                  name="description"
                  type="text"
                  defaultValue={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                    setFormData((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }));
                  }}
                  placeholder="Write a room description"
                  className="mt-2 w-full p-2 rounded-md bg-secondary border-none border-white text-xs focus:ring-0 focus:outline-none"
                  rows="4"
                ></textarea>
              </div>

              {/* Parent Category Selection */}
              <div className="space-y-4 w-full bg-primary rounded-lg">
                <h1 className="text-lg font-bold">Parent Category (Building)</h1>
              </div>
              <select
                className=" w-full p-2 rounded-md bg-secondary border-none border-white text-xs focus:ring-0 focus:outline-none"
                name="parentCategory"
                value={formData?.parentCategory} // Ensure this is just the ID
                onChange={handleSelectChange} // Use the generic select handler
              >
                <option value="">Select a parent category (Building)</option>
                {parentCategory?.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.category}
                  </option>
                ))}
              </select>

              <p className="text-xs text-slate-500">
                Select a category that will be the parent of the current one (e.g., a Building).
              </p>
              {state?.errors?.parentCategory && (
                <p className="text-red-500 mt-2">{state.errors.parentCategory}</p>
              )}

              {/* ProductPropertyForm to display properties based on selected CATEGORY */}
              <ProductPropertyForm
                categoryProperties={categorySpecificProperties} // Pass properties from the selected 'category'
                productProperties={formData?.properties} // Pass current room properties
                onPropertiesChange={handlePropertiesChange} // Callback to update formData.properties
              />

              <ChooseImageFile files={files} setFiles={setFiles} />
            </div>
          </div>
          <div className="w-1/2 max-lg:w-full flex flex-col gap-4">
            <div className="bg-primary p-4 w-full flex flex-col gap-4 rounded-lg">
              <div className="space-y-4 w-full bg-primary rounded-lg">
                <h1 className="text-lg font-bold">Visibility</h1>
              </div>
              <div className="flex gap-4 items-center">
                <div className="flex gap-1 items-center">
                  <input
                    type="radio"
                    id="available"
                    name="status"
                    value={1}
                    checked={formData?.status === 1}
                    onChange={handleChange}
                  />
                  <label>Available</label>
                </div>
                <div className="flex items-center">
                  <input
                    onChange={handleChange}
                    checked={formData?.status === 0}
                    type="radio"
                    id="unavailable"
                    name="status"
                    value={0}
                  />
                  <label>Unavailable</label>
                </div>
              </div>
              <p className="text-xs text-slate-500">
                The room will be affected by the visibility choice.
              </p>
            </div>

            <div className="bg-primary p-4 w-full flex flex-col gap-4 rounded-lg">
              <div className="space-y-4 w-full bg-primary rounded-lg">
                <h1 className="text-lg font-bold">Room Images</h1>
                <div className="flex gap-4 flex-wrap">
                  {formData.imageUrls?.map((image, i) => (
                    <div
                      key={i}
                      className="relative overflow-hidden rounded-lg w-[200px] aspect-video"
                    >
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          handleRemoveImage(i);
                        }}
                        className="absolute top-2 right-2 rounded-lg bg-primary border border-red-600 hover:bg-red-600 p-1 text-red-600 hover:text-white transition-colors z-10"
                      >
                        <BiTrash />
                      </button>
                      <Image
                        src={image}
                        alt="room image"
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <button
          disabled={isPending}
          type="submit"
          className="bg-primary hover:bg-primary/70 transition-colors px-6 py-2 rounded-md mt-4 text-white text-sm"
        >
          {isPending ? "Saving..." : "Save Room"}
        </button>
      </form>
    </div>
  );
}