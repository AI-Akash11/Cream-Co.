"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { FiCheckCircle, FiAlertCircle } from "react-icons/fi";
import Link from "next/link";
import { markOrderPaid } from "@/actions/server/order";
import { useCart } from "@/context/CartContext";

export default function PaymentSuccess() {
  const searchParams = useSearchParams();
  const { clearCart } = useCart();
  // Ref to make sure we only run the confirmation logic once,
  // even if clearCart changes reference across renders (which would normally
  // cause an infinite loop if included in the dependency array).
  const hasRun = useRef(false);

  const sessionId = searchParams.get("session_id");
  const orderId = searchParams.get("order_id");

  const [status, setStatus] = useState(
    () => (!sessionId || !orderId ? "error" : "loading")
  );

  useEffect(() => {
    // Guard: only run once, and only if we have the required params
    if (hasRun.current || !sessionId || !orderId) return;
    hasRun.current = true;

    // Mark order as paid in DB and clear cart
    markOrderPaid(orderId)
      .then((res) => {
        if (res.success) {
          localStorage.removeItem("creamAndCo_deliveryInfo");
          clearCart();
          setStatus("success");
        } else {
          setStatus("error");
        }
      })
      .catch(() => setStatus("error"));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty deps — intentional. hasRun.current prevents double-fire.

  if (status === "loading") {
    return (
      <div className="min-h-[60vh] flex items-center justify-center flex-col gap-4">
        <span className="loading loading-spinner loading-lg text-primary"></span>
        <p className="text-base-content/60 font-medium">Confirming your payment…</p>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="min-h-[60vh] flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center space-y-6 bg-base-200 p-8 rounded-3xl shadow-xl">
          <div className="w-20 h-20 bg-error/20 text-error rounded-full flex items-center justify-center mx-auto">
            <FiAlertCircle size={40} />
          </div>
          <h1 className="text-3xl font-serif font-bold italic">Something went wrong</h1>
          <p className="text-base-content/70">
            We couldn&apos;t confirm your payment. If money was deducted, please contact support with your order details.
          </p>
          <div className="pt-6 border-t border-base-300 flex flex-col gap-3">
            <Link href="/" className="btn btn-primary w-full rounded-xl font-bold">
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[60vh] flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-6 bg-base-200 p-8 rounded-3xl shadow-xl">
        <div className="w-20 h-20 bg-success/20 text-success rounded-full flex items-center justify-center mx-auto mb-6">
          <FiCheckCircle size={40} />
        </div>
        <h1 className="text-3xl font-serif font-bold italic">Order Confirmed!</h1>
        <p className="text-base-content/70">
          Thank you for your purchase! We&apos;ve received your payment and are beginning preparation on your order.
        </p>
        <div className="pt-6 border-t border-base-300 flex flex-col gap-3">
          <Link href="/" className="btn btn-primary w-full rounded-xl font-bold">
            Return to Home
          </Link>
          <Link href="/shop" className="btn btn-outline w-full rounded-xl font-bold">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
