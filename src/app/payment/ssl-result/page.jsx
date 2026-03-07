"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { FiCheckCircle, FiAlertCircle } from "react-icons/fi";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function SSLResultPage() {
  const searchParams = useSearchParams();
  const { clearCart } = useCart();
  const hasCleared = useRef(false);

  const status = searchParams.get("status");

  useEffect(() => {
    if (status === "success" && !hasCleared.current) {
      hasCleared.current = true;
      localStorage.removeItem("creamAndCo_deliveryInfo");
      clearCart();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (status === "success") {
    return (
      <div className="min-h-[60vh] flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center space-y-6 bg-base-200 p-8 rounded-3xl shadow-xl">
          <div className="w-20 h-20 bg-success/20 text-success rounded-full flex items-center justify-center mx-auto mb-6">
            <FiCheckCircle size={40} />
          </div>
          <h1 className="text-3xl font-serif font-bold italic">Order Confirmed!</h1>
          <p className="text-base-content/70">
            Your payment was successful. We&apos;ve received your order and are beginning preparation.
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

  if (status === "cancelled") {
    return (
      <div className="min-h-[60vh] flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center space-y-6 bg-base-200 p-8 rounded-3xl shadow-xl">
          <div className="w-20 h-20 bg-warning/20 text-warning rounded-full flex items-center justify-center mx-auto">
            <FiAlertCircle size={40} />
          </div>
          <h1 className="text-3xl font-serif font-bold italic">Payment Cancelled</h1>
          <p className="text-base-content/70">
            You cancelled the payment. Your cart is still saved — you can try again whenever you&apos;re ready.
          </p>
          <div className="pt-6 border-t border-base-300 flex flex-col gap-3">
            <Link href="/payment" className="btn btn-primary w-full rounded-xl font-bold">
              Try Again
            </Link>
            <Link href="/" className="btn btn-outline w-full rounded-xl font-bold">
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Default: fail
  return (
    <div className="min-h-[60vh] flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-6 bg-base-200 p-8 rounded-3xl shadow-xl">
        <div className="w-20 h-20 bg-error/20 text-error rounded-full flex items-center justify-center mx-auto">
          <FiAlertCircle size={40} />
        </div>
        <h1 className="text-3xl font-serif font-bold italic">Payment Failed</h1>
        <p className="text-base-content/70">
          We couldn&apos;t process your payment. Please try again or contact support.
        </p>
        <div className="pt-6 border-t border-base-300 flex flex-col gap-3">
          <Link href="/payment" className="btn btn-primary w-full rounded-xl font-bold">
            Try Again
          </Link>
          <Link href="/" className="btn btn-outline w-full rounded-xl font-bold">
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
