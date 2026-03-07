import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOption";
import { getUserOrders } from "@/actions/server/order";
import { redirect } from "next/navigation";
import Container from "@/components/ui/Container";
import Link from "next/link";
import { format } from "date-fns";
import { HiOutlineShoppingBag, HiArrowRight } from "react-icons/hi";

export const metadata = {
  title: "My Orders | Cream & Co.",
  description: "View your past orders and their status.",
};

export default async function UserOrdersPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/login?callbackUrl=/orders");
  }

  const orders = await getUserOrders(session.user.email);

  return (
    <div className="min-h-screen bg-base-100 py-12 lg:py-20">
      <Container>
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <HiOutlineShoppingBag className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-serif font-black text-base-content">
                My Orders
              </h1>
              <p className="text-base-content/60 mt-1">
                View and track your previous orders
              </p>
            </div>
          </div>

          {orders.length === 0 ? (
            <div className="bg-base-200/50 rounded-2xl p-12 text-center border border-base-300">
              <div className="w-20 h-20 mx-auto bg-base-100 rounded-full flex items-center justify-center shadow-sm mb-6">
                <HiOutlineShoppingBag className="w-10 h-10 text-base-content/30" />
              </div>
              <h3 className="text-xl font-bold text-base-content mb-2">
                No orders yet
              </h3>
              <p className="text-base-content/60 mb-8 max-w-sm mx-auto">
                Looks like you haven&apos;t placed any orders with us yet.
                Discover our delicious cakes!
              </p>
              <Link href="/shop" className="btn btn-primary rounded-full px-8">
                Start Shopping
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => (
                <div
                  key={order._id}
                  className="bg-base-100 border border-base-300 rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-base-200">
                    <div>
                      <p className="text-xs font-bold text-base-content/50 uppercase tracking-widest mb-1">
                        Order ID: {order._id.slice(-8).toUpperCase()}
                      </p>
                      <p className="font-medium text-base-content">
                        {format(new Date(order.createdAt), "MMMM d, yyyy 'at' h:mm a")}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                          order.paymentStatus === "paid"
                            ? "bg-success/10 text-success border border-success/20"
                            : order.paymentStatus === "cancelled" || order.paymentStatus === "failed"
                            ? "bg-error/10 text-error border border-error/20"
                            : "bg-warning/10 text-warning border border-warning/20"
                        }`}
                      >
                        Payment: {order.paymentStatus}
                      </span>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                          order.orderStatus === "confirmed"
                            ? "bg-info/10 text-info border border-info/20"
                            : order.orderStatus === "delivered"
                            ? "bg-success/10 text-success border border-success/20"
                            : "bg-base-300 text-base-content/70"
                        }`}
                      >
                        Status: {order.orderStatus}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row gap-8">
                    <div className="flex-1 space-y-4">
                      <h4 className="text-sm font-bold uppercase tracking-widest text-base-content/60 mb-4">
                        Items Ordered
                      </h4>
                      {order.cartItems.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-4">
                          <div className="flex-1">
                            <p className="font-medium text-base-content text-sm">
                              {item.name}
                            </p>
                            <p className="text-xs text-base-content/60 mt-0.5">
                              Qty: {item.quantity} × ৳{item.price}
                            </p>
                            {item.details && (
                              <div className="mt-2 p-3 bg-base-200 rounded-lg text-[10px] space-y-1 border border-base-300">
                                <p><span className="font-bold uppercase opacity-50">Flavor:</span> {item.details.flavor}</p>
                                <p><span className="font-bold uppercase opacity-50">Size:</span> {item.details.size}</p>
                                <p><span className="font-bold uppercase opacity-50">Cream:</span> {item.details.cream}</p>
                                {item.details.message && (
                                  <p><span className="font-bold uppercase opacity-50">Message:</span> <span className="italic">&quot;{item.details.message}&quot;</span></p>
                                )}
                                {item.details.deliveryDate && (
                                  <p><span className="font-bold uppercase opacity-50">Requested Date:</span> {item.details.deliveryDate}</p>
                                )}
                              </div>
                            )}
                          </div>
                          <p className="font-bold text-base-content text-sm">
                            ৳{(item.quantity * item.price).toLocaleString()}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="w-full md:w-64 bg-base-200/50 rounded-xl p-5 border border-base-200">
                      <h4 className="text-sm font-bold uppercase tracking-widest text-base-content/60 mb-4">
                        Order Summary
                      </h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between text-base-content/80">
                          <span>Subtotal</span>
                          <span>৳{order.totalAmount.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-base-content/80">
                          <span>Shipping</span>
                          <span>Free</span>
                        </div>
                        <div className="pt-3 mt-3 border-t border-base-300 flex justify-between font-bold text-lg text-primary">
                          <span>Total</span>
                          <span>৳{order.totalAmount.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}
