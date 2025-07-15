"use client";
import { BiCloset, BiTrash } from "react-icons/bi";
import { useState } from "react";
import Image from "next/image";
import { set } from "mongoose";
import { BsEye, BsViewStacked } from "react-icons/bs";
import { CgClose } from "react-icons/cg";
import { RiStairsLine } from "react-icons/ri";
import { FaStairs } from "react-icons/fa6";
export default function RoomSingleView({ room }) {
  // State for description text area
  const [description, setDescription] = useState(room?.description || "");
  const [image, setImage] = useState("");

  const [formData, setFormData] = useState({
    roomName: room?.roomName || "", // Changed from brandName/c
    category: room?.category || "",
    floor: room?.floor || "",
    capacity: room?.capacity || "",
    description: description,
    parentCategory: room?.parentCategory || "",
    price: room?.price || "", // e.g. rent price
    status: room?.status ? 1 : 0, // 1 = available, 0 = unavailable
    imageUrls: room?.imageUrls || [],
    properties: room?.properties || [], // Extra features or amenities
  });

  function viewImage(image) {
    setImage(image);
  }

  return (
    <div className="mt-4 rounded-lg text-black relative">
      <div>
        <div className="flex max-lg:flex-wrap gap-4">
          <div className="w-full flex flex-col gap-4">
            <div className="grid gap-2 grid-cols-2">
              {room?.imageUrls && room?.imageUrls.length > 0 ? (
                formData?.imageUrls.map((image, index) => (
                  <div
                    className={`${
                      index === 0 ? "col-span-2" : ""
                    } overflow-hidden shadow-md relative aspect-square rounded-md bg-slate-500 group`}
                    key={index}
                  >
                    <Image
                      fill
                      alt={`Image ${index}`}
                      className="rounded-md object-cover transition-opacity duration-300 group-hover:opacity-25"
                      src={`${image}`}
                    />
                    <button
                      type="button"
                      onClick={() => viewImage(image)}
                      className="flex justify-center items-center absolute top-1/2 left-1/2  text-slate-200
               opacity-0 group-hover:opacity-100 transition-opacity duration-300 
               transform -translate-x-1/2 -translate-y-1/2 "
                    >
                      <BsEye
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
                ></div>
              )}
            </div>
            <p className="text-md text-slate-500">Room images.</p>
          </div>

          {image && (
            <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
              <div className="w-full max-w-full h-[80vh]">
                <Image
                  src={image}
                  alt="Image view"
                  fill
                  className="object-contain rounded-md relative w-full"
                />
                <button
                  title="Close"
                  onClick={() => setImage("")}
                  className="absolute top-10 right-6 bg-white/80 hover:bg-white text-black rounded-full p-2 shadow"
                >
                  <CgClose size={24} />
                </button>
              </div>
            </div>
          )}

          <div className="space-y-4 w-full bg-primary rounded-lg">
            <div className="space-y-4 w-full p-4 bg-primary rounded-lg">
              <h1 className="font-bold text-lg">Room number: {formData?.roomName}</h1>
              <div className="space-y-4">
                <div className="flex justify-between gap-4">

                  <div className="w-full flex gap-2 items-center">
                    <label className="block font-medium"><FaStairs /></label>
                    <p className="">{formData?.floor}</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-full">
                    <label className="mb-2 block font-medium">
                      Category (Room Type)
                    </label>
                    <p className="p-2 border rounded-md">
                      {formData?.category.category}
                    </p>
                  </div>
                  <div className="w-full">
                    <label className="mb-2 block font-medium">Capacity</label>
                    <p className="p-2 border rounded-md">
                      {formData?.capacity}
                    </p>
                  </div>
                  <div className="w-full">
                    <label className="mb-2 block font-medium">
                      Price/month
                    </label>
                    <p className="p-2 border rounded-md">{formData?.price}</p>
                  </div>
                </div>
              </div>

              <div>
                <label className="block font-medium">Description</label>
                <p className="p-2 border rounded-md">{description}</p>
              </div>

              <div className="bg-primary w-full rounded-lg border p-4 border-secondary">
                <h1 className="text-lg font-bold mb-2">Product Properties</h1>
                <span className="xs italic">*Note: Room properties</span>

                <div className="flex flex-wrap gap-4 mt-2">
                  {formData?.properties.map((item) => (
                    <div
                      key={item.value}
                      className="flex gap-2 border p-2 rounded-md"
                    >
                      <h1 className="font-bold">{item.part}:</h1>
                      <p>{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
