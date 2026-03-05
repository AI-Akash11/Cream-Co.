import Link from "next/link";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/about/SectionHeading";

export default function HomeCTA() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-primary/5 dark:bg-primary/15 relative overflow-hidden">
      {/* Decorative blurred background elements for the premium feel */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-primary/5 dark:bg-primary/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-accent/5 dark:bg-accent/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 pointer-events-none" />

      <Container className="relative flex flex-col items-center text-center gap-6 sm:gap-7 z-10">
        <SectionHeading
          eyebrow="Tempt Your Sweet Tooth"
          title="Ready to Taste the Magic?"
          align="center"
        />
        <p className="max-w-2xl text-sm sm:text-base text-base-content/80 leading-relaxed">
          From signature everyday treats to custom masterpieces for your most
          cherished celebrations — every Cream & Co. cake is baked fresh with
          premium ingredients and a whole lot of love.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <Link
            href="/menu"
            className="btn btn-primary btn-md sm:btn-lg font-semibold min-w-[10rem]"
          >
            Explore the Menu
          </Link>
          <Link
            href="/custom"
            className="btn btn-outline btn-md sm:btn-lg font-semibold min-w-[10rem] border-primary text-primary hover:bg-primary hover:text-base-100"
          >
            Request Custom Order
          </Link>
        </div>
      </Container>
    </section>
  );
}
