"use client";

import { useRef, useState } from "react";

export default function CreatePaymentLinkForm() {
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("request_time", new Date().toISOString());
    formData.append("merchant_id", "ec460831");
    formData.append("merchant_auth", "YOUR_AUTH_TOKEN");
    formData.append("hash", "YOUR_HASH");
 
const res = await fetch('/api/payway/checkout', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    firstname: "John",
    lastname: "Doe",
    email: "john@example.com",
    phone: "0123456789",
    amount: "10.00",
    currency: "USD",
    payment_option: "abapay",
    items: [
      {
        item_name: "Book A",
        unit_price: 10.00,
        quantity: 1,
      }
    ]
  })
});
const data = await res.json();

if (res.ok) {
  console.log("Payment initiation successful:", data);
  setResponse(JSON.parse(JSON.stringify(data)));
} else {
  alert("Payment initiation failed");
}
setLoading(false)

  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 relative">
 
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded" disabled={loading}>
        {loading ? "Uploading..." : "Create Payment Link"}
      </button>

      {response && (
      <div className="absolute">
          <div className="mt-4">
          <strong>Response:</strong>
          <pre>{JSON.stringify(response)}</pre>
        </div>
        <div>
     <div>
      {response.result.qrString}
     </div>
    <img src={response.result.qrImage}/>
        </div>
        <a href={response.result.abapay_deeplink}> Pay with ABA App</a>
      </div>
      )}
    </form>
  );
}
