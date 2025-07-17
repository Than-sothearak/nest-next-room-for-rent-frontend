import { NextResponse } from "next/server";
import crypto from "crypto";
import { format } from "date-fns-tz";

const MERCHANT_ID = "ec460831";
const PAYWAY_API_KEY = process.env.PAYWAY_API_KEY;
const PAYWAY_CHECK_ENDPOINT = "https://checkout-sandbox.payway.com.kh/api/payment-gateway/v1/payments/check-transaction-2";

function generateCheckHash({ req_time, merchant_id, tran_id }, api_key) {
  const raw = `${req_time}${merchant_id}${tran_id}`;
  return crypto.createHmac("sha512", api_key).update(raw).digest("base64");
}

export async function POST(req) {
  try {
    const { tran_id } = await req.json();
    if (!tran_id) {
      return NextResponse.json({ error: "Missing tran_id" }, { status: 400 });
    }

    const req_time = format(new Date(), "yyyyMMddHHmmss", {
      timeZone: "Asia/Phnom_Penh",
    });

    const params = {
      req_time,
      merchant_id: MERCHANT_ID,
      tran_id,
    };

    const hash = generateCheckHash(params, PAYWAY_API_KEY);
    const formData = new FormData();

    formData.append("req_time", req_time);
    formData.append("merchant_id", MERCHANT_ID);
    formData.append("tran_id", tran_id);
    formData.append("hash", hash);

    const response = await fetch(PAYWAY_CHECK_ENDPOINT, {
      method: "POST",
      body: formData,
      headers: formData.getHeaders(),
    });

    const result = await response.json();

    if (!response.ok) {
      console.error("PayWay check error:", result);
      return NextResponse.json({ error: result }, { status: 400 });
    }

    return NextResponse.json({ status: 200, result });
  } catch (err) {
    console.error("Transaction check error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
