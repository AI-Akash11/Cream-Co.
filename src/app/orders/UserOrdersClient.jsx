"use client";

import React, { useState, useEffect, useCallback } from "react";
import { getUserOrders } from "@/actions/server/order";
import Container from "@/components/ui/Container";
import Link from "next/link";
import { format } from "date-fns";
import { HiOutlineShoppingBag, HiArrowLeft, HiArrowRight } from "react-icons/hi";

export default function UserOrdersClient({ initialData, userEmail }) {
  const [orders, setOrders] = useState(initialData.orders || []);
  const [totalPages, setTotalPages] = useState(initialData.totalPages || 1);
  const [currentPage, setCurrentPage] = useState(initialData.page || 1);
  const [isLoading, setIsLoading] = useState(false);

  const fetchOrders = useCallback(async (page = 1) => {
    setIsLoading(true);
    const result = await getUserOrders(userEmail, page, 5);
    if (result.success) {
      setOrders(result.orders);
      setTotalPages(result.totalPages);
      setCurrentPage(result.page);
    }
    setIsLoading(false);
  }, [userEmail]);

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

          <div className="relative min-h-[400px]">
            {isLoading && (
              <div className="absolute inset-0 z-10 bg-base-100/50 flex items-center justify-center backdrop-blur-sm">
                <span className="loading loading-spinner loading-lg text-primary"></span>
              </div>
            )}

            {orders.length === 0 && !isLoading ? (
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

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="mt-12 flex items-center justify-center gap-4">
                    <button
                      onClick={() => fetchOrders(currentPage - 1)}
                      disabled={currentPage === 1 || isLoading}
                      className="p-2 border border-base-300 rounded-full text-base-content hover:bg-primary hover:text-white transition-all disabled:opacity-20 hover:scale-105"
                    >
                      <HiArrowLeft className="w-5 h-5" />
                    </button>

                    <div className="flex items-center gap-2">
                       {Array.from({ length: totalPages }).map((_, i) => (
                         <button
                           key={i}
                           onClick={() => fetchOrders(i + 1)}
                           disabled={isLoading}
                           className={`w-10 h-10 rounded-full text-xs font-bold transition-all border-2 ${
                             currentPage === i + 1
                               ? "bg-primary text-white border-primary shadow-lg shadow-primary/20"
                               : "border-transparent text-base-content/60 hover:border-base-300"
                           }`}
                         >
                           {i + 1}
                         </button>
                       ))}
                    </div>

                    <button
                      onClick={() => fetchOrders(currentPage + 1)}
                      disabled={currentPage === totalPages || isLoading}
                      className="p-2 border border-base-300 rounded-full text-base-content hover:bg-primary hover:text-white transition-all disabled:opacity-20 hover:scale-105"
                    >
                      <HiArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}
