"use client";

import { useCart } from "@/context/CartContext";
import { FiCreditCard, FiLock, FiCheckCircle } from "react-icons/fi";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function CheckoutPage() {
  const { cartItems, cartTotal } = useCart();
  const [paymentMethod, setPaymentMethod] = useState("stripe");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleCheckout = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate backend payment processing delay
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
    }, 2000);
  };

  if (isSuccess) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center space-y-6 bg-base-200 p-8 rounded-3xl shadow-xl">
          <div className="w-20 h-20 bg-success/20 text-success rounded-full flex items-center justify-center mx-auto mb-6">
            <FiCheckCircle size={40} />
          </div>
          <h1 className="text-3xl font-serif font-bold italic">
            Order Confirmed!
          </h1>
          <p className="text-base-content/70">
            Thank you for your purchase. We've received your order and are
            beginning preparation.
          </p>
          <div className="pt-6 border-t border-base-300">
            <Link
              href="/"
              className="btn btn-primary w-full rounded-xl font-bold"
            >
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-4 text-center">
        <h1 className="text-3xl font-serif font-bold italic mb-4">Checkout</h1>
        <p className="text-base-content/60 mb-8 max-w-md">
          Your cart is currently empty. Add some delicious treats before
          proceeding to checkout.
        </p>
        <Link href="/shop" className="btn btn-primary rounded-xl px-8">
          Browse Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-8 py-12 lg:py-20">
      <h1 className="text-4xl font-serif font-bold italic mb-10">
        Secure Checkout
      </h1>

      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        {/* Left Column: Form & Payment */}
        <div className="flex-1 space-y-8">
          {/* Contact Info */}
          <section className="bg-base-200 p-6 md:p-8 rounded-3xl shadow-sm border border-base-300">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-primary text-white text-xs flex items-center justify-center shrink-0">
                1
              </span>
              Contact Information
            </h2>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label text-xs font-bold opacity-70">
                    First Name
                  </label>
                  <input
                    type="text"
                    className="input input-bordered w-full rounded-xl focus:border-primary"
                    placeholder="John"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label text-xs font-bold opacity-70">
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="input input-bordered w-full rounded-xl focus:border-primary"
                    placeholder="Doe"
                    required
                  />
                </div>
              </div>
              <div className="form-control">
                <label className="label text-xs font-bold opacity-70">
                  Email Array
                </label>
                <input
                  type="email"
                  className="input input-bordered w-full rounded-xl focus:border-primary"
                  placeholder="email@example.com"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label text-xs font-bold opacity-70">
                  Phone Number
                </label>
                <input
                  type="tel"
                  className="input input-bordered w-full rounded-xl focus:border-primary"
                  placeholder="+880 17..."
                  required
                />
              </div>
            </div>
          </section>

          {/* Delivery Info */}
          <section className="bg-base-200 p-6 md:p-8 rounded-3xl shadow-sm border border-base-300">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-primary text-white text-xs flex items-center justify-center shrink-0">
                2
              </span>
              Delivery Details
            </h2>
            <div className="space-y-4">
              <div className="form-control">
                <label className="label text-xs font-bold opacity-70">
                  Street Address
                </label>
                <input
                  type="text"
                  className="input input-bordered w-full rounded-xl focus:border-primary"
                  placeholder="123 Bakery Lane"
                  required
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="form-control md:col-span-2">
                  <label className="label text-xs font-bold opacity-70">
                    Area / City
                  </label>
                  <input
                    type="text"
                    className="input input-bordered w-full rounded-xl focus:border-primary"
                    placeholder="Gulshan, Dhaka"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label text-xs font-bold opacity-70">
                    Zip Code
                  </label>
                  <input
                    type="text"
                    className="input input-bordered w-full rounded-xl focus:border-primary"
                    placeholder="1212"
                    required
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Payment Method */}
          <section className="bg-base-200 p-6 md:p-8 rounded-3xl shadow-sm border border-base-300">
            <h2 className="text-xl font-bold mb-6 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-primary text-white text-xs flex items-center justify-center shrink-0">
                  3
                </span>
                Payment Method
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

            {/* Dummy Card Input (Only shows if Stripe) */}
            {paymentMethod === "stripe" && (
              <div className="mt-6 p-6 border border-base-300 rounded-2xl bg-base-100">
                <div className="space-y-4">
                  <div className="form-control">
                    <label className="label text-xs font-bold opacity-70">
                      Card Number
                    </label>
                    <input
                      type="text"
                      className="input input-bordered w-full rounded-xl focus:border-primary font-mono"
                      placeholder="0000 0000 0000 0000"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="form-control">
                      <label className="label text-xs font-bold opacity-70">
                        Expiry (MM/YY)
                      </label>
                      <input
                        type="text"
                        className="input input-bordered w-full rounded-xl focus:border-primary font-mono"
                        placeholder="12/26"
                      />
                    </div>
                    <div className="form-control">
                      <label className="label text-xs font-bold opacity-70">
                        CVC
                      </label>
                      <input
                        type="text"
                        className="input input-bordered w-full rounded-xl focus:border-primary font-mono"
                        placeholder="123"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </section>
        </div>

        {/* Right Column: Order Summary */}
        <div className="w-full lg:w-96 shrink-0">
          <div className="bg-base-200 p-6 rounded-3xl sticky top-24 shadow-md border border-base-300">
            <h2 className="text-xl font-serif font-bold italic mb-6">
              Order Summary
            </h2>

            <ul className="space-y-4 mb-6 max-h-[40vh] overflow-y-auto pr-2">
              {cartItems.map((item) => (
                <li key={item.id} className="flex gap-4 items-center">
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-base-300 shrink-0">
                    {item.image && (
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-sm truncate">{item.name}</h3>
                    <p className="text-xs text-base-content/60 mt-1">
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <div className="font-bold text-sm text-right shrink-0">
                    ৳{(item.basePrice * item.quantity).toLocaleString()}
                  </div>
                </li>
              ))}
            </ul>

            <div className="space-y-3 pt-6 border-t border-base-300">
              <div className="flex justify-between text-sm opacity-80">
                <span>Subtotal</span>
                <span>৳{cartTotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm opacity-80">
                <span>Shipping (Standard)</span>
                <span>৳100</span>
              </div>
              <div className="flex justify-between text-lg font-bold pt-3 border-t border-base-300">
                <span>Total</span>
                <span className="text-primary italic font-serif">
                  ৳{(cartTotal + 100).toLocaleString()}
                </span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
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
      </div>
    </div>
  );
}
