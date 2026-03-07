"use server";

import { dbConnect, collections } from "@/lib/dbConnect";
import Stripe from "stripe";
import { ObjectId } from "mongodb";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2023-10-16", // Note: use latest supported or default API version of the package
});

/**
 * Creates an order in MongoDB and generates a Stripe Checkout Session URL
 */
// Add this new action to get user orders
export async function getUserOrders(email) {
  try {
    const ordersCollection = dbConnect(collections.orders);

    const orders = await ordersCollection
      .find({ email })
      .sort({ createdAt: -1 })
      .toArray();

    // Serialize object IDs
    return orders.map((order) => ({
      ...order,
      _id: order._id.toString(),
    }));
  } catch (error) {
    console.error("Error fetching user orders:", error);
    return [];
  }
}

// Add this new action to get ALL orders for admin
export async function getAllOrders() {
  try {
    const ordersCollection = dbConnect(collections.orders);

    const orders = await ordersCollection
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    // Serialize object IDs
    return orders.map((order) => ({
      ...order,
      _id: order._id.toString(),
    }));
  } catch (error) {
    console.error("Error fetching all orders:", error);
    return [];
  }
}

export async function createOrderAndStripeSession(orderData) {
  try {
    const { email, name, deliveryInfo, cartItems, cartTotal } = orderData;
    
    if (!email || !cartItems || cartItems.length === 0) {
      throw new Error("Missing required order data");
    }

    const newOrder = {
      userId: email,
      userName: name,
      email: email,
      cartItems: cartItems.map((item) => ({
        productId: item.id,
        name: item.name,
        quantity: item.quantity,
        price: item.basePrice || 0,
        details: item.details || null, // Preserve custom cake details
      })),
      totalAmount: cartTotal,
      deliveryInformation: deliveryInfo,
      orderStatus: "pending",
      paymentStatus: "pending",
      paymentGateway: "stripe",
      createdAt: new Date(),
    };

    // 1. Save Order to Database
    const collection = dbConnect(collections.orders);
    const result = await collection.insertOne(newOrder);
    const orderId = result.insertedId.toString();

    // 2. Format Line Items for Stripe
    // Stripe requires amounts in the smallest currency unit (cents if USD). 
    // BDT is technically supported by Stripe but usually processed in USD or cents.
    // For local dev, assuming BDT is passed straight to Stripe in subunits (paisa).
    // E.g., 1 Taka = 100 Paisa.
    const lineItems = cartItems.map((item) => ({
      price_data: {
        currency: "bdt",
        product_data: {
          name: item.name,
          images: item.image ? [item.image] : [],
        },
        unit_amount: Math.round((item.basePrice || 0) * 100),
      },
      quantity: item.quantity,
    }));

    // Add shipping as a line item
    lineItems.push({
        price_data: {
            currency: "bdt",
            product_data: { name: "Standard Shipping" },
            unit_amount: 100 * 100, // 100 Taka
        },
        quantity: 1,
    });

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

    // 3. Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${baseUrl}/payment/success?session_id={CHECKOUT_SESSION_ID}&order_id=${orderId}`,
      cancel_url: `${baseUrl}/payment`,
      customer_email: email,
      metadata: {
        orderId: orderId,
      },
    });

    return { success: true, url: session.url };
  } catch (error) {
    console.error("Order creation error:", error);
    return { success: false, message: error.message || "Failed to initiate payment" };
  }
}

/**
 * Updates an order's payment/order status after a successful Stripe payment
 */
export async function markOrderPaid(orderId) {
  try {
    const collection = dbConnect(collections.orders);

    await collection.updateOne(
      { _id: new ObjectId(orderId) },
      {
        $set: {
          paymentStatus: "paid",
          orderStatus: "confirmed",
          paidAt: new Date(),
        },
      }
    );

    return { success: true };
  } catch (error) {
    console.error("markOrderPaid error:", error);
    return { success: false, message: error.message };
  }
}
