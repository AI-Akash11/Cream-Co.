"use client";

import { useCart } from "@/context/CartContext";
import {
  FiX,
  FiPlus,
  FiMinus,
  FiTrash2,
  FiShoppingBag,
  FiArrowRight,
} from "react-icons/fi";
import Image from "next/image";
import Link from "next/link";

export default function CartDrawer() {
  const {
    cartItems,
    cartTotal,
    removeFromCart,
    updateQuantity,
    isCartOpen,
    setIsCartOpen,
  } = useCart();

  if (!isCartOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-100 transition-opacity duration-300"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Drawer */}
      <div className="fixed top-0 right-0 h-full w-full max-w-md bg-base-100 shadow-2xl z-101 flex flex-col transform transition-transform duration-300 translate-x-0">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-base-200">
          <h2 className="text-xl font-serif font-bold italic flex items-center gap-2">
            <FiShoppingBag /> Your Cart
          </h2>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-2 hover:bg-base-200 rounded-full transition-colors"
          >
            <FiX size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center opacity-60 gap-4">
              <FiShoppingBag size={48} className="mb-2" />
              <p className="font-serif italic text-lg text-base-content/80">
                Your cart is delightfully empty.
              </p>
              <button
                className="btn btn-outline btn-sm rounded-full mt-2"
                onClick={() => setIsCartOpen(false)}
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <ul className="space-y-6">
              {cartItems.map((item) => (
                <li key={item.id} className="flex gap-4">
                  <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-base-200 shrink-0 border border-base-200">
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-base-200">
                        <span className="text-xs opacity-40">No Image</span>
                      </div>
                    )}
                  </div>

                  <div className="flex-1 flex flex-col justify-between py-1">
                    <div className="flex justify-between items-start">
                      <h3 className="font-serif font-bold text-base leading-tight pr-4">
                        {item.name}
                      </h3>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-error/70 hover:text-error transition-colors p-1"
                      >
                        <FiTrash2 size={16} />
                      </button>
                    </div>

                    <div className="flex items-end justify-between mt-2">
                      <div className="flex items-center gap-3 bg-base-200 rounded-lg p-1">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="w-6 h-6 flex items-center justify-center bg-base-100 rounded-md hover:bg-base-300 transition-colors shadow-sm"
                        >
                          <FiMinus size={12} />
                        </button>
                        <span className="text-sm font-bold w-4 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="w-6 h-6 flex items-center justify-center bg-base-100 rounded-md hover:bg-base-300 transition-colors shadow-sm"
                        >
                          <FiPlus size={12} />
                        </button>
                      </div>
                      <p className="font-bold text-primary">
                        ৳
                        {(
                          (item.basePrice || 0) * item.quantity
                        ).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="p-6 bg-base-200/50 border-t border-base-200">
            <div className="flex justify-between items-center mb-4">
              <span className="text-base-content/70 font-medium">Subtotal</span>
              <span className="text-xl font-bold font-serif italic text-primary">
                ৳{cartTotal.toLocaleString()}
              </span>
            </div>
            <p className="text-[10px] uppercase tracking-widest text-base-content/50 mb-6 font-bold">
              Shipping & taxes calculated at checkout
            </p>
            <Link
              href="/checkout"
              onClick={() => setIsCartOpen(false)}
              className="btn btn-primary w-full h-14 rounded-xl text-lg font-bold shadow-lg shadow-primary/20 hover:-translate-y-1 transition-all group gap-2"
            >
              Go to Checkout{" "}
              <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
