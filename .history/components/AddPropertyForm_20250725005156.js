"use client";
import React, { useState } from "react";
import { BiPlusCircle, BiTrash } from "react-icons/bi";
import { MdOutlineDoNotDisturb } from "react-icons/md";

const AddPropertyForm = ({ formData, setFormData }) => {
  const [isAddSpec, setIsAddSpec] = useState(false);

  const addPart = () => {
    setIsAddSpec(true);
    setFormData((prev) => ({
      ...prev,
      properties: [...(prev.properties || []), { service: "", price: "" }],
    }));
  };

  const handleRemovePart = (index) => {
    setFormData((prev) => ({
      ...prev,
      properties: prev.properties.filter((_, i) => i !== index),
    }));
  };

  const handleServiceChange = (index, value) => {
    const updated = [...formData.properties];
    updated[index].service = value;
    setFormData((prev) => ({ ...prev, properties: updated }));
  };

  const handlePriceChange = (index, value) => {
    const updated = [...formData.properties];
    updated[index].price = value;
    setFormData((prev) => ({ ...prev, properties: updated }));
  };

  const checkIsPropertyEmpty = formData?.properties?.reduce((acc, item, index) => {
    const isEmpty = !item?.service?.trim() || !item?.price?.trim();
    acc[index] = isEmpty;
    return acc;
  }, {});

  const anyPropertyEmpty = Object.values(checkIsPropertyEmpty || {}).some(Boolean);

  return (
    <div className="flex flex-col gap-2 border p-4 rounded-md bg-slate-100">
      <button
        type="button"
        className={`${
          anyPropertyEmpty
            ? "cursor-not-allowed bg-blue-200"
            : "hover:bg-blue-500 bg-blue-600"
        } w-36 p-2 text-secondarytext rounded-md flex items-center gap-2 text-base`}
        onClick={addPart}
        title="Click to add more property"
        disabled={anyPropertyEmpty}
      >
        {!anyPropertyEmpty ? <BiPlusCircle /> : <MdOutlineDoNotDisturb />}
        Add Service
      </button>

      <p className="text-xs italic">Note: Enter a service name and a price.</p>

      <div className="grid grid-cols-3 max-2xl:grid-cols-2 gap-4 max-lg:grid-cols-1">
        {formData?.properties?.length > 0 &&
          formData.properties.map((part, index) => (
            <div
              key={index}
              className="bg-primary p-2 rounded-md relative text-md"
            >
              <div className="w-full flex gap-2 max-md:flex-wrap">
                <div className="w-full">
                  <label className="block font-medium">Service {index + 1}</label>
                  <input
                    type="text"
                    placeholder="e.g., Cleaning"
                    value={part.service}
                    onChange={(e) => handleServiceChange(index, e.target.value)}
                    className="w-full p-2 rounded-md border font-bold mt-2"
                  />
                </div>
              </div>

              <div className="mt-4 flex items-center gap-2">
                <label className="font-medium">Price:</label>
                <input
                  type="text"
                  value={part.price}
                  onChange={(e) => handlePriceChange(index, e.target.value)}
                  placeholder="e.g., 10"
                  className="p-2 w-20 border rounded-md"
                />
                <span>$</span>
              </div>

              <button
                type="button"
                className="text-red-500 hover:text-black absolute top-0 right-0 p-2"
                onClick={() => handleRemovePart(index)}
              >
                <BiTrash size={18} />
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default AddPropertyForm;
