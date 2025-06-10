"use client";
import { useEffect, useState } from "react";
import { BiPlus } from "react-icons/bi";
import { IoRemoveCircleOutline } from "react-icons/io5";

export default function ProductPropertyForm({
  categoryProperties,
  setCurrentProperties,
  productProperties
}) {
  const [properties, setProperties] = useState(productProperties);
  const [inputValues, setInputValues] = useState({});
  const [selectedValues, setSelectedValues] = useState({});

  useEffect(() => {
    if (categoryProperties?.length > 0) {
      const newInitialValues = {};
      for (let index = 0; index < categoryProperties.length; index++) {
        newInitialValues[index] = "";
      }
      setInputValues(newInitialValues); // Update state when categoryProperties changes
    }
  }, [categoryProperties]);

  function addProperty() {
    setProperties((prev) => [...prev, { part: "", value: "" }]);
  }

  function removeProperty(index) {
    setProperties((prev) => prev.filter((_, i) => i !== index));
    
  }

  function removeCurrentProperty (index) {
    setCurrentProperties((prev) => prev.filter((_, i) => i !== index));
  }

  function handleChange(index, field, value) {
    setProperties((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: value } : item))
    );
  }

  function handleSelectChange(index, value) {
    setSelectedValues((prev) => ({
      ...prev,
      [index]: value !== "", // If value is selected, hide the input
    }));
    setInputValues((prev) => ({
      ...prev,
      [index]: "", // Clear input when selecting from dropdown
    }));
    handleChange(index, value);
  }

  function handleInputChange(index, value) {
    setInputValues((prev) => ({
      ...prev,
      [index]: value, // Track input value
    }));
  }

 

  return (
    <div className="bg-primary w-full rounded-lg border p-4 border-secondary">
      <h1 className="text-lg font-bold mb-2">Product Properties</h1>
      <span className="xs italic">
        *Note: Select parent category to get properties
      </span>
     {/* <div className="flex flex-col gap-2 mt-2">
     {categoryProperties?.map((items, index) => (
        <div key={index} className="flex gap-2 flex-col border border-secondary p-2 rounded-md">
          <div className="">
          <div className="flex gap-4 justify-between">
              <label className="font-bold">{items.part}</label>
              <button
                title="Remove"
                className=""
                type="button"
                onClick={() => removeCurrentProperty(index)}
              >
                <IoRemoveCircleOutline size={24} />
              </button>
            </div>
            <input
              name="part"
              type="text"
              defaultValue={items.part}
              placeholder="Enter value..."
              className="w-full p-2 rounded-md bg-secondary text-xs focus:ring-0 focus:outline-none hidden"
            />

            {inputValues[index]?.length <= 0 && (
              <select
                name="value"
                className="w-full p-2 rounded-md bg-secondary text-xs focus:ring-0 focus:outline-none mt-2"
                onChange={(e) => handleSelectChange(index, e.target.value)}
              >
                <option value="">Select</option>
                {items?.values?.map((value, idx) => (
                  <option key={idx} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            )}
          </div>

          {/* Input for custom value entry (hidden if a value is selected) */}
          {/* {!selectedValues[index] && (
            <input
              onChange={(e) => handleInputChange(index, e.target.value)}
              name="value"
              defaultValue={items.value}
              type="text"
              placeholder="Enter value..."
              className="w-full p-2 rounded-md bg-secondary text-xs focus:ring-0 focus:outline-none"
            />
          )}

          <span className="text-xs italic">
            Note: Select value or Enter value above
          </span>
        </div>
      ))}
     </div> 
     */} 

     <div className="flex gap-2 flex-col mt-4">

     </div>

      <div className="flex gap-4 flex-col ">
        {properties?.map((item, index) => (
          <div
            className="flex flex-col gap-2 border border-secondary p-2 rounded-md"
            key={index}
          >
            <div className="flex gap-4 justify-between">
              <label>Part {index + 1}</label>
              <button
                title="Remove"
                className=""
                type="button"
                onClick={() => removeProperty(index)}
              >
                <IoRemoveCircleOutline size={24} />
              </button>
            </div>
            <div className="flex gap-2">
              <input
                required
                type="text"
                name="part"
                placeholder="Enter part..."
                className="w-full p-2 rounded-md bg-secondary text-xs focus:ring-0 focus:outline-none"
                value={item.part}
                onChange={(e) => handleChange(index, "part", e.target.value)}
              />
              <input
                required
                name="value"
                type="text"
                placeholder="Enter value..."
                className="w-full p-2 rounded-md bg-secondary text-xs focus:ring-0 focus:outline-none"
                value={item.value}
                onChange={(e) => handleChange(index, "value", e.target.value)}
              />
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={addProperty}
        className="mt-3 flex items-center gap-1 border text px-3 py-1 rounded text-sm"
      >
        <BiPlus /> Add Part
      </button>
    </div>
  );
}
