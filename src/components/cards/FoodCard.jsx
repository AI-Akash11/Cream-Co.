import Image from "next/image";
import Link from "next/link";

export default function FoodCard({ cake }) {
  return (
    <Link href={`/shop/${cake.slug}`} className="group flex flex-col gap-4">
      {/* Image Container - Clean Rectangle, No Rounding */}
      <div className="relative aspect-square sm:aspect-4/5 overflow-hidden bg-base-200">
        <Image
          src={cake.images[0]}
          alt={cake.name}
          fill
          className="object-cover transition-transform duration-1000 group-hover:scale-105"
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
        />
      </div>

      {/* Content - Left Aligned, Minimal */}
      <div className="flex flex-col gap-1">
        <h3 className="text-sm sm:text-base font-medium text-primary flex items-center gap-2 group-hover:text-accent transition-colors duration-300">
          {cake.name}
          <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
            →
          </span>
        </h3>
        <p className="text-xs sm:text-sm text-base-content/60 font-light">
          ৳{cake.basePrice}
        </p>
      </div>
    </Link>
  );
}
