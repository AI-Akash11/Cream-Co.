"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function GlobalLoading() {
  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "."));
    }, 400);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-9999 bg-base-100 flex flex-col items-center justify-center min-h-screen">
      <div className="flex flex-col items-center justify-center gap-8 relative">
        {/* Visual Loading Indicator */}
        <div className="relative w-32 h-32 flex items-center justify-center">
          {/* Decorative Outer Rings */}
          <div className="absolute inset-0 m-auto w-32 h-32 border-4 border-primary/20 rounded-full animate-ping opacity-50"></div>
          <div className="absolute inset-0 m-auto w-24 h-24 border-t-4 border-r-4 border-primary rounded-full animate-spin"></div>
  
          {/* Center Logo / Icon */}
          <div className="relative w-20 h-20 bg-base-100 rounded-full flex items-center justify-center z-10 shadow-2xl border border-base-200 overflow-hidden">
            <Image 
              src="/logoImage.png" 
              alt="Cream & Co." 
              width={64} 
              height={64} 
              className="object-contain"
              priority
            />
          </div>
        </div>

        {/* Loading Text */}
        <div className="flex flex-col items-center gap-2 mt-4 z-10">
          <h2 className="text-xl font-serif font-black tracking-widest text-base-content uppercase">
            Baking
          </h2>
          <p className="text-sm text-base-content/60 font-medium tracking-[0.2em] uppercase">
            Something Sweet{dots}
          </p>
        </div>
      </div>
    </div>
  );
}
