"use client";
import { BiCheck, BiTrash } from "react-icons/bi";
import ChooseImageFile from "./ChooseImageFile";
import { useActionState, useEffect, useState } from "react";
import ProductPropertyForm from "./ProductPropertyForm"; // You can rename this later if desired
import { addRoom, updateRoom } from "@/actions/rooms"; // Adjust import paths & function names accordingly
import Image from "next/image";
import { MdSmsFailed } from "react-icons/md";

export default function RoomForm({
  categories,      // e.g. Room Types, Buildings
  roomId,
  parentCategory,
  room,
}) {
  // State for description text area
  const [description, setDescription] = useState(room?.description || "");

  // Form state initialization with room properties
  const [formData, setFormData] = useState({
    roomName: room?.roomName || "",            // Changed from brandName/productName
    category: room?.category || "",
    description: description,
    parentCategory: room?.parentCategory || "",
    capacity: room?.capacity || "",            // Instead of stock, number of people room can hold
    price: room?.price || "",                  // e.g. rent price
    status: room?.status ? 0 : 1,              // 1 = available, 0 = unavailable
    imageUrls: room?.imageUrls || [],
    properties: room?.properties || [],       // Extra features or amenities
  });

  const [currentProperties, setCurrentProperties] = useState([]);
  const [files, setFiles] = useState([] || null);

  // Remove variants block since rooms usually don’t have variants like products
  // If you want features or amenities you can use properties instead

  const handleRemoveImage = (index) => {
    setFormData((prevFormData) => {
      const removedImage = prevFormData.imageUrls[index];

      return {
        ...prevFormData,
        imageUrls: prevFormData.imageUrls.filter((_, i) => i !== index),
        removedImages: [...(prevFormData.removedImages || []), removedImage],
      };
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "status" ? Number(value) : value,
    });
  };

  const handleCategoryChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    const categoryId = e.target.value;
    setCurrentProperties(
      categories.find((category) => category._id === categoryId)?.properties
    );
  };

  const updateRoomWithId = updateRoom.bind(null, roomId);
  const [state, action, isPending] = useActionState(
    roomId ? updateRoomWithId : addRoom,
    undefined
  );

  useEffect(() => {
    setFormData({
      ...formData,
      imageUrls: room?.imageUrls || [],
    });
  }, [room]);

  useEffect(() => {
    if (state?.errors || state?.success) {
      setFiles([]);
    }
  }, [state]);

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
                    <label className="mb-2 block font-medium">Category (Room Type)</label>
                    <select
                      name="category"
                      value={formData?.category}
                      onChange={handleCategoryChange}
                      className="w-full p-2 rounded-md bg-secondary border-none text-xs focus:ring-0 focus:outline-none"
                    >
                      {room?.category && (
                        <option value={room?.category._id}>
                          {formData?.category.category}
                        </option>
                      )}
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
                    setFormData({
                      ...formData,
                      description: e.target.value,
                    });
                  }}
                  placeholder="Write a room description"
                  className="mt-2 w-full p-2 rounded-md bg-secondary border-none border-white text-xs focus:ring-0 focus:outline-none"
                  rows="4"
                ></textarea>
              </div>

              <ProductPropertyForm
                setCurrentProperties={setCurrentProperties}
                categoryProperties={currentProperties}
                productProperties={formData?.properties}
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