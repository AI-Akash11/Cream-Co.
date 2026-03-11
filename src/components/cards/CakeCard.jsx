"use client";

import Image from "next/image";
import Link from "next/link";
import CartButton from "@/components/buttons/CartButton";

export default function CakeCard({ cake }) {
  const { _id, name, slug, description, images, basePrice, featured } = cake;

  return (
    <Link
      href={`/shop/${_id}`}
      className="group flex flex-col gap-3 bg-base-200 p-0 rounded-none overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-black/5 hover:-translate-y-2 h-full"
    >
      {/* Image Container */}
      <div className="relative aspect-4/5 overflow-hidden bg-base-200">
        <Image
          src={images[0]}
          alt={name}
          fill
          className="object-cover transition-transform duration-1000 group-hover:scale-110"
          sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        />

        {featured && (
          <div className="absolute top-3 left-3 z-10 transition-transform duration-500 group-hover:scale-110">
            <span className="px-2 py-1 text-[9px] font-black uppercase tracking-[0.2em] bg-white text-black shadow-lg rounded-full">
              Signature
            </span>
          </div>
        )}

        <div className="absolute bottom-0 left-0 right-0 p-3 bg-linear-to-t from-black/50 to-transparent flex opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <CartButton cake={cake} buttonStyle="overlay" />
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-0.5 px-3 pb-3 grow">
        <h3 className="text-[15px] font-serif font-bold text-base-content leading-tight group-hover:text-primary transition-colors line-clamp-1">
          {name}
        </h3>
        {description && (
          <p className="text-[10px] text-base-content/60 line-clamp-1 italic font-medium">
            {description}
          </p>
        )}
        <div className="mt-auto pt-1 flex items-center justify-between border-t border-base-100/30">
          <p className="text-xs font-black text-primary tracking-tight">
            ৳{basePrice.toLocaleString()}
          </p>
          <span className="text-[9px] uppercase tracking-[0.12em] font-bold text-base-content/30 group-hover:text-primary transition-colors flex items-center gap-1">
            Discover <span className="text-xs">→</span>
          </span>
        </div>
      </div>
    </Link>
  );
}
