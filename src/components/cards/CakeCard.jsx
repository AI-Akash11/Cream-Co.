"use client";

import Image from "next/image";
import Link from "next/link";
import CartButton from "@/components/buttons/CartButton";

export default function CakeCard({ cake }) {
  const { _id, name, slug, description, images, basePrice, featured } = cake;

  return (
    <Link
      href={`/shop/${_id}`}
      className="group flex flex-col gap-4 bg-base-200 p-0 sm:p-0 rounded-none overflow-hidden transition-all duration-300 hover:-translate-y-1"
    >
      {/* Image Container */}
      <div className="relative aspect-4/5 overflow-hidden bg-base-300">
        <Image
          src={images[0]}
          alt={name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        />

        {featured && (
          <div className="absolute top-3 left-3 z-10">
            <span className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider bg-accent text-accent-content rounded-sm shadow-sm">
              Featured
            </span>
          </div>
        )}

        {/* Quick Actions Overlay / Always Visible Button */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-linear-to-t from-black/60 to-transparent flex">
          <CartButton cake={cake} buttonStyle="overlay" />
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-1.5 px-1 pb-4">
        <h3 className="text-base font-serif font-bold text-base-content leading-tight group-hover:text-primary transition-colors">
          {name}
        </h3>
        {description && (
          <p className="text-xs text-base-content/60 line-clamp-1 italic">
            {description}
          </p>
        )}
        <div className="mt-1 flex items-baseline justify-between">
          <p className="text-sm font-semibold text-primary">
            From ৳{basePrice.toLocaleString()}
          </p>
          <span className="text-[10px] uppercase tracking-widest text-base-content/40 group-hover:text-primary transition-colors">
            View Details →
          </span>
        </div>
      </div>
    </Link>
  );
}
