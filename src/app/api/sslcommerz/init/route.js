import { NextResponse } from "next/server";
import { dbConnect, collections } from "@/lib/dbConnect";

const store_id = process.env.STORE_ID;
const store_passwd = process.env.STORE_PASSWORD;
// Use dedicated SSLCOMMERZ_IS_LIVE variable so sandbox creds can be tested on Vercel
const is_live = process.env.SSLCOMMERZ_IS_LIVE === "true";

// SSLCommerz API endpoints
const SSLC_INIT_URL = is_live
  ? "https://securepay.sslcommerz.com/gwprocess/v4/api.php"
  : "https://sandbox.sslcommerz.com/gwprocess/v4/api.php";

export async function POST(request) {
  try {
    const body = await request.json();
    const { email, name, deliveryInfo, cartItems, cartTotal } = body;

    if (!email || !cartItems || cartItems.length === 0) {
      return NextResponse.json({ success: false, message: "Missing required order data" }, { status: 400 });
    }

    // 1. Save Order to MongoDB as pending
    const newOrder = {
      userId: email,
      userName: name,
      email,
      cartItems: cartItems.map((item) => ({
        productId: item.id,
        name: item.name,
        quantity: item.quantity,
        price: item.basePrice || 0,
      })),
      totalAmount: cartTotal,
      deliveryInformation: deliveryInfo,
      orderStatus: "pending",
      paymentStatus: "pending",
      paymentGateway: "sslcommerz",
      createdAt: new Date(),
    };

    const collection = dbConnect(collections.orders);
    const result = await collection.insertOne(newOrder);
    const orderId = result.insertedId.toString();

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

    // 2. Call SSLCommerz API directly using fetch (avoids CJS interop issues)
    const params = new URLSearchParams({
      store_id,
      store_passwd,
      total_amount: cartTotal.toString(),
      currency: "BDT",
      tran_id: orderId,
      success_url: `${baseUrl}/api/sslcommerz/success`,
      fail_url: `${baseUrl}/api/sslcommerz/fail`,
      cancel_url: `${baseUrl}/api/sslcommerz/cancel`,
      ipn_url: `${baseUrl}/api/sslcommerz/ipn`,
      shipping_method: "YES",
      product_name: "Cream & Co Cakes",
      product_category: "Food",
      product_profile: "general",
      cus_name: name,
      cus_email: email,
      cus_add1: deliveryInfo?.address || "N/A",
      cus_city: deliveryInfo?.city || "Dhaka",
      cus_postcode: deliveryInfo?.zip || "1000",
      cus_country: "Bangladesh",
      cus_phone: deliveryInfo?.phone || "01XXXXXXXXX",
      ship_name: name,
      ship_add1: deliveryInfo?.address || "N/A",
      ship_city: deliveryInfo?.city || "Dhaka",
      ship_postcode: deliveryInfo?.zip || "1000",
      ship_country: "Bangladesh",
    });

    const response = await fetch(SSLC_INIT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params.toString(),
    });

    const data = await response.json();

    if (data?.GatewayPageURL) {
      return NextResponse.json({ success: true, url: data.GatewayPageURL });
    } else {
      console.error("SSLCommerz response:", JSON.stringify(data));
      throw new Error(data?.failedreason || "Failed to get gateway URL from SSLCommerz");
    }
  } catch (error) {
    console.error("SSLCommerz init error:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
