"use client";

import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";

const AnimatedTextArea = ({ label, id, register, error, placeholder, rows = 4, ...props }) => {
  return (
    <div className="flex flex-col gap-1.5 w-full mb-5">
      {label && (
        <label
          htmlFor={id}
          className="text-xs font-bold uppercase tracking-wider text-base-content/60 ml-1"
        >
          {label}
        </label>
      )}
      <div className="relative group">
        <textarea
          id={id}
          rows={rows}
          {...register}
          {...props}
          placeholder={placeholder}
          className={`w-full px-4 py-3 bg-base-100 border-2 rounded-xl focus:outline-none transition-all duration-300 resize-none ${
            error 
              ? "border-error/50" 
              : "border-base-300 group-hover:border-primary/30 focus:border-primary focus:ring-4 focus:ring-primary/10"
          }`}
        />
        {/* Subtle bottom line accent */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-primary transition-all duration-500 group-focus-within:w-[80%] rounded-full opacity-0 group-focus-within:opacity-100" />
      </div>
      {error && <span className="text-[10px] font-bold text-error uppercase tracking-tight mt-0.5 ml-1">{error.message}</span>}
    </div>
  );
};

export default AnimatedTextArea;
