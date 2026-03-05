"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/about/SectionHeading";

const testimonials = [
  {
    id: 1,
    name: "Nusrat Jahan",
    location: "Gulshan, Dhaka",
    avatar: "https://i.pravatar.cc/150?img=47",
    rating: 5,
    review:
      "Ordered a custom red velvet cake for my daughter's birthday — it was absolutely stunning. Delivered fresh the same morning with a personalised message. Highly recommend!",
  },
  {
    id: 2,
    name: "Rafiq Ahmed",
    location: "Banani, Dhaka",
    avatar: "https://i.pravatar.cc/150?img=68",
    rating: 5,
    review:
      "Cream & Co. made our wedding cake and it was beyond expectations. Three tiers, beautifully decorated with florals. Every guest asked where it was from.",
  },
  {
    id: 3,
    name: "Tahmina Akter",
    location: "Dhanmondi, Dhaka",
    avatar: "https://i.pravatar.cc/150?img=32",
    rating: 5,
    review:
      "Nothing compares. The chocolate hazelnut cake was incredibly moist and rich. Same-day delivery saved me when I forgot to order in advance. Will order again!",
  },
  {
    id: 4,
    name: "Fahmida Hossain",
    location: "Uttara, Dhaka",
    avatar: "https://i.pravatar.cc/150?img=25",
    rating: 5,
    review:
      "Had a bento cake made for my husband's surprise. Tiny but perfectly crafted. The piped flowers were so detailed. Came packaged beautifully with a ribbon.",
  },
  {
    id: 5,
    name: "Mahbubur Rahman",
    location: "Mirpur, Dhaka",
    avatar: "https://i.pravatar.cc/150?img=53",
    rating: 5,
    review:
      "The strawberry bliss cake had real fruit — you can taste the quality. Celebrated my parents' anniversary with this and they loved every slice. 10/10.",
  },
  {
    id: 6,
    name: "Sadia Islam",
    location: "Bashundhara, Dhaka",
    avatar: "https://i.pravatar.cc/150?img=10",
    rating: 5,
    review:
      "The butterscotch delight for our office celebration was a hit. Packed neatly, delivered on time, and the praline crunch on top was a delightful surprise.",
  },
];

function StarRating({ count = 5 }) {
  return (
    <div
      className="flex items-center gap-0.5"
      aria-label={`${count} out of 5 stars`}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 24 24"
          className={`h-3.5 w-3.5 ${i < count ? "fill-accent text-accent" : "fill-base-300 text-base-300"}`}
          aria-hidden="true"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

function TestimonialCard({ testimonial }) {
  const { name, location, avatar, rating, review } = testimonial;
  return (
    <article className="flex flex-col gap-4 p-6 rounded-xl bg-base-200 border border-base-300/50 shadow-md w-72 sm:w-80 shrink-0">
      <StarRating count={rating} />
      <blockquote>
        <p className="text-sm text-base-content/80 leading-relaxed">
          &ldquo;{review}&rdquo;
        </p>
      </blockquote>
      <footer className="flex items-center gap-3 pt-3 border-t border-base-300/30 mt-auto">
        <div className="h-9 w-9 rounded-full overflow-hidden ring-2 ring-primary/20 shrink-0 bg-base-300">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={avatar}
            alt={name}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </div>
        <div>
          <p className="text-sm font-semibold text-base-content">{name}</p>
          <p className="text-xs text-base-content/60">{location}</p>
        </div>
      </footer>
    </article>
  );
}

// Duplicate cards for seamless infinite loop
const loopedTestimonials = [...testimonials, ...testimonials];

export default function Testimonials() {
  const trackRef = useRef(null);
  const tweenRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // Total width of a single set of cards (half the track)
    const totalWidth = track.scrollWidth / 2;

    // Animate from 0 to -50% seamlessly
    tweenRef.current = gsap.fromTo(
      track,
      { x: 0 },
      {
        x: -totalWidth,
        duration: 30,
        ease: "none",
        repeat: -1,
      },
    );

    // Pause on hover
    const pauseAnim = () => tweenRef.current?.pause();
    const resumeAnim = () => tweenRef.current?.resume();
    track.addEventListener("mouseenter", pauseAnim);
    track.addEventListener("mouseleave", resumeAnim);

    return () => {
      tweenRef.current?.kill();
      track.removeEventListener("mouseenter", pauseAnim);
      track.removeEventListener("mouseleave", resumeAnim);
    };
  }, []);

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-base-100 overflow-hidden">
      <Container>
        <div className="flex flex-col items-center gap-3 mb-12 sm:mb-16">
          <SectionHeading
            eyebrow="Loved by Our Customers"
            title="Sweet Words from Happy Clients"
            align="center"
          />
          <p className="text-sm sm:text-base text-base-content/60 max-w-xl text-center">
            Every celebration deserves a cake worth remembering — here&apos;s
            what our customers have to say.
          </p>
        </div>
      </Container>

      {/* Full-width slider — intentionally outside Container for edge-to-edge feel */}
      <div className="relative w-full">
        {/* Fade edges */}
        <div className="absolute inset-y-0 left-0 w-16 sm:w-32 z-10 pointer-events-none bg-gradient-to-r from-base-100 to-transparent" />
        <div className="absolute inset-y-0 right-0 w-16 sm:w-32 z-10 pointer-events-none bg-gradient-to-l from-base-100 to-transparent" />

        {/* Slider Track */}
        <div ref={trackRef} className="flex gap-5 sm:gap-6 px-4 w-max">
          {loopedTestimonials.map((t, i) => (
            <TestimonialCard key={`${t.id}-${i}`} testimonial={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
