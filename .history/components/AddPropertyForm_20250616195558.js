"use client";
import React, { useState } from "react";
import { BiPlusCircle } from "react-icons/bi";
import { MdKeyboardArrowDown, MdOutlineDoNotDisturb } from "react-icons/md";

const AddPropertyForm = ({ formData, setFormData }) => {
  const [isAddSpec, setIsAddSpec] = useState(false);
  const [showValue, setShowValue] = useState(false)

  // Adds a new empty value for a part
  const addValue = (partIndex) => {
    const updatedProperties = [...formData.properties];
    const values = updatedProperties[partIndex].values;

    // Check if the last value is not empty before adding a new one
    if (values[values.length - 1] !== "") {
      updatedProperties[partIndex].values.push(""); // Add new value slot
      setFormData((prev) => ({ ...prev, properties: updatedProperties }));
    }

    setShowValue((prev) => ({
      ...prev,
      [partIndex]: true
    }));
  };

  // Removes a value from the values array of a part
  const removeValue = (partIndex, valueIndex) => {
    const updatedProperties = [...formData?.properties];
    updatedProperties[partIndex].values.splice(valueIndex, 1); // Remove the value at the specified index
    setFormData((prev) => ({ ...prev, properties: updatedProperties }));
  };

  // Adds a new part section
  const addPart = () => {
    setIsAddSpec(!isAddSpec);
    setFormData((prev) => ({
      ...prev,
      properties: [...prev.properties, { part: "", values: [""] }],
    }));
  };

  // Removes a part section
  const handleRemovePart = (index) => {
    setFormData((prev) => ({
      ...prev,
      properties: prev.properties.filter((_, i) => i !== index),
    }));
  };

  // Handles updating part names
  const handlePartChange = (index, value) => {
    const updatedProperties = [...formData?.properties];
    updatedProperties[index].part = value;
    setFormData((prev) => ({ ...prev, properties: updatedProperties }));

    setShowValue((prev) => ({
      ...prev,
      [index]: value.trim() !== ""
    }));
  };

  // Handles updating values inside parts
  const handleValueChange = (partIndex, valueIndex, value) => {
    const updatedProperties = [...formData.properties];
    updatedProperties[partIndex].values[valueIndex] = value;
    setFormData((prev) => ({ ...prev, properties: updatedProperties }));
  };

  const checkIsPropertyEmpty = formData?.properties?.reduce((acc, item, index) => {
    const isEmpty =
      !item.part.trim() ||
      !Array.isArray(item.values) ||
      item.values.length === 0 ||
      (item.values.length === 1 && !item.values[0].trim());
  
    acc[index] = isEmpty;
    return acc;
  }, {});

  const anyPropertyEmpty = Object?.values(checkIsPropertyEmpty).some(Boolean);

  console.log(anyPropertyEmpty)

  const toggleShowValue = (index) => {
    setShowValue((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div className="flex flex-col gap-2 mb-4">
      <button
        type="button"
        className={`${anyPropertyEmpty ? 'cursor-not-allowed bg-blue-200' : 'hover:bg-blue-500 bg-blue-600'}  w-36 p-2 text-secondarytext rounded-md flex items-center gap-2 text-base hover:underline `}
        onClick={addPart}
        title="Click to add more property"
        disabled={anyPropertyEmpty}
      >
        {!anyPropertyEmpty ?  <BiPlusCircle /> :  <MdOutlineDoNotDisturb />}
        Add Service
       
      </button>
      <p className="text-xs italic">
        Note: Input values using ; to separate property values or click on the +
        button.
      </p>

      <div className="grid grid-cols-3 max-2xl:grid-cols-2 gap-4 max-lg:grid-cols-1 ">
        {formData?.properties.length > 0 &&
          formData?.properties?.slice().reverse().map((part, partIndex) => {
            const originIndex = formData.properties.length - 1 - partIndex
            return (
              <div
              key={originIndex}
              className={`border border-secondary p-2 rounded-md max-lg:w-full text-sm relative ${!checkIsPropertyEmpty[originIndex] ? '': ''}`}
            >
              <div className="w-full flex gap-2 max-md:flex-wrap ">
                <div className="w-full ">
                  <label className="w-full block font-medium">Service {partIndex + 1}</label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="service"
                      required
                      value={part.service}
                      onChange={(e) =>
                        handlePartChange(originIndex, e.target.value)
                      }
                      className={`font-bold w-full p-2 rounded-md  text-xs focus:ring-0 focus:outline-none ${!checkIsPropertyEmpty[originIndex] ? 'bg-tertiary text-primary' : ''}`}
                      placeholder="Enter value (e.g., Cleaning...)"
                    />
                  </div>
                </div>
              </div>
              <div className="w-full mt-2">
                <div className="flex justify-between gap-2 items-center">
                
                 <div>
                 <label className="w-full block font-medium">
                    Price USD
                  </label>
                 </div>
                  <button type="button" title="Show value" onClick={() => toggleShowValue(originIndex)}>
                  <div className="flex items-center justify-center">
                 {!showValue[originIndex] ? <p> Show more </p>: <p> Hide </p>}<MdKeyboardArrowDown size={18}/>
                  </div>
                  </button>
                </div>
                <div className={`transition-all duration-300 ease-in-out overflow-y-auto ${
    !showValue[originIndex]
      ? "max-h-0 opacity-0"
      : "max-h-[500px] opacity-100"
  } mt-2 gap-2`}>
                  <div className="w-full flex flex-wrap gap-2 justify-between">
                    {part.values.slice().reverse().map((value, valueIndex) => {
                      const originValueIndex = part.values.length - 1 - valueIndex
                      return (
                        <div
                        key={valueIndex}
                        className={`flex w-full gap-2 `}
                      >
                        <input
                          required
                          type="text"
                          name="value"
                          value={value}
                          onChange={(e) =>
                            handleValueChange(
                              originIndex,
                              originValueIndex,
                              e.target.value
                            )
                          }
                          className={`${
                            value
                              ? "bg-primary border border-secondary"
                              : "bg-secondary"
                          } w-full px-2 rounded-sm text-xs focus:ring-0 focus:outline-none`}
                          placeholder="Enter pirce (e.g., 10$;)"
                        />
                        <button
                          type="button"
                          className="bg-slate-500 text-secondarytext  px-3 py-1 rounded h-8 w-8 hover:bg-red-500"
                          onClick={() => removeValue(originIndex, originValueIndex)}
                        >
                          x
                        </button>
                      </div>
                      )
                    }
                      
                    )}
                  </div>
             
                </div>

                <button
                    type="button"
                    className={`${part.values[part.values.length - 1] === "" ? 'cursor-not-allowed text-slate-400': 'hover:bg-blue-700 hover:text-primary text-blue-600 '} border px-3 py-1 rounded h-8 w-full mt-4 `}
                    onClick={() => addValue(originIndex)}
                    disabled={part.values[part.values.length - 1] === ""}
                  >
                   Add more price
                  </button>
              </div>
              <button
                type="button"
                className="text-red-500 hover:text-primarytext hover:underline text-sm absolute right-0 top-0 p-2 rounded-full"
                onClick={() => handleRemovePart(originIndex)}
              >
                X Remove
             
              </button>
            </div>
            )
           
})}
      </div>
    </div>
  );
};

export default AddPropertyForm;
