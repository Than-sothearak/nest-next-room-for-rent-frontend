"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import CircleTimeout from "./CircleCountdown";
import { IoCloseOutline } from "react-icons/io5";


export default function CreatePaymentLinkForm({ booking }) {
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [isClicked, setIsClicked] = useState(true);
  const [timeLeft, setTimeLeft] = useState(150); // 150 seconds = 2m30s
  const [isExpired, setIsExpired] = useState(false);



  const handleSubmit = async (e) => {
    e.preventDefault();
    // Reset states for new QR generation
    setIsExpired(false);
    setTimeLeft(150); // reset countdown timer
    setResponse(null);
    setIsClicked(true);
    setLoading(true);



    const formData = new FormData();
    formData.append("request_time", new Date().toISOString());
    formData.append("merchant_id", "ec460831");
    formData.append("merchant_auth", "YOUR_AUTH_TOKEN");
    formData.append("hash", "YOUR_HASH");

    const res = await fetch("/api/payway/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstname: "John",
        lastname: "Doe",
        email: "john@example.com",
        phone: "0123456789",
        amount: booking?.paymentStatus === "paid" ?
        0.01  : booking.rent +
          booking.properties.reduce((sum, service) => {
            return sum + Number(service.price);
          }, 0) ,
        currency: "USD",
        payment_option: "abapay",
        items: [
          {
            item_name: "Book A",
            unit_price: 10.0,
            quantity: 1,
          },
        ],
      }),
    });



    const data = await res.json();

    if (res.ok) {
      console.log("Payment initiation successful:", data);
      setResponse(JSON.parse(JSON.stringify(data)));
      setIsClicked(true);
    } else {
      alert("Payment initiation failed");
    }
    setLoading(false);
  };

  const currencyFormat = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  useEffect(() => {
    if (response && !isExpired) {


      const countdownInterval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(countdownInterval);
            setIsClicked(false);
            setIsExpired(true);
            setResponse(null);
            return 0;
          }
          return prev - 1;
        });
      }, 10); // decrease every second

      return () => clearInterval(countdownInterval);
    }
  }, [response]);

  console.log(response)

  return (
    <form onSubmit={handleSubmit} className="">
      <div className="flex flex-col gap-2 ">
        <strong>Choose way to pay</strong>
        <div className="border rounded-xl  hover:bg-slate-100">
          <button
            type="submit"
            className=" justify-center items-center text-slate-800 px-4 py-2 rounded flex gap-6"
            disabled={loading}
          >
            <div className="">
              <Image
                src="/ABA BANK.svg"
                alt="ABA Logo"
                width={40}
                height={40}
                className="rounded-md"
              />
            </div>
            <div className="text-start flex flex-col justify-start items-start">
              <strong className="text-lg">ABA KHQR</strong>
              <p className="text-[#697386]">Scan to pay with any banking app</p>
            </div>

            <div className="bg-slate-100 p-1 rounded-md">
              <IoIosArrowForward size={20} />
            </div>
          </button>
        </div>
      </div>

      {response && (
        <div className={`${isClicked
            ? "fixed inset-0 z-20 bg-black/60 flex items-center justify-center"
            : "hidden"
          } `}>
          <div
            className={`${isClicked
                ? "fixed  z-20 bg-red-500 flex items-center justify-center p-10"
                : "hidden"
              } `}
            onClick={() => setIsClicked(false)}
          ></div>
          <div
            className={`fixed w-96 translate-y-0 opacity-0 border-2 ${isClicked ? "opacity-100" : "hidden"
              } bg-white top-1/4 left-1/2 -translate-x-1/2  transition-all duration-300 p-4 rounded-xl shadow-lg  z-50 justify-center flex flex-col items-center`}
          >


            <div className="flex justify-between items-center w-full mb-4">
              <strong className="text-xl">ABA KHQR</strong>
              <div className="flex gap-4">
                <div className="flex gap-1 items-center justify-center text-sm ">
                  <CircleTimeout seconds={150} size={100} /> <p>{Math.floor(timeLeft / 60)}:
                    {(timeLeft % 60).toString().padStart(2, '0')}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsClicked(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <IoCloseOutline size={24} />
                </button>
              </div>
            </div>
            <div>
              <strong className="text-2xl">
                {currencyFormat(
                  booking.rent +
                  booking.properties?.reduce((sum, service) => {
                    return sum + Number(service.price);
                  }, 0)
                )}
              </strong>
            </div>
            <div className="flex flex-col items-center mt-4 mb-4 border-2 p-4 rounded-lg border-green-100 ">
              <strong className="block mb-2">Scan to pay</strong>

              <div className="w-40 h-40 flex justify-center items-center">
                <Image
                  alt="QR Code"
                  height={80}
                  width={80}
                  src={response.result.qrImage}
                  className="w-full h-auto mb-2"
                />
              </div>
            </div>
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
