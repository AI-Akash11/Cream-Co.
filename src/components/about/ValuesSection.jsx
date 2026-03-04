import Container from "@/components/ui/Container";
import SectionHeading from "@/components/about/SectionHeading";

const values = [
  {
    title: "Premium Ingredients",
    description:
      "We bake with real butter, Belgian chocolate, fresh cream, and seasonal fruit – never shortcuts or premixes.",
    icon: "ingredients",
  },
  {
    title: "Fresh Daily",
    description:
      "Every sponge, filling, and frosting is made in small batches each day for peak flavor and texture.",
    icon: "fresh",
  },
  {
    title: "Customer First",
    description:
      "From first message to final slice, our team is obsessed with clear communication and on-time delivery.",
    icon: "customer",
  },
  {
    title: "Creative Customization",
    description:
      "From minimal buttercream to bold sculpted designs, we translate your story into a one-of-a-kind cake.",
    icon: "creative",
  },
];

function ValueIcon({ variant }) {
  let path;

  switch (variant) {
    case "ingredients":
      path =
        "M6 19c4 0 9-4 9-9 0-2.5-1.5-4-4-4-5 0-9 5-9 9 0 2.2 1.8 4 4 4Zm6.5-1.5C13.8 18.4 15.3 19 17 19c2.2 0 4-1.8 4-4 0-2.4-1.3-4.6-3.3-6";
      break;
    case "fresh":
      path =
        "M12 8.5A3.5 3.5 0 1 1 8.5 12 3.5 3.5 0 0 1 12 8.5Zm0-3.5v2M12 17v2M7 7l-1.4-1.4M18.4 18.4 17 17M4.5 12h-2M21.5 12h-2M7 17l-1.4 1.4M18.4 5.6 17 7";
      break;
    case "customer":
      path =
        "M12 19.5s-5.5-3.2-5.5-7.7A3.3 3.3 0 0 1 9.8 8.5c1 0 1.9.5 2.2 1.3.3-.8 1.2-1.3 2.2-1.3a3.3 3.3 0 0 1 3.3 3.3c0 4.5-5.5 7.7-5.5 7.7Z";
      break;
    case "creative":
      path =
        "M12 5.5 13.2 9l3.3 1.2L13.2 11.5 12 15l-1.2-3.5L7.5 10.2 10.8 9 12 5.5Zm-6 1.5.7 1.8L8.5 9.5 6.7 10.2 6 12l-.7-1.8L3.5 9.5 5.3 8.8 6 7Z";
      break;
    default:
      path =
        "M9.5 16.5 5.75 12.75 7.2 11.3 9.5 13.6 16.8 6.3 18.25 7.75 9.5 16.5Z";
  }

  return (
    <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
        <path
          d={path}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

export default function ValuesSection() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-base-100">
      <Container>
        <div className="flex flex-col gap-6 sm:gap-8">
          <SectionHeading
            eyebrow="What matters to us"
            title="Baking with a point of view"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
            {values.map((value) => (
              <article
                key={value.title}
                className="card bg-base-200 shadow-md border border-base-200/80 dark:border-base-300/30 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="card-body gap-3">
                  <ValueIcon variant={value.icon} />
                  <h3 className="card-title text-base sm:text-lg font-semibold text-primary">
                    {value.title}
                  </h3>
                  <p className="text-sm sm:text-[0.95rem] text-base-content/80">
                    {value.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
