import Link from "next/link";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/about/SectionHeading";

export default function ShopCTA() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-primary/5 dark:bg-primary/15 relative overflow-hidden">
      {/* Subtle decorative background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2 pointer-events-none" />

      <Container className="relative z-10">
        <div className="flex flex-col items-center text-center gap-6 sm:gap-8 max-w-3xl mx-auto">
          <SectionHeading
            eyebrow="Dream it, we bake it"
            title="Can't find your perfect cake?"
            align="center"
          />
          <p className="text-sm sm:text-base text-base-content/80 leading-relaxed font-light">
            While our collection covers many cravings, we know some moments
            require something truly unique. If you have a specific vision,
            flavor profile, or theme in mind, our lead bakers are ready to bring
            your imagination to life.
          </p>
          <div className="pt-2">
            <Link
              href="/custom"
            className="btn btn-outline btn-md sm:btn-lg font-semibold min-w-[10rem] border-primary text-primary hover:bg-primary hover:text-base-100"
            >
              Create a Custom Order
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
