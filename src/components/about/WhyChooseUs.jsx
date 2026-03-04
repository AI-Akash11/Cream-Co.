import Container from "@/components/ui/Container";
import SectionHeading from "@/components/about/SectionHeading";

const reasons = [
  {
    title: "Same-day delivery in Dhaka",
    description:
      "Order from our same-day selection and get fresh cakes and pastries delivered to your doorstep.",
  },
  {
    title: "Custom cake builder",
    description:
      "Design your own cake online – choose flavour, size, filling, frosting, and finishing details.",
  },
  {
    title: "Secure online payment",
    description:
      "Pay confidently with Stripe and SSLCommerz on an encrypted checkout powered by modern infrastructure.",
  },
  {
    title: "Quality guarantee",
    description:
      "If something isn’t right, our team will make it right – replacements, refunds, or future credits.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-base-100">
      <Container className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
        <div className="space-y-4 sm:space-y-5">
          <SectionHeading
            eyebrow="Why Cream & Co."
            title="Designed for Dhaka celebrations"
          />
          <p className="text-sm sm:text-base text-base-content/80">
            From late-night last-minute orders to months-in-advance wedding
            planning, we&apos;ve shaped our service around how people in Dhaka
            actually celebrate. Reliable delivery, flexible customization, and
            transparent communication are built into everything we do.
          </p>
        </div>

        <div className="space-y-4 sm:space-y-5">
          <ul className="space-y-3 sm:space-y-4">
            {reasons.map((reason) => (
              <li
                key={reason.title}
                className="flex items-start gap-3 sm:gap-4"
              >
                <span className="mt-1 inline-flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
                  <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    className="h-4 w-4"
                  >
                    <path
                      d="M9.5 16.5 5.75 12.75 7.2 11.3 9.5 13.6 16.8 6.3 18.25 7.75 9.5 16.5Z"
                      fill="currentColor"
                    />
                  </svg>
                </span>
                <div className="space-y-1">
                  <h3 className="text-sm sm:text-base font-semibold text-primary">
                    {reason.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-base-content/80">
                    {reason.description}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}

