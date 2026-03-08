"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { HiArrowLeft } from "react-icons/hi";
import { FaHeart } from "react-icons/fa";
import Container from "@/components/ui/Container";
import { toggleWishlist } from "@/app/actions/shop-actions";
import { useCart } from "@/context/CartContext";
import Swal from "sweetalert2";
import gsap from "gsap";

export default function CakeDetailsClient({ cake }) {
  const {
    _id,
    name,
    description,
    images,
    basePrice,
    sizes,
    flavors,
    stock,
    preparationTimeHours,
    category,
  } = cake;

  const { addToCart } = useCart();

  // Selected state
  const [selectedSize, setSelectedSize] = useState(sizes?.[0] || null);
  const [selectedFlavor, setSelectedFlavor] = useState(flavors?.[0] || null);
  const [activeImage, setActiveImage] = useState(images?.[0] || "");
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  const mainImageRef = useRef(null);

  // Animate main image when activeImage changes
  useEffect(() => {
    if (mainImageRef.current) {
      gsap.fromTo(
        mainImageRef.current,
        { opacity: 0, scale: 0.95, filter: "blur(10px)" },
        {
          opacity: 1,
          scale: 1,
          filter: "blur(0px)",
          duration: 0.6,
          ease: "power2.out",
        }
      );
    }
  }, [activeImage]);

  // Price calculation
  const currentPrice = selectedSize ? selectedSize.price : basePrice;
  const totalPrice = currentPrice * quantity;

  const handleAddToCart = async () => {
    setIsAdding(true);

    const cartItem = {
      id: `${_id}-${selectedSize?.label || "default"}-${selectedFlavor || "default"}`, // Unique ID for variants
      productId: _id,
      name: name,
      image: activeImage || images?.[0], // Keep active image if selected
      basePrice: currentPrice,
      size: selectedSize?.label,
      flavor: selectedFlavor,
      quantity,
    };

    addToCart(cartItem);

    setIsAdding(false);

    Swal.fire({
      icon: "success",
      title: "Added to Cart!",
      text: `${quantity}x ${name} has been added to your cart.`,
      toast: true,
      position: "bottom-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
    });
  };

  const handleWishlist = async () => {
    try {
      const res = await toggleWishlist(_id);
      if (res?.success) {
        // console.log("Wishlist toggled", res.message);
      }
    } catch (error) {
      // console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-base-100 py-12 sm:py-16">
      <Container>
        {/* Breadcrumb / Back button */}
        <div className="mb-8 pl-4">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-sm text-base-content/60 hover:text-primary transition-colors font-medium tracking-wide"
          >
            <HiArrowLeft className="w-5 h-5" />
            Back to Shop
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Image Gallery */}
          <div className="flex flex-col gap-6">
            <div
              ref={mainImageRef}
              className="relative aspect-4/5 w-full bg-base-200 overflow-hidden shadow-2xl rounded-sm"
            >
              <Image
                src={
                  activeImage ||
                  "https://images.unsplash.com/photo-1464347744102-11db6282f854"
                }
                alt={name}
                fill
                className="object-cover transition-transform duration-1000 hover:scale-105"
                sizes="(min-width: 1024px) 50vw, 100vw"
                priority
              />
            </div>
            {/* Thumbnails showing all images */}
            {images.length > 0 && (
              <div className="flex gap-4">
                {images.map((img, idx) => (
                  <div
                    key={idx}
                    onClick={() => setActiveImage(img)}
                    className={`relative w-24 h-32 bg-base-200 cursor-pointer border-2 transition-all ${
                      activeImage === img
                        ? "border-primary shadow-md scale-105"
                        : "border-transparent hover:border-primary/50"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${name} thumbnail ${idx}`}
                      fill
                      className="object-cover"
                      sizes="96px"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="flex flex-col lg:py-6">
            <div className="mb-8">
              <p className="text-xs text-primary font-bold uppercase tracking-widest mb-4">
                {category}
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-5xl font-serif font-black text-base-content leading-tight mb-6">
                {name}
              </h1>
              <div className="flex items-center gap-6 mb-8">
                <span className="text-3xl font-bold text-primary">
                  ৳{totalPrice.toLocaleString()}
                </span>
                {stock > 0 ? (
                  <span className="px-4 py-1.5 bg-success/10 text-success text-xs font-bold uppercase tracking-wider rounded-sm shadow-sm ring-1 ring-success/20">
                    In Stock
                  </span>
                ) : (
                  <span className="px-4 py-1.5 bg-error/10 text-error text-xs font-bold uppercase tracking-wider rounded-sm shadow-sm ring-1 ring-error/20">
                    Out of Stock
                  </span>
                )}
              </div>
              <p className="text-base text-base-content/70 leading-relaxed font-light">
                {description}
              </p>
            </div>

            <div className="w-full h-px bg-base-300 my-8"></div>

            {/* Selectors */}
            <div className="flex flex-col gap-8 mb-10">
              {/* Size Selection */}
              {sizes && sizes.length > 0 && (
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-widest text-base-content mb-4 flex items-center gap-2">
                    Select Size
                  </h3>
                  <div className="flex flex-wrap gap-4">
                    {sizes.map((size) => (
                      <button
                        key={size.label}
                        onClick={() => setSelectedSize(size)}
                        className={`px-6 py-3 border text-sm font-bold uppercase tracking-wider transition-all rounded-sm ${
                          selectedSize?.label === size.label
                            ? "border-primary bg-primary text-white shadow-lg shadow-primary/30"
                            : "border-base-300 text-base-content/80 hover:border-primary hover:text-primary"
                        }`}
                      >
                        {size.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Flavor Selection */}
              {flavors && flavors.length > 0 && (
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-widest text-base-content mb-4">
                    Select Flavor
                  </h3>
                  <div className="flex flex-wrap gap-4">
                    {flavors.map((flavor) => (
                      <button
                        key={flavor}
                        onClick={() => setSelectedFlavor(flavor)}
                        className={`px-6 py-3 border text-sm font-bold uppercase tracking-wider transition-all rounded-sm ${
                          selectedFlavor === flavor
                            ? "border-primary bg-primary text-white shadow-lg shadow-primary/30"
                            : "border-base-300 text-base-content/80 hover:border-primary hover:text-primary"
                        }`}
                      >
                        {flavor}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div>
                <h3 className="text-sm font-bold uppercase tracking-widest text-base-content mb-4">
                  Quantity
                </h3>
                <div className="flex items-center gap-6">
                  <div className="flex border-2 border-base-300 rounded-sm overflow-hidden bg-base-100">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="px-6 py-3 text-base-content hover:bg-base-200 transition-colors text-lg font-medium"
                    >
                      -
                    </button>
                    <div className="w-16 flex items-center justify-center font-bold text-lg border-x-2 border-base-300">
                      {quantity}
                    </div>
                    <button
                      onClick={() => setQuantity((q) => Math.min(stock, q + 1))}
                      className="px-6 py-3 text-base-content hover:bg-base-200 transition-colors text-lg font-medium"
                    >
                      +
                    </button>
                  </div>
                  <p className="text-xs text-base-content/40 uppercase tracking-widest font-bold">
                    {stock} Available
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-4 mt-auto">
              <button
                onClick={handleAddToCart}
                disabled={isAdding || stock === 0}
                className="flex-1 btn btn-primary text-white rounded-sm uppercase tracking-widest font-black h-16 text-lg hover:scale-[1.02] transition-transform shadow-xl shadow-primary/20"
              >
                {isAdding ? "Adding..." : "Add to Cart"}
              </button>
              <button
                onClick={handleWishlist}
                className="btn btn-outline border-2 border-base-300 text-base-content hover:bg-base-200 hover:text-red-500 hover:border-base-300 rounded-sm w-16 h-16 shrink-0 transition-all group"
                title="Add to Wishlist"
              >
                <FaHeart className="w-6 h-6 text-base-content/40 group-hover:text-red-500 transition-colors" />
              </button>
            </div>

            {preparationTimeHours && (
              <div className="mt-8 p-4 bg-base-200 rounded-sm border border-base-300">
                <p className="text-sm font-medium text-base-content/80 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-warning animate-pulse"></span>
                  Preparation time: {preparationTimeHours} hours
                </p>
                <p className="text-xs text-base-content/60 mt-2 italic">
                  * For custom modifications, please contact us directly after
                  placing your order.
                </p>
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}
