import Link from "next/link";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/about/SectionHeading";
import CakeCard from "@/components/shop/CakeCard";

export default function FeaturedCakes({ featuredCakes = [] }) {

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-base-100">
      <Container>
        <div className="flex flex-col gap-12 sm:gap-16">
          <SectionHeading
            eyebrow="The Collection"
            title="Featured Cakes"
            align="center"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10 sm:gap-x-8 sm:gap-y-12">
            {featuredCakes.map((cake) => (
              <CakeCard key={cake._id} cake={cake} />
            ))}
          </div>

          <div className="flex justify-center">
            <Link
              href="/shop"
              className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-primary/70 hover:text-accent transition-colors duration-300 border-b border-primary/20 pb-1 hover:border-accent"
            >
              View entire archive
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
