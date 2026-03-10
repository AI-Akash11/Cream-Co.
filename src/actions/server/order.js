"use server";

import { dbConnect, collections } from "@/lib/dbConnect";
import Stripe from "stripe";
import { ObjectId } from "mongodb";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2023-10-16",
});

/**
 * Get user orders with pagination
 */
export async function getUserOrders(email, page = 1, limit = 10) {
  try {
    const ordersCollection = dbConnect(collections.orders);
    const query = { email };
    
    const total = await ordersCollection.countDocuments(query);
    const skip = (page - 1) * limit;

    const ordersData = await ordersCollection
      .find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .toArray();

    return {
      success: true,
      orders: ordersData.map((order) => ({ ...order, _id: order._id.toString() })),
      total,
      page,
      totalPages: Math.ceil(total / limit)
    };
  } catch (error) {
    console.error("Error fetching user orders:", error);
    return { success: false, orders: [], total: 0 };
  }
}

/**
 * Get all orders for admin with pagination
 */
export async function getAllOrders(page = 1, limit = 10) {
  try {
    const ordersCollection = dbConnect(collections.orders);
    
    const total = await ordersCollection.countDocuments({});
    const skip = (page - 1) * limit;

    const ordersData = await ordersCollection
      .find({})
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .toArray();

    return {
      success: true,
      orders: ordersData.map((order) => ({ ...order, _id: order._id.toString() })),
      total,
      page,
      totalPages: Math.ceil(total / limit)
    };
  } catch (error) {
    console.error("Error fetching all orders:", error);
    return { success: false, orders: [], total: 0 };
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
        details: item.details || null,
      })),
      totalAmount: cartTotal,
      deliveryInformation: deliveryInfo,
      orderStatus: "pending",
      paymentStatus: "pending",
      paymentGateway: "stripe",
      createdAt: new Date(),
    };

    const collection = dbConnect(collections.orders);
    const result = await collection.insertOne(newOrder);
    const orderId = result.insertedId.toString();

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

    lineItems.push({
        price_data: {
            currency: "bdt",
            product_data: { name: "Standard Shipping" },
            unit_amount: 100 * 100,
        },
        quantity: 1,
    });

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

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
