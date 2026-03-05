"use client";

import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/about/SectionHeading";
import foods from "@/data/foods.json";

export default function FeaturedCakes() {
  // Get top 4 featured cakes
  const featuredCakes = foods.filter((food) => food.featured).slice(0, 4);

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-base-100">
      <Container>
        <div className="flex flex-col gap-10 sm:gap-12">
          <SectionHeading
            eyebrow="Our Favourites"
            title="Featured Cakes"
            align="center"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {featuredCakes.map((cake) => (
              <Link
                key={cake._id}
                href={`/shop/${cake.slug}`}
                className="group flex flex-col"
              >
                <article className="flex flex-col h-full bg-base-200 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 border border-base-200/50 dark:border-base-300/20">
                  {/* Image Container */}
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <Image
                      src={cake.images[0]}
                      alt={cake.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    />
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-primary/90 text-primary-content text-xs font-medium backdrop-blur-md rounded-full shadow-lg">
                        {cake.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-5 sm:p-6 flex flex-col gap-2">
                    <h3 className="text-lg font-serif font-bold text-primary leading-snug group-hover:text-accent transition-colors duration-300">
                      {cake.name}
                    </h3>
                    <p className="text-sm text-base-content/70 line-clamp-2 mb-2">
                      {cake.description}
                    </p>
                    <div className="mt-auto flex items-center justify-between pt-2 border-t border-base-300/30">
                      <p className="font-semibold text-primary">
                        From{" "}
                        <span className="text-accent underline-offset-4 decoration-accent/30 decoration-2 underline">
                          ৳{cake.basePrice}
                        </span>
                      </p>
                      <span className="text-xs font-bold uppercase tracking-wider text-accent group-hover:translate-x-1 transition-transform duration-300">
                        View Details →
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>

          <div className="flex justify-center mt-4">
            <Link
              href="/shop"
              className="btn btn-primary btn-outline px-8 rounded-full border-2 hover:shadow-lg transition-all"
            >
              Explore Full Collection
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
