export default function VariantForm({ variant, index, onChange, onRemove }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange({ ...variant, [name]: value });
  };

  return (
    <div className="p-4 bg-secondary rounded-md space-y-2">
      <h2 className="font-semibold">Variant {index + 1}</h2>
      <div className="grid grid-cols-2 gap-4">
        <input
          name="size"
          onChange={handleChange}
          placeholder="Size"
          className="p-2 rounded bg-white text-sm"
        />
        <input
          name="color"
          
          onChange={handleChange}
          placeholder="Color"
          className="p-2 rounded bg-white text-sm"
        />
        <input
          name="stock_quantity"
          type="number"
         
          onChange={handleChange}
          placeholder="Stock"
          className="p-2 rounded bg-white text-sm"
        />
        <input
          name="price"
          type="number"
          step="0.01"
          
          onChange={handleChange}
          placeholder="Price"
          className="p-2 rounded bg-white text-sm"
        />
        <input
          name="sku"
         
          onChange={handleChange}
          placeholder="SKU"
          className="p-2 rounded bg-white text-sm"
        />
      </div>
      <button
        type="button"
        onClick={onRemove}
        className="text-red-500 text-sm underline mt-2"
      >
        Remove Variant
      </button>
    </div>
  );
}
