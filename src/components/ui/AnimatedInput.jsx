"use client";

import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";

const AnimatedInput = ({ label, id, type = "text", register, error, placeholder, ...props }) => {
  const inputRef = useRef(null);
  const labelRef = useRef(null);
  const borderRef = useRef(null);

  useEffect(() => {
    const input = inputRef.current;
    if (!input) return;

    const onFocus = () => {
      gsap.to(labelRef.current, {
        y: -20,
        scale: 0.85,
        color: "var(--color-primary)",
        duration: 0.3,
        ease: "power2.out",
      });
      gsap.to(borderRef.current, {
        scaleX: 1,
        duration: 0.4,
        ease: "power2.out",
      });
    };

    const onBlur = (e) => {
      if (!e.target.value) {
        gsap.to(labelRef.current, {
          y: 0,
          scale: 1,
          color: "#9ca3af",
          duration: 0.3,
          ease: "power2.out",
        });
      }
      gsap.to(borderRef.current, {
        scaleX: 0,
        duration: 0.4,
        ease: "power2.out",
      });
    };

    input.addEventListener("focus", onFocus);
    input.addEventListener("blur", onBlur);

    // Initial state check
    if (input.value) {
      gsap.set(labelRef.current, { y: -20, scale: 0.85, color: "var(--color-primary)" });
    }

    return () => {
      input.removeEventListener("focus", onFocus);
      input.removeEventListener("blur", onBlur);
    };
  }, []);

  return (
    <div className="relative w-full mb-6 group">
      <input
        id={id}
        type={type}
        ref={inputRef}
        {...register}
        {...props}
        placeholder={placeholder || " "}
        className={`w-full px-4 py-3 bg-white/50 border border-secondary/20 rounded-xl focus:outline-none transition-all duration-300 ${
          error ? "border-error" : "focus:border-primary/50"
        }`}
      />
      <label
        ref={labelRef}
        htmlFor={id}
        className="absolute left-4 top-3 text-sm text-gray-400 pointer-events-none transition-all duration-300 origin-left"
      >
        {label}
      </label>
      <div
        ref={borderRef}
        className="absolute bottom-0 left-0 w-full h-[2px] bg-primary scale-x-0 origin-center"
      />
      {error && <span className="text-xs text-error mt-1 block">{error.message}</span>}
    </div>
  );
};

export default AnimatedInput;
