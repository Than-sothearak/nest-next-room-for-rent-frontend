// components/ProductPropertyForm.js
"use client";
import { useEffect, useState } from "react";

export default function ProductPropertyForm({
  categoryProperties, // Properties available for the selected category (room type)
  productProperties,  // Properties already on the room being edited
  onPropertiesChange, // Callback to update parent (RoomForm)
}) {
  const [selectedProperties, setSelectedProperties] = useState(productProperties || []);

  useEffect(() => {
    // When productProperties from the parent changes (e.g., on initial load or room data update)
    setSelectedProperties(productProperties || []);
  }, [productProperties]);


  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    let updated = [...selectedProperties];

    if (checked) {
      // Add the property if checked
      updated.push({ name: value, value: "true" }); // Assuming a simple true/false for properties
    } else {
      // Remove the property if unchecked
      updated = updated.filter((prop) => prop.name !== value);
    }
    setSelectedProperties(updated);
    onPropertiesChange(updated); // Notify the parent component of the change
  };

  // If properties have values (e.g., "size: 20sqm"), this logic would be more complex
  const handlePropertyTextChange = (propertyName, newValue) => {
    const updated = selectedProperties.map(prop =>
      prop.name === propertyName ? { ...prop, value: newValue } : prop
    );
    setSelectedProperties(updated);
    onPropertiesChange(updated);
  };


  return (
    <div className="space-y-4 w-full bg-primary rounded-lg p-4">
      <h1 className="text-lg font-bold">Room Features/Amenities</h1>
      <div className="grid grid-cols-2 gap-4">
        {categoryProperties?.length > 0 ? (
          categoryProperties.map((prop) => (
            <div key={prop._id} className="flex items-center gap-2">
              <input
                type="checkbox"
                id={`prop-${prop._id}`}
                value={prop.name}
                checked={selectedProperties.some((p) => p.name === prop.name)}
                onChange={handleCheckboxChange}
                className="rounded text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor={`prop-${prop._id}`}>{prop.name}</label>
              {/* Optional: if properties can have values, add an input */}
              {/* {selectedProperties.some((p) => p.name === prop.name) && prop.hasValue && (
                <input
                  type="text"
                  value={selectedProperties.find(p => p.name === prop.name)?.value || ''}
                  onChange={(e) => handlePropertyTextChange(prop.name, e.target.value)}
                  className="w-full p-1 rounded-md bg-secondary text-xs"
                  placeholder="Value"
                />
              )} */}
            </div>
          ))
        ) : (
          <p className="text-sm text-slate-500 col-span-2">No features defined for this room type category.</p>
        )}
      </div>
    </div>
  );
}