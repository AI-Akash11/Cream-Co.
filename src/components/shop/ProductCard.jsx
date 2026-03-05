import Image from "next/image";
import Link from "next/link";
import { addToCart, toggleWishlist } from "@/app/actions/shop-actions";
import { toast } from "react-hot-toast"; // Assuming toast might be used or added later

export default function ProductCard({ product }) {
  const { _id, name, slug, description, images, basePrice, featured } = product;

  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const res = await addToCart(_id);
    if (res.success) {
      console.log(res.message);
      // alert(res.message); // Simple feedback for now
    }
  };

  const handleWishlist = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const res = await toggleWishlist(_id);
    if (res.success) {
      console.log(res.message);
    }
  };

  return (
    <Link
      href={`/shop/${slug}`}
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

        {/* Quick Actions Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-linear-to-t from-black/60 to-transparent flex gap-2">
          <button
            onClick={handleAddToCart}
            className="flex-1 bg-white text-black text-xs font-bold py-2 px-3 rounded-none hover:bg-primary hover:text-white transition-colors uppercase tracking-tight"
          >
            Add to Cart
          </button>
          <button
            onClick={handleWishlist}
            className="bg-white/20 backdrop-blur-md text-white p-2 hover:bg-white hover:text-black transition-colors"
            title="Add to Wishlist"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </button>
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
