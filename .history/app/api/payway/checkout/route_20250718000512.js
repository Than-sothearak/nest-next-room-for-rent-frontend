"use server"
import { NextResponse } from "next/server";
import crypto from "crypto";
import { format } from "date-fns-tz";
import { Booking } from "@/models/Booking";
import { revalidatePath } from "next/cache";

const MERCHANT_ID = "ec460831";
const PAYWAY_API_KEY = process.env.PAYWAY_API_KEY;
const PAYWAY_ENDPOINT =
  "https://checkout-sandbox.payway.com.kh/api/payment-gateway/v1/payments/purchase";

// ✅ Generate HMAC SHA-512 Base64 hash
function generateHash(params, api_key) {
  const fieldsInOrder = [
    "req_time", "merchant_id", "tran_id", "amount", "items", "shipping",
    "firstname", "lastname", "email", "phone", "type", "payment_option",
    "return_url", "cancel_url", "continue_success_url", "return_deeplink",
    "currency", "custom_fields", "return_params", "payout", "lifetime",
    "additional_params", "google_pay_token", "skip_success_page"
  ];

  let raw = "";
  for (const field of fieldsInOrder) {
    raw += params[field] || "";
  }

  const hmac = crypto.createHmac("sha512", api_key);
  hmac.update(raw);
  return hmac.digest("base64");
}

export async function POST(req) {
  try {
    const body = await req.json();
    const tran_id = `${Date.now()}`;
    const req_time = format(new Date(), "yyyyMMddHHmmss", {
      timeZone: "Asia/Phnom_Penh",
    });

    const params = {
      req_time,
      merchant_id: MERCHANT_ID,
      tran_id,
      amount: body.amount ?? 1,
      firstname: body.firstname ?? "John",
      lastname: body.lastname ?? "Doe",
      email: body.email ?? "john@example.com",
      phone: body.phone ?? "0123456789",
      type: "json",
      payment_option: body.payment_option ?? "abapay",
      return_url: "https://localhost:3000/payment-success",
      cancel_url: "https://your-site.com/payment-cancel",
      continue_success_url: body.continue_success_url ?? "",
      return_deeplink: body.return_deeplink ?? "",
      currency: body.currency ?? "USD",
      custom_fields: body.custom_fields ?? "",
      return_params: body.return_params ?? "",
      payout: body.payout ?? "",
      lifetime: 3,
      additional_params: body.additional_params ?? "",
      skip_success_page: body.skip_success_page ?? "0",
    };


    const hash = generateHash(params, PAYWAY_API_KEY);

    const formData = new FormData();
    for (const [key, val] of Object.entries(params)) {
      formData.append(key, val);
    }
    formData.append("hash", hash);

    const response = await fetch(PAYWAY_ENDPOINT, {
      method: "POST",
      body: formData,
    });


    const result = await response.json();

    if (body?.bookingId) {
      const booking = await Booking.findById(body?.bookingId)

      booking.tran_id = result.status.tran_id
      booking.save();

    }

    if (!response.ok) {
      console.error("PayWay error:", result);
      return NextResponse.json({ error: result }, { status: 400 });
    }

    return NextResponse.json({ status: 200, result });


  } catch (err) {
    console.error("Checkout route error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
 
}
