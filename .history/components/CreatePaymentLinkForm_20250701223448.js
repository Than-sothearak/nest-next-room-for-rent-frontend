"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { BiArrowFromRight, BiArrowToRight } from "react-icons/bi";
import { CgClose } from "react-icons/cg";
import { IoIosArrowForward } from "react-icons/io";

export default function CreatePaymentLinkForm() {
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [isClicked, setIsClicked] = useState(true)

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
      setIsClicked(true)
    } else {
      alert("Payment initiation failed");
    }
    setLoading(false)

  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
     <div className="flex flex-col gap-2 ">
       <strong>Choose way to pay</strong>
      <div className="border rounded-xl p-2">
        <button type="submit" className="justify-center items-center text-slate-800 px-4 py-2 rounded flex gap-6" disabled={loading}>
        <div>
          <Image src={'/images/KHQR_Logo.png'} width={50} height={100} alt="logo">

          </Image>
        </div>
        <div className="flex flex-col justify-start items-start">
          <strong>ABA KHQR</strong>
          <p>Scan to pay with any banking app</p>
        </div>

        <div className="bg-slate-400 p-1">
          <IoIosArrowForward />
        </div>
      </button>
      </div>
     </div>

      {response && (
        <div>
          <div
            className={`${isClicked ? 'fixed inset-0 z-20 bg-black/60 flex items-center justify-center' : 'hidden'}`}
            onClick={() => setIsClicked(false)}
          ></div>
          <div className={`fixed translate-y-0 opacity-0 border-2 ${isClicked ? 'inset-x-40 opacity-100' : 'hidden'} bg-white top-1/4 left-1/2 -translate-x-1/2  w-96 transition-all duration-300 p-4 rounded-xl shadow-lg  max-h-screen max-sm:w-full max-sm:top-2 z-50`}>

            <strong className="block mb-2">Scan here to pay</strong>

            <img src={response.result.qrImage} className="w-full h-auto mb-2" />
            <a
              href={response.result.abapay_deeplink}
              className="block text-center mt-2 bg-blue-500 p-2 rounded-md text-primary"
            >
              Pay with ABA App
            </a>
          </div>

        </div>

      )}



    </form>
  );
}
