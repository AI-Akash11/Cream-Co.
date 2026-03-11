"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Container from "@/components/ui/Container";

const images = [
  "/BannerCakeImage.jpg",
  "/BannerCakeImage2.jpg",
  "/BannerCakeImage3.jpg",
  "/BannerCakeImage4.jpg",
];

const BannerSlider = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const sliderRef = useRef(null);

  const goNext = () => setActiveIndex((prev) => (prev + 1) % images.length);
  const goPrev = () => setActiveIndex((prev) => (prev - 1 + images.length) % images.length);

  useEffect(() => {
    const interval = setInterval(goNext, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!sliderRef.current) return;
    gsap.fromTo(
      sliderRef.current.children,
      { opacity: 0, x: 20 },
      { opacity: 1, x: 0, duration: 0.8, ease: "power2.out" }
    );
  }, [activeIndex]);

  return (
    <div className="flex flex-col gap-6 w-full max-w-[600px] mx-auto lg:mx-0">
      {/* Image Container */}
      <div className="relative aspect-4/3 sm:aspect-video lg:aspect-4/3 rounded-[2.5rem] overflow-hidden shadow-2xl group">
        <div ref={sliderRef} className="absolute inset-0 w-full h-full">
          <Image
            key={images[activeIndex]}
            src={images[activeIndex]}
            alt={`Cake Slider ${activeIndex + 1}`}
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>

      {/* Slider Controls Below Image */}
      <div className="flex items-center justify-center gap-4">
        <button
          onClick={goPrev}
          className="btn btn-circle btn-sm bg-white border-none shadow-md text-primary hover:bg-primary hover:text-white"
        >
          <FaChevronLeft size={12} />
        </button>
        <div className="flex gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                activeIndex === i ? "w-8 bg-primary/60" : "w-1.5 bg-primary/20"
              }`}
            />
          ))}
        </div>
        <button
          onClick={goNext}
          className="btn btn-circle btn-sm bg-white border-none shadow-md text-primary hover:bg-primary hover:text-white"
        >
          <FaChevronRight size={12} />
        </button>
      </div>
    </div>
  );
};

const Banner = () => {
  return (
    <section className="relative w-full py-16 sm:py-20 lg:py-24 bg-linear-to-br from-[#f7cac9] via-[#fff0e6] to-[#e7b8a3] overflow-hidden">
      <Container className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">
        {/* Left Content */}
        <div className="flex-1 flex flex-col items-start gap-8 w-full max-w-2xl order-2 lg:order-1">
          <div className="space-y-3 sm:space-y-4">
            <span className="uppercase text-xs font-semibold tracking-[0.25em] text-primary/70">
              Welcome to Cream & Co.
            </span>
            <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-serif font-bold text-primary leading-[1.2]">
              Artisan Cakes <span className="text-primary/60 italic font-normal">&</span> <br />
              Fresh Pastries
            </h1>
            <p className="text-sm sm:text-base text-black/70 max-w-lg leading-relaxed">
              Handcrafted with premium ingredients in the heart of Dhaka. Every bite tells a story of tradition, passion, and celebration.
            </p>
          </div>

          <div className="flex flex-wrap gap-4 w-full">
            <Link
              href="/shop"
              className="btn btn-primary h-12 px-8 font-bold shadow-xl shadow-primary/20 rounded-xl"
            >
              Shop Collection
            </Link>
            <Link
              href="/custom"
              className="btn btn-outline h-12 px-8 font-bold border-primary/20 text-primary hover:bg-primary hover:text-primary-content rounded-xl"
            >
              Custom Creation
            </Link>
          </div>

          {/* Bullets with green dots */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            {[
              "Same-day pastries",
              "Fresh baked daily",
              "Delivery slots"
            ].map((text) => (
              <div key={text} className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-success shadow-sm shadow-success/40" />
                <span className="text-xs font-semibold text-gray-600">{text}</span>
              </div>
            ))}
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-300 w-full">
            {["Cakes", "Pastries", "Cheesecake", "Chocolate"].map((cat) => (
              <button
                key={cat}
                className="px-5 py-2 rounded-lg border border-base-300 text-[10px] font-bold text-gray-600 uppercase tracking-widest hover:bg-primary hover:text-primary-content hover:border-primary transition-all duration-300 shadow-sm"
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Right Slider */}
        <div className="flex-1 w-full order-2 lg:order-2 flex justify-center lg:justify-end">
           <BannerSlider />
        </div>
      </Container>
    </section>
  );
};

export default Banner;
