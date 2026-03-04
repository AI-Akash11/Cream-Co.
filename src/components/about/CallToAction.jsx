import Link from "next/link";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/about/SectionHeading";

export default function CallToAction() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-primary/5 dark:bg-primary/15">
      <Container className="flex flex-col items-center text-center gap-6 sm:gap-7">
        <SectionHeading
          eyebrow="Celebrate with us"
          title="Let’s make your celebration sweeter"
          align="center"
        />
        <p className="max-w-2xl text-sm sm:text-base text-base-content/80">
          Whether you&apos;re planning an intimate birthday, a corporate event,
          or a full wedding reception, our team will help you choose the right
          flavours, sizes, and designs for the people you love.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <Link
            href="/menu"
            className="btn btn-primary btn-md sm:btn-lg font-semibold min-w-[10rem]"
          >
            Shop Cakes
          </Link>
          <Link
            href="/custom"
            className="btn btn-outline btn-md sm:btn-lg font-semibold min-w-[10rem] border-primary text-primary hover:bg-primary hover:text-base-100"
          >
            Build Custom Cake
          </Link>
        </div>
      </Container>
    </section>
  );
}

