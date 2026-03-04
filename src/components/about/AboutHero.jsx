import Image from "next/image";
import Container from "@/components/ui/Container";

export default function AboutHero() {
  return (
    <section className="relative w-full bg-gradient-to-br from-primary/5 via-base-100 to-accent/10 dark:from-primary/20 dark:via-base-100 dark:to-accent/20 py-16 sm:py-20 lg:py-24">
      <Container className="flex flex-col md:flex-row items-center justify-between gap-10 sm:gap-12">
        <div className="flex-1 flex flex-col gap-4 sm:gap-5">
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] text-primary/70">
            Our Story
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-primary leading-tight">
            Small-batch cakes,
            <span className="block text-accent">for the biggest moments.</span>
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-base-content/80 max-w-xl">
            Cream &amp; Co. was born in Dhaka from a simple idea – that every
            celebration deserves a cake that feels as personal as the occasion
            itself. We bake slowly, decorate thoughtfully, and obsess over every
            layer so you can taste the care in every slice.
          </p>
        </div>

        <div className="flex-1 w-full max-w-md md:max-w-lg">
          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-base-200/70 dark:border-base-300/40 bg-base-100">
            <Image
              src="/images/about/hero-bakery.jpg"
              alt="Artisan cake being finished with fresh berries at Cream & Co."
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 480px, (min-width: 768px) 420px, 100vw"
              priority
            />
          </div>
        </div>
      </Container>
    </section>
  );
}

