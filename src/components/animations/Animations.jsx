"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * FadeIn component for entrance animations
 */
export const FadeIn = ({
  children,
  direction = "up",
  delay = 0,
  duration = 0.8,
  distance = 30,
  className = "",
  stagger = false,
}) => {
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const directions = {
      up: { y: distance },
      down: { y: -distance },
      left: { x: distance },
      right: { x: -distance },
      none: {},
    };

    const initialProps = {
      opacity: 0,
      ...directions[direction],
    };

    gsap.fromTo(
      stagger ? element.children : element,
      initialProps,
      {
        opacity: 1,
        x: 0,
        y: 0,
        duration: duration,
        delay: delay,
        ease: "power3.out",
        stagger: stagger ? 0.1 : 0,
        scrollTrigger: {
          trigger: element,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      }
    );
  }, [direction, delay, duration, distance, stagger]);

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  );
};

/**
 * StaggerContainer for wrapping multiple items
 */
export const StaggerContainer = ({
  children,
  delay = 0,
  className = "",
  direction = "up",
}) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const items = container.querySelectorAll(".stagger-item");
    if (items.length === 0) return;

    const directions = {
      up: { y: 30 },
      down: { y: -30 },
      left: { x: 30 },
      right: { x: -30 },
      none: {},
    };

    gsap.fromTo(
      items,
      {
        opacity: 0,
        ...directions[direction],
      },
      {
        opacity: 1,
        x: 0,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        delay: delay,
        ease: "power3.out",
        scrollTrigger: {
          trigger: container,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      }
    );
  }, [delay, direction]);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
};

/**
 * StaggerItem for individual items inside StaggerContainer
 */
export const StaggerItem = ({ children, className = "" }) => {
  return <div className={`stagger-item ${className}`}>{children}</div>;
};

/**
 * Parallax effect for backgrounds or images
 */
export const Parallax = ({ children, speed = 0.5, className = "" }) => {
  const triggerRef = useRef(null);
  const targetRef = useRef(null);

  useEffect(() => {
    const trigger = triggerRef.current;
    const target = targetRef.current;
    if (!trigger || !target) return;

    gsap.to(target, {
      y: (i, t) => -((speed * 100) * (ScrollTrigger.create({ trigger: t }).progress || 0.5)),
      ease: "none",
      scrollTrigger: {
        trigger: trigger,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  }, [speed]);

  return (
    <div ref={triggerRef} className={`overflow-hidden ${className}`}>
      <div ref={targetRef} className="h-full w-full">
        {children}
      </div>
    </div>
  );
};
