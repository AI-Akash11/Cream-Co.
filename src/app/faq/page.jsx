import Container from "@/components/ui/Container";

export const metadata = {
  title: "FAQ | Cream & Co.",
  description: "Frequently asked questions about ordering our premium cakes.",
};

export default function FAQPage() {
  const faqs = [
    {
      question: "How far in advance should I place my order?",
      answer: "We recommend placing your order at least 24 to 48 hours in advance for our signature cakes. Custom cakes may require 3-5 days of notice."
    },
    {
      question: "Do you offer gluten-free or vegan options?",
      answer: "Yes! We have a selection of gluten-free and vegan cakes available upon request. Please contact us directly for specific dietary requirements."
    },
    {
      question: "How can I store my cake?",
      answer: "Most of our cakes should be refrigerated. We recommend taking the cake out 30 minutes to 1 hour before serving to let it come to room temperature for the best taste and texture."
    },
    {
      question: "Do you deliver outside Dhaka?",
      answer: "Currently, we only offer delivery within the Dhaka metropolitan area to ensure our cakes arrive fresh and in perfect condition."
    }
  ];

  return (
    <div className="min-h-screen bg-base-200/50 py-16 md:py-24">
      <Container>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-serif font-bold italic mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-base-content/60">
              Everything you need to know about ordering our premium cakes.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="collapse collapse-plus bg-base-100 shadow-sm border border-base-300 rounded-2xl transition-all hover:shadow-md">
                <input type="radio" name="faq-accordion" defaultChecked={index === 0} /> 
                <div className="collapse-title text-xl font-bold font-serif px-6 py-4">
                  {faq.question}
                </div>
                <div className="collapse-content px-6 text-base-content/70 leading-relaxed"> 
                  <p>{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
