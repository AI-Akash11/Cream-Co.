"use client";

import React, { useState, useEffect, useCallback } from "react";
import { format } from "date-fns";
import { HiOutlineUser, HiOutlineShoppingBag } from "react-icons/hi";
import { FiChevronLeft, FiChevronRight, FiSearch, FiFilter } from "react-icons/fi";
import Container from "@/components/ui/Container";
import { getAllOrders } from "@/actions/server/order";

export default function AdminOrdersClient({ initialData }) {
  const [orders, setOrders] = useState(initialData.orders || []);
  const [total, setTotal] = useState(initialData.total || 0);
  const [totalPages, setTotalPages] = useState(initialData.totalPages || 1);
  const [currentPage, setCurrentPage] = useState(initialData.page || 1);
  const [isLoading, setIsLoading] = useState(false);

  // Revenue logic using current page orders as a snapshot for stats
  // For true total revenue, we'd need a separate server action or return it in the pagination object
  // For now, we'll calculate based on the current page for simplicity, or just show the total count
  const itemsOnPage = orders.length;
  const pageRevenue = orders
    .filter((o) => o.paymentStatus === "paid" || o.orderStatus === "confirmed")
    .reduce((sum, o) => sum + o.totalAmount, 0);

  const fetchOrders = useCallback(async (page = 1) => {
    setIsLoading(true);
    const result = await getAllOrders(page, 10);
    if (result.success) {
      setOrders(result.orders);
      setTotal(result.total);
      setTotalPages(result.totalPages);
      setCurrentPage(result.page);
    }
    setIsLoading(false);
  }, []);

  return (
    <div className="max-w-6xl mx-auto flex flex-col gap-8">
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-serif font-black text-base-content">All Orders</h1>
          <p className="text-base-content/60 mt-1">Found total {total} orders in your collection</p>
        </div>

        {/* Stats Cards */}
        <div className="flex flex-wrap gap-4">
          <div className="bg-base-200 p-4 px-6 rounded-2xl border border-base-300 min-w-[140px]">
            <p className="text-[10px] font-bold text-base-content/40 uppercase tracking-widest mb-1">
              Total Orders
            </p>
            <p className="text-2xl font-black">{total}</p>
          </div>
          <div className="bg-base-200 p-4 px-6 rounded-2xl border border-base-300 min-w-[140px]">
            <p className="text-[10px] font-bold text-base-content/40 uppercase tracking-widest mb-1">
              Page Revenue
            </p>
            <p className="text-2xl font-black text-primary">
              ৳{pageRevenue.toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-base-100 rounded-3xl shadow-xl overflow-hidden border border-base-300">
        <div className="overflow-x-auto">
          <table className="table table-lg w-full">
            <thead>
              <tr className="bg-base-200/50 text-[10px] uppercase tracking-widest font-black opacity-60">
                <th>Date & ID</th>
                <th>Customer</th>
                <th>Items</th>
                <th className="text-right">Total</th>
                <th className="text-center">Payment</th>
                <th className="text-center">Status</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan="6" className="text-center py-20">
                    <span className="loading loading-spinner loading-lg text-primary"></span>
                  </td>
                </tr>
              ) : orders.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-20 opacity-40">
                    No orders have been placed yet.
                  </td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr key={order._id} className="hover:bg-base-200/30 transition-colors">
                    <td>
                      <div className="flex flex-col">
                        <span className="font-bold text-sm">
                          {format(new Date(order.createdAt), "MMM d, yyyy")}
                        </span>
                        <span className="text-[10px] opacity-50 font-mono mt-0.5 uppercase tracking-tighter font-bold">
                          #{order._id.slice(-6)}
                        </span>
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-base-200 flex items-center justify-center shrink-0 border border-base-300">
                          <HiOutlineUser className="text-base-content/40" />
                        </div>
                        <div className="flex flex-col">
                          <span className="font-bold text-sm truncate max-w-[150px]">
                            {order.userName}
                          </span>
                          <span className="text-[11px] opacity-50 truncate max-w-[150px]">
                            {order.email}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                          <HiOutlineShoppingBag className="text-primary" />
                          <span className="text-xs font-black">
                            {order.cartItems.reduce((acc, item) => acc + item.quantity, 0)} Items
                          </span>
                        </div>
                        <div className="flex flex-col gap-1 ml-0 mt-1">
                          {order.cartItems.map((item, i) => (
                            <div key={i} className="text-[10px] leading-tight font-medium opacity-60">
                              <span className="font-bold">{item.name}</span> (x{item.quantity})
                            </div>
                          ))}
                        </div>
                      </div>
                    </td>
                    <td className="text-right">
                      <span className="font-black text-sm text-primary">
                        ৳{order.totalAmount.toLocaleString()}
                      </span>
                    </td>
                    <td>
                      <div className="flex justify-center">
                        <span
                          className={`px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${
                            order.paymentStatus === "paid"
                              ? "bg-success/10 text-success border border-success/20"
                              : order.paymentStatus === "cancelled" || order.paymentStatus === "failed"
                              ? "bg-error/10 text-error border border-error/20"
                              : "bg-warning/10 text-warning border border-warning/20"
                          }`}
                        >
                          {order.paymentStatus}
                        </span>
                      </div>
                    </td>
                    <td>
                      <div className="flex justify-center">
                        <span
                          className={`px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${
                            order.orderStatus === "confirmed"
                              ? "bg-info/10 text-info border border-info/20"
                              : order.orderStatus === "delivered"
                              ? "bg-success/10 text-success border border-success/20"
                              : "bg-base-300 text-base-content/60 border border-base-300"
                          }`}
                        >
                          {order.orderStatus}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="p-6 border-t border-base-200 flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-widest opacity-50">
              Page {currentPage} of {totalPages}
            </span>
            <div className="join gap-1">
              <button
                className="btn btn-sm join-item rounded-lg"
                disabled={currentPage === 1 || isLoading}
                onClick={() => fetchOrders(currentPage - 1)}
              >
                <FiChevronLeft />
              </button>
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  className={`btn btn-sm join-item rounded-lg w-10 ${
                    currentPage === i + 1
                      ? "btn-primary shadow-lg shadow-primary/20"
                      : ""
                  }`}
                  onClick={() => fetchOrders(i + 1)}
                  disabled={isLoading}
                >
                  {i + 1}
                </button>
              ))}
              <button
                className="btn btn-sm join-item rounded-lg"
                disabled={currentPage === totalPages || isLoading}
                onClick={() => fetchOrders(currentPage + 1)}
              >
                <FiChevronRight />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
