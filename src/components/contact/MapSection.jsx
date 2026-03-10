import Container from "@/components/ui/Container";
import SectionHeading from "@/components/about/SectionHeading";
import { FadeIn } from "@/components/animations/Animations";

export default function MapSection() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-base-200/40 dark:bg-base-200/10">
      <Container>
        <div className="flex flex-col gap-8 sm:gap-10">
          <SectionHeading
            eyebrow="Our location"
            title="Visit Our Bakery in Dhaka"
            align="center"
          />

          <FadeIn className="relative w-full rounded-2xl overflow-hidden shadow-xl border border-base-200/80 dark:border-base-300/30 bg-base-200 aspect-16/7 min-h-[260px]" direction="up">
            {/* Google Maps Embed Placeholder */}
            <iframe
              title="Cream & Co. Bakery Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.540674764085!2d90.40219297599843!3d23.793824478600237!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c7a0f702c3f3%3A0x5ec35ea42b2dce57!2sBanani%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1709000000000!5m2!1sen!2sbd"
              className="absolute inset-0 w-full h-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              aria-label="Map showing Cream & Co. bakery location in Banani, Dhaka"
            />
            {/* Overlay badge */}
            <div className="absolute bottom-4 left-4 z-10 flex items-center gap-2.5 bg-base-100/95 backdrop-blur-sm text-base-content rounded-xl px-4 py-3 shadow-md border border-base-200/70 dark:border-base-300/30">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary shrink-0">
                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7Z" />
                  <circle cx="12" cy="9" r="2.5" />
                </svg>
              </span>
              <div>
                <p className="text-xs font-semibold text-primary">
                  Cream &amp; Co.
                </p>
                <p className="text-xs text-base-content/60">
                  Banani, Dhaka 1213
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
