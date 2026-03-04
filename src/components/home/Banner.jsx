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

const StackedFlippingCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const topCardRef = useRef(null);

  const offsets = [0, 8, 16, 24];
  const rotations = [0, 1.5, 3, 4.5];
  const maxVisible = 4;

  const goNext = () => {
    setActiveIndex((prev) => (prev + 1) % images.length);
  };

  const goPrev = () => {
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      goNext();
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!topCardRef.current) return;

    gsap.fromTo(
      topCardRef.current,
      { y: 40, opacity: 0, scale: 0.9, rotateZ: -1.5 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        rotateZ: 0,
        duration: 0.7,
        ease: "power3.out",
        transformOrigin: "center center",
      },
    );
  }, [activeIndex]);

  return (
    <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md h-60 sm:h-72 md:h-80 lg:h-96 flex flex-col items-center gap-3">
      <div
        className="relative w-full h-full"
        style={{ perspective: "1200px", transformStyle: "preserve-3d" }}
      >
        {Array.from({ length: maxVisible }).map((_, position) => {
          const imageIndex = (activeIndex + position) % images.length;
          const src = images[imageIndex];
          const isTop = position === 0;

          return (
            <div
              key={`${src}-${position}`}
              ref={isTop ? topCardRef : null}
              className="absolute inset-0 rounded-2xl overflow-hidden shadow-2xl border border-white transition-all duration-700"
              style={{
                transform: `translateY(${offsets[position]}px) rotateZ(${rotations[position]}deg)`,
                zIndex: 20 - position,
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
              }}
            >
              <Image
                src={src}
                alt={`Cake ${imageIndex + 1}`}
                fill
                className="object-cover w-full h-full"
                priority={isTop}
                unoptimized
              />
            </div>
          );
        })}
      </div>

      <div className="flex items-center justify-center gap-4 mt-6 sm:mt-8">
        <button
          type="button"
          onClick={goPrev}
          aria-label="Previous image"
          className="btn btn-circle btn-xs sm:btn-sm bg-base-100/80 border border-primary/30 text-primary hover:bg-primary hover:text-base-100 shadow-md"
        >
          <FaChevronLeft className="text-xs sm:text-sm" />
        </button>
        <button
          type="button"
          onClick={goNext}
          aria-label="Next image"
          className="btn btn-circle btn-xs sm:btn-sm bg-base-100/80 border border-primary/30 text-primary hover:bg-primary hover:text-base-100 shadow-md"
        >
          <FaChevronRight className="text-xs sm:text-sm" />
        </button>
      </div>
    </div>
  );
};

const Banner = () => {
  return (
    <section className="relative w-full min-h-[60vh] sm:min-h-[70vh] md:min-h-[80vh] flex items-center justify-center bg-linear-to-br from-[#f7cac9] via-[#fff0e6] to-[#e7b8a3] pb-8 sm:pb-12 md:pb-16">
      <Container className="w-full flex flex-col md:flex-row items-center justify-between py-8 sm:py-12 md:py-16 lg:py-24 gap-6 sm:gap-8 md:gap-12">
        {/* Left Side */}
        <div className="flex-1 flex flex-col items-start justify-center gap-3 sm:gap-4 md:gap-6 lg:gap-8 w-full">
          <span className="uppercase text-xs sm:text-xs md:text-sm font-semibold tracking-widest text-primary/70 mb-1 sm:mb-2">
            Welcome to Cream & Co.
          </span>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-[#7a4b4b] mb-2 sm:mb-3 md:mb-4 leading-tight">
            Artisan Cakes <span className="text-[#c98e72]">&</span> Fresh
            Pastries
          </h1>
          <p className="text-sm sm:text-base md:text-lg font-medium text-[#7a4b4b]/80 mb-3 sm:mb-4 md:mb-6 max-w-full sm:max-w-lg">
            Handcrafted with premium ingredients. Every bite tells a story of
            tradition, passion, and celebration.
          </p>
          <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row gap-3 sm:gap-4 mb-3 sm:mb-4 w-full sm:w-auto">
            <Link
              href="/shop"
              className="btn btn-primary btn-sm sm:btn-md md:btn-lg font-semibold shadow-md w-full sm:w-auto md:w-40"
            >
              Shop Cakes
            </Link>
            <Link
              href="/custom"
              className="btn btn-outline btn-sm sm:btn-md md:btn-lg font-semibold min-w-40 border-[#7a4b4b] text-[#7a4b4b] hover:bg-[#7a4b4b] hover:text-white shadow-md w-full sm:w-auto md:w-auto"
            >
              Build a Custom Cake
            </Link>
          </div>
          {/* Trust Bullets */}
          <ul className="flex flex-wrap gap-3 sm:gap-4 md:gap-6 text-xs sm:text-sm font-semibold text-[#7a4b4b]/80 mb-3 sm:mb-4 md:mb-4">
            <li className="flex items-center gap-2">
              <span className="inline-block w-2 h-2 bg-success rounded-full" />{" "}
              Same-day pastries
            </li>
            <li className="flex items-center gap-2">
              <span className="inline-block w-2 h-2 bg-success rounded-full" />{" "}
              Fresh baked daily
            </li>
            <li className="hidden sm:flex items-center gap-2">
              <span className="inline-block w-2 h-2 bg-success rounded-full" />{" "}
              Delivery slots
            </li>
          </ul>
          {/* Best Sellers Filter Row */}
          <div className="flex flex-wrap gap-2 w-full">
            <button className="btn btn-outline btn-xs sm:btn-sm bg-transparent text-[#7a4b4b] border-[#7a4b4b] hover:bg-[#7a4b4b] hover:text-white flex-1 sm:flex-none text-xs sm:text-sm">
              Cakes
            </button>
            <button className="btn btn-outline btn-xs sm:btn-sm bg-transparent text-[#7a4b4b] border-[#7a4b4b] hover:bg-[#7a4b4b] hover:text-white flex-1 sm:flex-none text-xs sm:text-sm">
              Pastries
            </button>
            <button className="btn btn-outline btn-xs sm:btn-sm bg-transparent text-[#7a4b4b] border-[#7a4b4b] hover:bg-[#7a4b4b] hover:text-white flex-1 sm:flex-none text-xs sm:text-sm">
              Cheesecake
            </button>
            <button className="btn btn-outline btn-xs sm:btn-sm bg-transparent text-[#7a4b4b] border-[#7a4b4b] hover:bg-[#7a4b4b] hover:text-white flex-1 sm:flex-none text-xs sm:text-sm">
              Chocolate
            </button>
          </div>
        </div>

        {/* Right Side: Stacked Flipping Cake Carousel */}
        <div className="flex flex-1 flex-col items-center justify-center gap-3 sm:gap-4 w-full md:w-auto">
          <StackedFlippingCarousel />
        </div>
      </Container>
    </section>
  );
};

export default Banner;
