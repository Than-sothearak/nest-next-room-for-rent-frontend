"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { BiArrowFromRight, BiArrowToRight } from "react-icons/bi";
import { CgClose, CgCloseR } from "react-icons/cg";
import { IoIosArrowForward } from "react-icons/io";

export default function CreatePaymentLinkForm({ booking }) {
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [isClicked, setIsClicked] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
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
        amount:
          booking.rent +
          booking.properties.reduce((sum, service) => {
            return sum + Number(service.price);
          }, 0),
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

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <div className="flex flex-col gap-2 ">
        <strong>Choose way to pay</strong>
        <div className="border rounded-xl p-2 hover:bg-slate-100">
          <button
            type="submit"
            className=" justify-center items-center text-slate-800 px-4 py-2 rounded flex gap-6"
            disabled={loading}
          >
            <div className="">
            <svg width="70" height="70" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0 48H70V70H0V48Z" fill="#E1232E"/>
<foreignObject x="-7.81395" y="-7.81395" width="85.6279" height="63.6279"><div xmlns="http://www.w3.org/1999/xhtml" style="backdrop-filter:blur(3.91px);clip-path:url(#bgblur_0_18265_3511_clip_path);height:100%;width:100%"></div></foreignObject><path data-figma-bg-blur-radius="7.81395" d="M0 0H70V48H0V0Z" fill="#055E7C"/>
<path d="M26.6445 31.265H23.8945L23.0283 28.6859H18.082L17.25 31.265H14.4873L19.0234 18.7191H22.0518L26.6445 31.265ZM36.3281 18.7191C38.9681 18.7191 40.3309 19.8514 40.3311 21.891C40.3311 23.1455 39.8383 24.0036 38.8086 24.475C40.1388 25 40.7792 25.9754 40.7793 27.4467C40.7793 29.834 39.1463 31.265 36.1367 31.265H30.3223V18.7191H36.3281ZM55.5273 31.265H52.7783L51.9082 28.6859H46.9639L46.1309 31.265H43.3721L47.9023 18.7191H50.9316L55.5273 31.265ZM32.8408 28.9984H35.9375C37.3736 28.9984 38.0536 28.521 38.0537 27.3734C38.0537 26.1488 37.3741 25.7113 35.9219 25.7113H32.8408V28.9984ZM18.7734 26.5717H22.3184L20.5498 21.2318L18.7734 26.5717ZM47.6514 26.5717H51.1963L49.4268 21.2318L47.6514 26.5717ZM32.8408 23.5668H35.834C37.0886 23.5668 37.6953 23.1664 37.6953 22.2035C37.6952 21.2311 37.0771 20.8988 35.8135 20.8988H32.8408V23.5668Z" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M56.5 20.9851H58.9607V16H56.5V20.9851Z" fill="#ED1C24"/>
<path d="M49.6689 62.5801L48.1094 62.5928L47.7256 62.2344L46.875 61.4365L45.6982 60.334H47.2578L49.6689 62.5801ZM21.291 58.9375L24.4248 56H25.9561L22.5527 59.1631L26.1123 62.5918H24.5527L21.291 59.5225V62.5918H20V56H21.291V58.9375ZM28.3389 58.751H31.9414V56H33.2031V62.5918H31.9414V59.7344H28.3389V62.5918H27.0762V56H28.3389V58.751ZM40.4229 56C41.0182 56.0002 41.4998 56.4518 41.5 57.0098V61.8877L40.3936 60.8506V57.7275C40.3934 57.3422 40.0674 57.0371 39.6562 57.0371H36.3242C35.913 57.0371 35.5861 57.3422 35.5859 57.7275V60.8506C35.5859 61.236 35.9129 61.542 36.3242 61.542H39.6562L40.7627 62.5791H35.5576C34.9621 62.5789 34.4805 62.1265 34.4805 61.5684V57.0098C34.4806 56.4518 34.9623 56.0002 35.5576 56H40.4229ZM46.166 56.001C48.0947 56.001 49.6551 57.4758 49.6553 59.2832H48.5488C48.5487 58.0473 47.4712 57.0371 46.1523 57.0371C45.1029 57.0371 44.1812 57.6752 43.8691 58.6055C43.7983 58.8313 43.7559 59.0573 43.7559 59.2832V62.5791H43.7275C43.1319 62.5791 42.6494 62.1275 42.6494 61.5693V59.2832H42.6631C42.6632 58.3795 43.0605 57.5152 43.7695 56.8906C44.4218 56.3193 45.2728 56.0011 46.166 56.001ZM38.877 58.0869C39.1177 58.0738 39.2879 58.233 39.2881 58.4453V60.5186H37.0752C36.8484 60.5184 36.6787 60.3458 36.6787 60.1465V58.459C36.6787 58.2464 36.8626 58.087 37.0752 58.0869H38.877Z" fill="white"/>
<defs>
<clipPath id="bgblur_0_18265_3511_clip_path" transform="translate(7.81395 7.81395)"><path d="M0 0H70V48H0V0Z"/>
</clipPath></defs>
</svg>
            </div>
            <div className="text-start flex flex-col justify-start items-start">
              <strong>ABA KHQR</strong>
              <p>Scan to pay with any banking app</p>
            </div>

            <div className="bg-slate-100 p-1 rounded-md">
              <IoIosArrowForward size={20} />
            </div>
          </button>
        </div>
      </div>

      {response && (
        <div className="">
          <div
            className={`${
              isClicked
                ? "fixed inset-0 z-20 bg-black/60 flex items-center justify-center"
                : "hidden"
            } `}
            onClick={() => setIsClicked(false)}
          ></div>
          <div
            className={`fixed translate-y-0 opacity-0 border-2 ${
              isClicked ? "inset-x-40 opacity-100" : "hidden"
            } bg-white top-1/4 left-1/2 -translate-x-1/2  w-96 transition-all duration-300 p-4 rounded-xl shadow-lg  max-h-screen max-sm:w-full max-sm:top-2 z-50 justify-center flex flex-col items-center`}
          >
            <div className="flex justify-between items-center w-full mb-4">
              <strong className="text-xl">ABA KHQR</strong>
              <button
                type="button"
                onClick={() => setIsClicked(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <CgCloseR size={24} />
              </button>
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
