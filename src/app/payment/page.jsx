"use client";

import { useCart } from "@/context/CartContext";
import { FiCreditCard, FiLock } from "react-icons/fi";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { createOrderAndStripeSession } from "@/actions/server/order";
import Swal from "sweetalert2";

export default function PaymentPage() {
  const { cartItems, cartTotal, isHydrated } = useCart();
  const { data: session, status } = useSession();
  const router = useRouter();

  const [paymentMethod, setPaymentMethod] = useState("stripe");
  const [isProcessing, setIsProcessing] = useState(false);
  const [deliveryInfo, setDeliveryInfo] = useState(null);

  useEffect(() => {
    // Load delivery info from localStorage
    const savedInfo = localStorage.getItem("creamAndCo_deliveryInfo");
    if (savedInfo) {
      try {
        setDeliveryInfo(JSON.parse(savedInfo));
      } catch(e) {
        console.error(e);
      }
    } else {
      // If they skipped order confirmation somehow, send them back
      router.push("/order-confirmation");
    }
  }, [router]);

  // Loading state checks
  if (status === "loading" || !isHydrated || !deliveryInfo) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  // Must be logged in to pay in this flow based on requirement to save by email
  if (status === "unauthenticated") {
    router.push("/login?callbackUrl=/payment");
    return null;
  }

  if (cartItems.length === 0) {
    router.push("/shop");
    return null;
  }

  const handlePayment = async () => {
    setIsProcessing(true);

    try {
      if (paymentMethod === "stripe") {
        // Compile order data
        const orderData = {
          name: session.user.name,
          email: session.user.email,
          deliveryInfo,
          cartItems,
          cartTotal: cartTotal + 100 // 100 is shipping
        };

        const res = await createOrderAndStripeSession(orderData);
        
        if (res.success && res.url) {
          window.location.href = res.url;
        } else {
          throw new Error(res.message || "Failed to create checkout session");
        }
      } else if (paymentMethod === "sslcommerz") {
        const orderData = {
          name: session.user.name,
          email: session.user.email,
          deliveryInfo,
          cartItems,
          cartTotal: cartTotal + 100 // 100 is shipping
        };

        const res = await fetch("/api/sslcommerz/init", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(orderData),
        });
        const data = await res.json();

        if (data.success && data.url) {
          window.location.href = data.url;
        } else {
          throw new Error(data.message || "Failed to initiate SSLCommerz payment");
        }
      }
    } catch (error) {
      console.error(error);
      setIsProcessing(false);
      Swal.fire({
        icon: "error",
        title: "Payment Error",
        text: error.message || "An error occurred while processing your request. Please try again."
      });
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 lg:py-20">
      <h1 className="text-4xl font-serif font-bold italic mb-10 text-center">
        Select Payment Method
      </h1>

      <div className="bg-base-200 p-6 md:p-8 rounded-3xl shadow-sm border border-base-300">
        <h2 className="text-xl font-bold mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            Payment Options
          </div>
          <FiLock className="text-success" title="Secure Payment" />
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Stripe Option */}
          <label
            className={`flex flex-col items-center justify-center p-6 border-2 rounded-2xl cursor-pointer transition-all ${
              paymentMethod === "stripe"
                ? "border-primary bg-primary/5"
                : "border-base-300 hover:border-primary/50"
            }`}
          >
            <input
              type="radio"
              name="payment"
              className="radio radio-primary hidden"
              checked={paymentMethod === "stripe"}
              onChange={() => setPaymentMethod("stripe")}
            />
            <FiCreditCard
              size={32}
              className={`mb-3 ${paymentMethod === "stripe" ? "text-primary" : "text-base-content/40"}`}
            />
            <span className="font-bold text-center">Credit Card</span>
            <span className="text-[10px] text-base-content/50 uppercase tracking-widest mt-1">
              Via Stripe
            </span>
          </label>

          {/* SSLCommerz Option */}
          <label
            className={`flex flex-col items-center justify-center p-6 border-2 rounded-2xl cursor-pointer transition-all ${
              paymentMethod === "sslcommerz"
                ? "border-primary bg-primary/5"
                : "border-base-300 hover:border-primary/50"
            }`}
          >
            <input
              type="radio"
              name="payment"
              className="radio radio-primary hidden"
              checked={paymentMethod === "sslcommerz"}
              onChange={() => setPaymentMethod("sslcommerz")}
            />
            <div
              className={`text-xl font-bold tracking-tighter mb-4 flex items-center ${paymentMethod === "sslcommerz" ? "text-blue-600" : "text-base-content/40"}`}
            >
              SSL<span className="opacity-50">COMMERZ</span>
            </div>
            <span className="font-bold text-center">Mobile & Cards</span>
            <span className="text-[10px] text-base-content/50 uppercase tracking-widest mt-1">
              Local Gateway
            </span>
          </label>
        </div>

        <div className="mt-8 space-y-3 pt-6 border-t border-base-300">
          <div className="flex justify-between text-lg font-bold">
            <span>Amount to Pay</span>
            <span className="text-primary italic font-serif">
              ৳{(cartTotal + 100).toLocaleString()}
            </span>
          </div>
        </div>

        <button
          onClick={handlePayment}
          disabled={isProcessing}
          className="btn btn-primary w-full h-14 rounded-xl text-lg font-bold shadow-lg shadow-primary/20 hover:-translate-y-1 transition-all mt-8 gap-2"
        >
          {isProcessing ? (
            <span className="loading loading-spinner"></span>
          ) : (
            `Pay ৳${(cartTotal + 100).toLocaleString()}`
          )}
        </button>
        <p className="text-center text-[10px] text-base-content/50 uppercase tracking-widest mt-4 flex items-center justify-center gap-1">
          <FiLock /> Secure Encrypted Transaction
        </p>
      </div>
    </div>
  );
}
