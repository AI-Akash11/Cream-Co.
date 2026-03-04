import Link from "next/link";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/about/SectionHeading";

export default function ContactCTA() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-primary/5 dark:bg-primary/15">
      <Container className="flex flex-col items-center text-center gap-6 sm:gap-7">
        <SectionHeading
          eyebrow="Order now"
          title="Ready to Order Something Special?"
          align="center"
        />
        <p className="max-w-xl text-sm sm:text-base text-base-content/80">
          From everyday treats to show-stopping celebration cakes — we handcraft
          every order with care. Browse our menu or start designing your dream
          cake today.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <Link
            href="/menu"
            className="btn btn-primary btn-md sm:btn-lg font-semibold min-w-40"
          >
            Shop Cakes
          </Link>
          <Link
            href="/custom"
            className="btn btn-outline btn-md sm:btn-lg font-semibold min-w-40 border-primary text-primary hover:bg-primary hover:text-primary-content"
          >
            Build Custom Cake
          </Link>
        </div>
      </Container>
    </section>
  );
}
