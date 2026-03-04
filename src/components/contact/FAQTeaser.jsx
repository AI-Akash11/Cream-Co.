import Container from "@/components/ui/Container";
import SectionHeading from "@/components/about/SectionHeading";

const faqs = [
  {
    id: "same-day",
    question: "Do you offer same-day delivery?",
    answer:
      "We currently do not offer same-day delivery for custom orders. Standard items from our daily menu may be available for same-day collection. For guaranteed availability, we recommend ordering at least 48 hours in advance.",
  },
  {
    id: "customize",
    question: "Can I customize my cake design?",
    answer:
      "Absolutely! Custom cake design is one of our specialties. You can choose your flavours, tiers, colours, and decorative theme. Simply fill out the contact form with your vision or reach out directly — we love bringing unique ideas to life.",
  },
  {
    id: "advance-order",
    question: "How far in advance should I place my order?",
    answer:
      "For simple celebration cakes, 3–5 days is typically enough. For tiered wedding or event cakes, we recommend reaching out at least 2–3 weeks ahead, especially during peak seasons (Eid, Christmas, and year-end).",
  },
];

export default function FAQTeaser() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-base-100">
      <Container>
        <div className="flex flex-col gap-8 sm:gap-10">
          <SectionHeading
            eyebrow="Quick answers"
            title="Frequently Asked Questions"
            align="center"
          />

          <div className="max-w-2xl mx-auto w-full flex flex-col gap-3">
            {faqs.map((faq) => (
              <div
                key={faq.id}
                className="collapse collapse-arrow bg-base-200 border border-base-200/80 dark:border-base-300/30 rounded-xl shadow-sm"
              >
                <input
                  type="radio"
                  name="faq-accordion"
                  aria-label={faq.question}
                />
                <div className="collapse-title text-sm sm:text-base font-semibold text-primary pr-8">
                  {faq.question}
                </div>
                <div className="collapse-content">
                  <p className="text-sm sm:text-[0.95rem] text-base-content/75 leading-relaxed pt-1">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
