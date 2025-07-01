"use client";
import { useEffect } from "react";

export default function PayWayModal() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout-sandbox.payway.com.kh//checkout-popup.html?file=js";
    script.async = true;
    document.body.appendChild(script);

    const link = document.createElement("link");
    link.href = "https://checkout-sandbox.payway.com.kh//checkout-popup.html?file=css";
    link.rel = "stylesheet";
    document.head.appendChild(link);

    return () => {
      document.body.removeChild(script);
      document.head.removeChild(link);
    };
  }, []);

  const handleAddCard = () => {
    if (window.AbaPayway) {
      window.AbaPayway.addCard();
    } else {
      alert("PayWay script not loaded yet!");
    }
  };

  return (
    <div className="p-4">
      <button
        onClick={handleAddCard}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Add New Card
      </button>

      {/* Hidden Modal DOM (required by PayWay) */}
      <div id="aba_main_modal" className="aba-modal">
        <div className="aba-modal-content add-card">
          <form
            method="POST"
            target="aba_webservice"
            id="aba_merchant_add_card"
            action="https://checkout-sandbox.payway.com.kh//api/payment-gateway/v1/cof/initial?lang=en"
          >
            <input type="hidden" name="firstname" value="Samnang" />
            <input type="hidden" name="lastname" value="Sok" />
            <input type="hidden" name="phone" value="0123456789" />
            <input type="hidden" name="email" value="sok.samnang@gmail.com" />
            <input type="hidden" name="ctid" value="239acf04eace99ea1590857c7066acf260e" />
            <input type="hidden" name="merchant_id" value="###" />
            <input type="hidden" name="return_param" value="rp-1582083583" />
            <input type="hidden" name="hash" value="###" />
          </form>
        </div>
      </div>
    </div>
  );
}
