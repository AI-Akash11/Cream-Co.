import Container from "@/components/ui/Container";
import SectionHeading from "@/components/about/SectionHeading";

const contactItems = [
  {
    id: "address",
    label: "Our Bakery",
    value: "House 14, Road 7, Block D\nBanani, Dhaka 1213, Bangladesh",
    icon: (
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7Z" />
        <circle cx="12" cy="9" r="2.5" />
      </svg>
    ),
  },
  {
    id: "phone",
    label: "Phone",
    value: "+880 1700-123456",
    href: "tel:+8801700123456",
    icon: (
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.8 21 3 13.2 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8Z" />
      </svg>
    ),
  },
  {
    id: "email",
    label: "Email",
    value: "hello@creamandco.com.bd",
    href: "mailto:hello@creamandco.com.bd",
    icon: (
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m2 7 10 7 10-7" />
      </svg>
    ),
  },
  {
    id: "hours",
    label: "Business Hours",
    value: "Sat – Thu: 10:00 AM – 9:00 PM\nFriday: 2:00 PM – 9:00 PM",
    icon: (
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 3" />
      </svg>
    ),
  },
];

function ContactCard({ item }) {
  const valueLines = item.value.split("\n");

  return (
    <article className="card bg-base-200 shadow-md border border-base-200/80 dark:border-base-300/30 hover:shadow-lg transition-shadow duration-300 h-full">
      <div className="card-body gap-3 p-5 sm:p-6">
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
          {item.icon}
        </span>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary/60">
          {item.label}
        </p>
        {item.href ? (
          <a
            href={item.href}
            className="text-sm sm:text-base font-medium text-base-content hover:text-primary transition-colors duration-200"
          >
            {valueLines.map((line, i) => (
              <span key={i} className="block">
                {line}
              </span>
            ))}
          </a>
        ) : (
          <address className="not-italic text-sm sm:text-base font-medium text-base-content">
            {valueLines.map((line, i) => (
              <span key={i} className="block">
                {line}
              </span>
            ))}
          </address>
        )}
      </div>
    </article>
  );
}

import { StaggerContainer, StaggerItem } from "@/components/animations/Animations";

export default function ContactInfo() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-base-200/40 dark:bg-base-200/10">
      <Container>
        <div className="flex flex-col gap-8 sm:gap-10">
          <SectionHeading
            eyebrow="Find us"
            title="How to Reach Us"
            align="center"
          />
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {contactItems.map((item) => (
              <StaggerItem key={item.id} className="h-full">
                <ContactCard item={item} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </Container>
    </section>
  );
}
