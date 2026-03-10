import Container from "@/components/ui/Container";
import SectionHeading from "@/components/about/SectionHeading";
import { StaggerContainer, StaggerItem } from "@/components/animations/Animations";

const features = [
  {
    id: 1,
    title: "Premium Ingredients",
    description:
      "We use Belgian chocolate, fresh cream, and seasonal fruits sourced locally — never shortcuts or premixes.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 20s8-4.5 8-10a8 8 0 10-16 0c0 5.5 8 10 8 10z"
        />
      </svg>
    ),
  },
  {
    id: 2,
    title: "Freshly Baked Daily",
    description:
      "Every cake is baked in small batches to ensure peak freshness, softness, and flavour in every bite.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4 8h16M4 12h16M4 16h16"
        />
      </svg>
    ),
  },
  {
    id: 3,
    title: "Custom Cake Design",
    description:
      "From elegant wedding tiers to playful birthday bento cakes — we craft designs tailored to your story.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 20h9"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M16.5 3.5a2.1 2.1 0 013 3L7 19l-4 1 1-4 12.5-12.5z"
        />
      </svg>
    ),
  },
  {
    id: 4,
    title: "Reliable Same-Day Delivery",
    description:
      "Forgot an order? We offer same-day delivery across Dhaka with secure packaging and careful handling.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 13V6a1 1 0 011-1h10v8H3z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M14 8h4l3 3v2h-7V8z"
        />
        <circle cx="7.5" cy="17.5" r="1.5" />
        <circle cx="17.5" cy="17.5" r="1.5" />
      </svg>
    ),
  },
];

function FeatureCard({ title, description, icon }) {
  return (
    <article className="group flex flex-col gap-4 p-6 rounded-xl bg-base-200 border border-base-300/50 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
        {icon}
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="text-base font-semibold text-base-content">
          {title}
        </h3>
        <p className="text-sm text-base-content/70 leading-relaxed">
          {description}
        </p>
      </div>
    </article>
  );
}

export default function Features() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-base-100">
      <Container>
        <div className="flex flex-col items-center gap-3 mb-12 sm:mb-16">
          <SectionHeading
            eyebrow="Why Cream & Co."
            title="Crafted with Care, Delivered with Love"
            align="center"
          />
          <p className="text-sm sm:text-base text-base-content/60 max-w-xl text-center">
            Every celebration deserves more than just a cake — it deserves
            attention to detail, quality ingredients, and thoughtful delivery.
          </p>
        </div>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => (
            <StaggerItem key={feature.id}>
              <FeatureCard
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
              />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Container>
    </section>
  );
}