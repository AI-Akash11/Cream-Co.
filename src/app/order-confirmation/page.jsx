"use client";

import { useCart } from "@/context/CartContext";
import { FiLock, FiArrowRight } from "react-icons/fi";
import Swal from "sweetalert2";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function OrderConfirmation() {
  const { cartItems, cartTotal } = useCart();
  const { data: session } = useSession();
  const router = useRouter();

  const [deliveryInfo, setDeliveryInfo] = useState({
    phone: "",
    address: "",
    city: "",
    zip: ""
  });

  const [isProcessing, setIsProcessing] = useState(false);

  const handleProceedToPayment = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    // Basic validation
    if (!deliveryInfo.phone || !deliveryInfo.address || !deliveryInfo.city || !deliveryInfo.zip) {
      Swal.fire({
        icon: "error",
        title: "Missing Information",
        text: "Please fill in all delivery details.",
        toast: true,
        position: "top-end",
        timer: 3000,
        showConfirmButton: false
      });
      setIsProcessing(false);
      return;
    }

    // Save delivery info to localStorage to pick it up on the payment page
    localStorage.setItem("creamAndCo_deliveryInfo", JSON.stringify(deliveryInfo));
    
    // Navigate to payment
    router.push("/payment");
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-4 text-center">
        <h1 className="text-3xl font-serif font-bold italic mb-4">Order Confirmation</h1>
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
                    Name
                  </label>
                  <input
                    type="text"
                    className="input input-bordered w-full rounded-xl focus:border-primary bg-base-200/50 cursor-not-allowed text-base-content/70"
                    placeholder="Your Name"
                    value={session?.user?.name || ""}
                    readOnly
                  />
                </div>
                <div className="form-control">
                  <label className="label text-xs font-bold opacity-70">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="input input-bordered w-full rounded-xl focus:border-primary bg-base-200/50 cursor-not-allowed text-base-content/70"
                    placeholder="email@example.com"
                    value={session?.user?.email || ""}
                    readOnly
                  />
                </div>
              </div>
              <div className="form-control">
                <label className="label text-xs font-bold opacity-70">
                  Phone Number
                </label>
                <input
                  type="tel"
                  className="input input-bordered w-full rounded-xl focus:border-primary"
                  placeholder="+880 17..."
                  value={deliveryInfo.phone}
                  onChange={(e) => setDeliveryInfo({ ...deliveryInfo, phone: e.target.value })}
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
                  value={deliveryInfo.address}
                  onChange={(e) => setDeliveryInfo({ ...deliveryInfo, address: e.target.value })}
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
                    value={deliveryInfo.city}
                    onChange={(e) => setDeliveryInfo({ ...deliveryInfo, city: e.target.value })}
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
                    value={deliveryInfo.zip}
                    onChange={(e) => setDeliveryInfo({ ...deliveryInfo, zip: e.target.value })}
                    required
                  />
                </div>
              </div>
            </div>
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
              onClick={handleProceedToPayment}
              disabled={isProcessing}
              className="btn btn-primary w-full h-14 rounded-xl text-lg font-bold shadow-lg shadow-primary/20 hover:-translate-y-1 transition-all mt-8 gap-2"
            >
              {isProcessing ? (
                <span className="loading loading-spinner"></span>
              ) : (
                `Proceed to Payment`
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
