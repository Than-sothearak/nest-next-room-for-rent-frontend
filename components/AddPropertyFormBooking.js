"use client";
import React from "react";
import { BiPlusCircle, BiTrash } from "react-icons/bi";
import { MdOutlineDoNotDisturb } from "react-icons/md";

const AddPropertyFormBooking = ({ formData, setFormData }) => {
  const properties = Array.isArray(formData?.properties) ? formData.properties : [];

  const addPart = () => {
    setFormData(prev => ({
      ...prev,
      // 🔹 keep consistent naming: part, price, qty
      properties: [...(prev?.properties || []), { part: "", price: "", qty: "" }],
    }));
  };

  const handleRemovePart = (index) => {
    setFormData(prev => ({
      ...prev,
      properties: (prev?.properties || []).filter((_, i) => i !== index),
    }));
  };

  const handlePartChange = (index, value) => {
    setFormData(prev => {
      const next = [...(prev?.properties || [])];
      next[index] = { ...(next[index] || { price: "", qty: "" }), part: value };
      return { ...prev, properties: next };
    });
  };

  // 🔹 Renamed for clarity — this now updates price
  const handlePriceChange = (index, value) => {
    setFormData(prev => {
      const next = [...(prev?.properties || [])];
      next[index] = { ...(next[index] || { part: "", qty: "" }), price: value };
      return { ...prev, properties: next };
    });
  };

  // 🔹 Added qty handler
  const handleQtyChange = (index, value) => {
    setFormData(prev => {
      const next = [...(prev?.properties || [])];
      next[index] = { ...(next[index] || { part: "", price: "" }), qty: value };
      return { ...prev, properties: next };
    });
  };

  // 🔹 Validation updated to check price instead of value
  const checkIsPropertyEmpty =
    properties.reduce((acc, item, idx) => {
      const isEmpty = !item?.part?.trim() || !item?.price?.trim();
      acc[idx] = isEmpty;
      return acc;
    }, {}) || {};

  const anyPropertyEmpty = Object.values(checkIsPropertyEmpty).some(Boolean);

  return (
    <div className="flex flex-col gap-2 border p-4 rounded-md bg-slate-100">
      <button
        type="button"
        className={`${
          anyPropertyEmpty ? "cursor-not-allowed bg-blue-200" : "hover:bg-blue-500 bg-blue-600"
        } w-36 p-2 text-secondarytext rounded-md flex items-center gap-2 text-base`}
        onClick={addPart}
        title="Click to add more property"
        disabled={anyPropertyEmpty}
      >
        {!anyPropertyEmpty ? <BiPlusCircle /> : <MdOutlineDoNotDisturb />}
        Add property
      </button>

      <p className="text-xs italic">
        Note: Enter part name, price, and quantity for each item.
      </p>

      <div className="grid grid-cols-3 max-2xl:grid-cols-2 gap-4 max-lg:grid-cols-1">
        {properties.length > 0 &&
          properties.map((prop, index) => (
            <div key={index} className="bg-primary p-2 rounded-md text-md">
              <div className="w-full flex gap-2 max-md:flex-wrap">
                <div className="w-full">
                  <div className="flex justify-between">
                    <label className="block font-medium">Service {index + 1}</label>
                    <button
                      type="button"
                      className="text-red-500 hover:text-black p-2"
                      onClick={() => handleRemovePart(index)}
                      title="Remove this property"
                    >
                      <BiTrash size={18} />
                    </button>
                  </div>
                  <input
                    name="part"
                    type="text"
                    placeholder="e.g., Notes"
                    value={prop?.part || ""}
                    onChange={(e) => handlePartChange(index, e.target.value)}
                    className="w-full p-2 rounded-md border font-bold mt-2"
                  />
                </div>
              </div>

              {/* 🔹 Price input (renamed and fixed handler) */}
              <div className="mt-4 flex items-center gap-2">
                <label className="font-medium">Price:</label>
                <input
                  type="text"
                  name="price"
                  value={prop?.price ?? ""}
                  onChange={(e) => handlePriceChange(index, e.target.value)}
                  placeholder="e.g., 10.50"
                  className="p-2 w-full border rounded-md"
                />
                <span className="font-medium">USD</span>
              </div>

              {/* 🔹 Qty input (new field + correct handler) */}
              <div className="mt-4 flex items-center gap-2">
                <label className="font-medium">Qty:</label>
                <input
                  type="number"
                  name="qty"
                  value={prop?.qty ?? ""}
                  onChange={(e) => handleQtyChange(index, e.target.value)}
                  placeholder="e.g., 1"
                  className="p-2 w-full border rounded-md"
                />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default AddPropertyFormBooking;
