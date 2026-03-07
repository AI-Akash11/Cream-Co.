import { NextResponse } from "next/server";

export async function POST() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  // 303 See Other forces browser to switch to GET for the next request
  return NextResponse.redirect(`${baseUrl}/payment/ssl-result?status=cancelled`, 303);
}
