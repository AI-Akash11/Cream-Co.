import Image from "next/image";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/about/SectionHeading";

export default function BrandStory() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-base-100">
      <Container className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
        <div className="order-2 md:order-1 space-y-4 sm:space-y-5">
          <SectionHeading eyebrow="Behind the oven" title="How Cream & Co. began" />
          <p className="text-sm sm:text-base text-base-content/80">
            Cream &amp; Co. started as a tiny home studio in Dhaka, baking
            birthday cakes for friends and family. Word spread quickly – not
            just because the cakes looked beautiful, but because they tasted
            like something you wanted another slice of.
          </p>
          <p className="text-sm sm:text-base text-base-content/80">
            Today, our team of pastry chefs and decorators still works in
            small batches. We source fresh cream, local eggs, and seasonal
            fruit from trusted partners, and we pair them with carefully
            selected chocolates, nuts, and spices. Every sponge is baked the
            day it is delivered, so the cake that reaches your table is soft,
            fragrant, and full of flavour.
          </p>
          <p className="text-sm sm:text-base text-base-content/80">
            From intimate tea gatherings to full wedding towers, we approach
            each order as a collaboration. You bring the story; we bring the
            craft, to create something that feels uniquely yours.
          </p>
        </div>

        <div className="order-1 md:order-2">
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl border border-base-200/70 dark:border-base-300/40 bg-base-100">
            <Image
              src="/images/about/story.jpg"
              alt="Freshly baked cakes and pastries cooling in the Cream & Co. kitchen"
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 480px, (min-width: 768px) 420px, 100vw"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}

