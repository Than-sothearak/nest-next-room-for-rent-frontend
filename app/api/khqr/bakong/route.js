// app/api/bakong/check-transaction/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(req) {
  const { md5 } = await req.json();

  const res = await fetch("https://your-bank-api/v1/check_transaction_by_md5", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.BAKONG_ACCESS_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ md5 }),
  });

  const data = await res.json();

  return NextResponse.json(data);
}
