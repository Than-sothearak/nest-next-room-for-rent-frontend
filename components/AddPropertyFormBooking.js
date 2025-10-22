"use client";
import React from "react";
import { BiPlusCircle, BiTrash } from "react-icons/bi";
import { MdOutlineDoNotDisturb } from "react-icons/md";

const AddPropertyFormBooking = ({ formData, setFormData }) => {
  const properties = Array.isArray(formData?.properties) ? formData.properties : [];

  const addPart = () => {
    setFormData(prev => ({
      ...prev,
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

  const handlePriceChange = (index, value) => {
    setFormData(prev => {
      const next = [...(prev?.properties || [])];
      next[index] = { ...(next[index] || { part: "", qty: "" }), price: value };
      return { ...prev, properties: next };
    });
  };

  const handleQtyChange = (index, value) => {
    setFormData(prev => {
      const next = [...(prev?.properties || [])];
      next[index] = { ...(next[index] || { part: "", price: "" }), qty: value };
      return { ...prev, properties: next };
    });
  };

  const checkIsPropertyEmpty =
    properties.reduce((acc, item, idx) => {
      const isEmpty = !item?.part?.trim() || !item?.price?.trim();
      acc[idx] = isEmpty;
      return acc;
    }, {}) || {};

  const anyPropertyEmpty = Object.values(checkIsPropertyEmpty).some(Boolean);

  return (
    <div className="flex flex-col gap-3 border p-4 rounded-md bg-gray-50">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-lg">Additional Services</h3>
        <button
          type="button"
          className={`${
            anyPropertyEmpty
              ? "cursor-not-allowed bg-blue-200"
              : "hover:bg-blue-500 bg-blue-600"
          } p-2 text-white rounded-md flex items-center gap-2 text-sm transition`}
          onClick={addPart}
          title="Add new service"
          disabled={anyPropertyEmpty}
        >
          {!anyPropertyEmpty ? <BiPlusCircle size={18} /> : <MdOutlineDoNotDisturb size={18} />}
          Add Service
        </button>
      </div>

      <p className="text-xs italic text-gray-600">
        Fill in the service name, price, and quantity for each item.
      </p>

      <div className="flex flex-col gap-4">
        {properties.length > 0 &&
          properties.map((prop, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-lg shadow-sm border relative group hover:border-blue-400 transition"
            >
              <button
                type="button"
                className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                onClick={() => handleRemovePart(index)}
                title="Remove this item"
              >
                <BiTrash size={18} />
              </button>

              <label className="block text-sm font-medium mb-2 text-gray-700">
                Service {index + 1}
              </label>
              <input
                name="part"
                type="text"
                placeholder="Service name (e.g., Room cleaning)"
                value={prop?.part || ""}
                onChange={(e) => handlePartChange(index, e.target.value)}
                className="w-full p-2 rounded-md border bg-gray-100 focus:ring-1 focus:ring-blue-400 outline-none"
              />

              {/* Price & Qty in one row */}
              <div className="grid grid-cols-2 gap-4 mt-3">
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700">
                    Price (USD)
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={prop?.price ?? ""}
                    onChange={(e) => handlePriceChange(index, e.target.value)}
                    placeholder="e.g., 15"
                    className="w-full p-2 rounded-md border bg-gray-100 focus:ring-1 focus:ring-blue-400 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700">
                    Quantity
                  </label>
                  <input
                    type="number"
                    name="qty"
                    value={prop?.qty ?? ""}
                    onChange={(e) => handleQtyChange(index, e.target.value)}
                    placeholder="e.g., 1"
                    className="w-full p-2 rounded-md border bg-gray-100 focus:ring-1 focus:ring-blue-400 outline-none"
                  />
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default AddPropertyFormBooking;
