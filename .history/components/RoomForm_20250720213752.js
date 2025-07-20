"use client";
import { BiTrash } from "react-icons/bi";
import ChooseImageFile from "./ChooseImageFile";
import { useActionState, useEffect, useState } from "react";
import ProductPropertyForm from "./ProductPropertyForm"; // You can rename this later if desired
import { addRoom, updateRoom } from "@/actions/rooms"; // Adjust import paths & function names accordingly
import Image from "next/image";
import { TbAirConditioning } from "react-icons/tb";
import { GrHostMaintenance } from "react-icons/gr";
import {
  formatDate,
  getFormattedAgoText,

} from "@/utils/formatDate";
import toast, { Toaster } from "react-hot-toast";
import Link from "next/link";
import { IoArrowForward } from "react-icons/io5";

export default function RoomForm({
  categories, // e.g. Room Types, Buildings
  roomId,
  parentCategory,
  room,
}) {
  // State for description text area
  const [description, setDescription] = useState(room?.description || "");

  // Form state initialization with room properties
  const [formData, setFormData] = useState({
    roomName: room?.roomName || "", // Changed from brandName/c
    category: room?.category || "",
    airConditionerCleanDate: room?.airConditionerCleanDate || "",
    roomMaintenanceDate: room?.roomMaintenanceDate || "",
    floor: room?.floor || "",
    capacity: room?.capacity || "",
    description: description,
    parentCategory: room?.parentCategory || "",
    capacity: room?.capacity || "", // Instead of stock, number of people room can hold
    price: room?.price || "", // e.g. rent price
    status: room?.status ? 1 : 0, // 1 = available, 0 = unavailable
    imageUrls: room?.imageUrls || [],
    properties: room?.properties || [], // Extra features or amenities
  });

  const [currentProperties, setCurrentProperties] = useState([]);
  const [files, setFiles] = useState([] || null);

  // Remove variants block since rooms usually don’t have variants like products
  // If you want features or amenities you can use properties instead

  const handleRemoveImage = (index) => {
    setFormData((prevFormData) => {
      const removedImage = prevFormData.imageUrls[index]; // Get the removed image URL

      return {
        ...prevFormData,
        imageUrls: prevFormData.imageUrls.filter((_, i) => i !== index), // Remove from imageUrls
        removedImages: [...(prevFormData.removedImages || []), removedImage], // Store removed image properly
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
  };

  const handleParentCategoryChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    const selectedParent = parentCategory.find(
      (category) => category._id === value
    );
    setCurrentProperties(selectedParent?.properties || []);
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
      const notify = () => toast(state.message);
      notify();
      setFiles([]);
    }
  }, [state]);

  return (
    <div className="mt-4 rounded-lg text-black relative">
      <form action={action} className="te">
        <div className="flex max-lg:flex-wrap gap-4">
          <div className="space-y-4 w-full bg-primary rounded-lg">
            {state?.success && (
              // <div className="te flex items-center gap-2 p-2 justify-center text-center rounded-t-md bg-green-500 text-primary">
              //   <MdSmsFailed size={20} /> {state?.message}
              // </div>
              <Toaster
                position="top-center"
                reverseOrder={false}
                gutter={8}
                containerClassName=""
                containerStyle={{}}
                toastOptions={{
                  // Define default options
                  className: "",
                  duration: 5000,
                  removeDelay: 1000,
                  style: {
                    background: "oklch(79.2% 0.209 151.711)",
                    color: "#fff",
                  },
                }}
              />
            )}

            {state?.success && (
              <div>
                <div className="bg-black/50 w-full h-full fixed inset-0">

                </div>
                <div className="bg-primary border shadow-md flex items-center justify-center fixed px-10 py-4 top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 rounded-md">
                  <div className="flex gap-4 flex-col justify-center w-full">
                    <p className="w-full text-green-500 text-center">
                      {state?.message}
                    </p>
                    <div className="flex justify-between gap-2"><Link 
                    href="/dashboard/rooms" className="flex items-center gap-2 bg-blue-500 p-2 rounded-md text-primary w-full justify-center"><IoArrowForward />Go to Room page</Link>

                    </div>
                  </div>
                </div>
              </div>
            )}

            {state?.errors && (
              <Toaster
                position="top-center"
                reverseOrder={false}
                gutter={8}
                containerClassName=""
                containerStyle={{}}
                toastOptions={{
                  // Define default options
                  className: "",
                  duration: 5000,
                  removeDelay: 1000,
                  style: {
                    background: "oklch(70.4% 0.191 22.216)",
                    color: "#fff",
                  },
                }}
              />
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
                    className="w-full p-2 rounded-md mt-2 bg-secondary border-none border-white text-md focus:ring-0 focus:outline-none"
                  />
                  {state?.errors?.roomName && (
                    <p className="text-red-500 mt-2">{state.errors.roomName}</p>
                  )}
                </div>

                <div>
                  <label className="block font-medium">Floor number</label>
                  <input
                    defaultValue={formData?.floor}
                    onChange={handleChange}
                    type="text"
                    name="floor"
                    placeholder="Enter room name or number..."
                    className="w-full p-2 rounded-md mt-2 bg-secondary border-none border-white text-md focus:ring-0 focus:outline-none"
                  />
                  {state?.errors?.floor && (
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
                      onChange={handleCategoryChange}
                      className="w-full p-2 rounded-md bg-secondary border-none text-md focus:ring-0 focus:outline-none"
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
                      <p className="text-red-500 mt-2">
                        {state.errors.category}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block font-medium">Price/month</label>
                    <input
                      name="price"
                      onChange={handleChange}
                      placeholder="Enter price"
                      type="number"
                      defaultValue={formData?.price}
                      className="w-full p-2 rounded-md mt-2 bg-secondary border-none border-white text-md focus:ring-0 focus:outline-none"
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
                    className="mt-2 w-full p-2 rounded-md bg-secondary border-none border-white text-md focus:ring-0 focus:outline-none"
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
                  className="mt-2 w-full p-2 rounded-md bg-secondary border-none border-white text-md focus:ring-0 focus:outline-none"
                  rows="4"
                ></textarea>
              </div>

              <div className="flex flex-col gap-2">
                <div className="space-y-4 w-full bg-primary rounded-lg">
                  <h1 className="text-lg font-bold">Parent Category</h1>
                </div>
                <select
                  className=" w-full p-2 rounded-md bg-secondary border-none border-white text-md focus:ring-0 focus:outline-none"
                  name="parentCategory"
                  value={
                    formData?.parentCategory ? formData.parentCategory : ""
                  }
                  onChange={handleParentCategoryChange}
                >
                  {room?.parentCategory && (
                    <option value={room.parentCategory._id}>
                      {room?.parentCategory.category}
                    </option>
                  )}
                  <option value="">Select a category</option>
                  {parentCategory?.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.category}
                    </option>
                  ))}
                </select>

                <p className="text-md text-slate-500">
                  Select a category that will be the parent of the current one.
                </p>
                {state?.errors?.parentCategory && (
                  <p className="text-red-500 mt-2">
                    {state.errors.parentCategory}
                  </p>
                )}
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
            <div className="bg-primary p-4 w-full flex flex-col gap-2 rounded-lg">
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
                <div className="flex gap-1 items-center">
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
              <p className="text-md text-slate-500">
                The room will be affected by the visibility choice.
              </p>
            </div>

            <div className="bg-primary p-4 w-full flex flex-col gap-4 rounded-lg">
              <div className="flex flex-col gap-2">
                <div className="w-full bg-primary rounded-lg">
                  <h1 className="text-lg font-bold">Maintenance</h1>
                </div>
                <label className="font-medium flex gap-2 items-center">
                  <TbAirConditioning size={24} />
                  <span>Air conditioner last cleaned </span>
                  {room?.airConditionerCleanDate ? (
                    <span className="italic text-sm">
                      ({getFormattedAgoText(room?.airConditionerCleanDate)})
                    </span>
                  ) : (
                    <span className="italic text-sm">{`(N/a)`}</span>
                  )}
                </label>
                <input
                  onChange={handleChange}
                  defaultValue={formatDate(room?.airConditionerCleanDate)}
                  placeholder="Enter date)"
                  name="airConditionerCleanDate"
                  type="date"
                  className="w-full p-2 rounded-md bg-secondary border-none border-white text-md focus:ring-0 focus:outline-none"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-medium flex gap-2 items-center">
                  <GrHostMaintenance size={24} />
                  <span>Room maintenance date</span>
                  {room?.roomMaintenanceDate ? (
                    <span className="italic text-sm">
                      ({getFormattedAgoText(room?.roomMaintenanceDate)})
                    </span>
                  ) : (
                    <span className="italic text-sm">{`(N/a)`}</span>
                  )}
                </label>
                <input
                  onChange={handleChange}
                  defaultValue={formatDate(formData?.roomMaintenanceDate)}
                  placeholder="Enter date)"
                  name="roomMaintenanceDate"
                  type="date"
                  className="w-full p-2 rounded-md bg-secondary border-none border-white text-md focus:ring-0 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid gap-2 grid-cols-2">
              {formData?.removedImages &&
                formData.removedImages.map((item, index) => (
                  <input
                    key={index}
                    name="removeImages"
                    type="text"
                    defaultValue={item}
                    className="w-full p-2 rounded-md bg-secondary text-md focus:ring-0 focus:outline-none hidden"
                  />
                ))}
              {room?.imageUrls && room?.imageUrls.length > 0 ? (
                formData?.imageUrls.map((image, index) => (
                  <div
                    className={`${index === 0 ? "col-span-2" : ""
                      } overflow-hidden shadow-md relative aspect-square rounded-md bg-slate-500 group`}
                    key={index}
                  >
                    <Image
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      alt={`Image ${index}`}
                      className="rounded-md object-cover transition-opacity duration-300 group-hover:opacity-25"
                      src={`${image}`}
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(index)}
                      className="flex justify-center items-center absolute top-1/2 left-1/2  text-slate-200
               opacity-0 group-hover:opacity-100 transition-opacity duration-300 
               transform -translate-x-1/2 -translate-y-1/2 "
                    >
                      <BiTrash
                        className="duration-300 rounded-full p-2 w-9 h-9
               transform hover:scale-125 scale-100 bg-black opacity-50 hover:opacity-90 "
                        size={20}
                      />
                    </button>
                  </div>
                ))
              ) : (
                <div
                  className={`col-span-2 rounded-md w-full min-h-32 bg-slate-500 relative aspect-square`}
                >
                  <img
                    alt={`Image`}
                    className="opacity-20 rounded-md object-cover h-full w-full "
                    src={`https://www.freeiconspng.com/thumbs/no-image-icon/no-image-icon-6.png`}
                  />
                </div>
              )}
            </div>
            <p className="text-md text-slate-500">Product images.</p>
          </div>
        </div>

        <button
          type="submit"
          disabled={isPending}
          className={`p-2 bg-blue-600 text-secondarytext w-full mt-6 mb-10 hover:bg-blue-500 hover:text-slate-200 rounded-md ${isPending ? "opacity-50 cursor-not-allowed" : ""
            }`}
        >
          {isPending
            ? roomId
              ? "Updating..."
              : "Adding..."
            : roomId
              ? "Update"
              : "Add"}
        </button>
      </form>
    </div>
  );
}
