import { NextResponse } from "next/server";
import { dbConnect, collections } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";

export async function POST(request) {
  try {
    // SSLCommerz POSTs form-encoded data on success
    const formData = await request.formData();
    const tranId = formData.get("tran_id");
    const valId = formData.get("val_id");
    const status = formData.get("status");

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

    if (!tranId || status !== "VALID") {
      // Use 303 See Other — forces browser to GET the redirect URL (not re-POST)
      return NextResponse.redirect(
        `${baseUrl}/payment/ssl-result?status=fail`,
        303
      );
    }

    // Update the order to paid/confirmed
    const collection = dbConnect(collections.orders);
    await collection.updateOne(
      { _id: new ObjectId(tranId) },
      {
        $set: {
          paymentStatus: "paid",
          orderStatus: "confirmed",
          sslValId: valId,
          paidAt: new Date(),
        },
      }
    );

    // 303 See Other forces browser to switch to GET for the next request
    return NextResponse.redirect(
      `${baseUrl}/payment/ssl-result?status=success&order_id=${tranId}`,
      303
    );
  } catch (error) {
    console.error("SSLCommerz success callback error:", error);
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    return NextResponse.redirect(
      `${baseUrl}/payment/ssl-result?status=fail`,
      303
    );
  }
}
