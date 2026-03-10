import Container from "@/components/ui/Container";
import { FiFileText, FiCreditCard, FiAlertTriangle, FiImage } from "react-icons/fi";

export const metadata = {
  title: "Terms & Conditions | Cream & Co.",
  description: "Terms and conditions for ordering from Cream & Co.",
};

export default function TermsPage() {
  const terms = [
    {
      icon: <FiFileText size={24} />,
      title: "1. Order Placement",
      description: "All orders are subject to acceptance and availability. We reserve the right to refuse any order. An order is only confirmed once full or partial payment (as agreed) is received."
    },
    {
      icon: <FiCreditCard size={24} />,
      title: "2. Pricing and Payment",
      description: "Prices are subject to change without notice. All prices include applicable taxes unless stated otherwise. Secure payment options via our website must be completed at checkout."
    },
    {
      icon: <FiAlertTriangle size={24} />,
      title: "3. Allergens",
      description: "Our cakes are prepared in a kitchen that handles nuts, dairy, gluten, and eggs. While we take strict precautions to prevent cross-contamination, we cannot guarantee that any product is 100% free of these allergens. Customer safety is our priority, so please inform us of any severe allergies."
    },
    {
      icon: <FiImage size={24} />,
      title: "4. Design Variations",
      description: "As all our cakes are handmade, slight variations in design, color, and finish may occur. Each cake is a unique piece of edible art! Inspiration pictures are used as a guide only."
    }
  ];

  return (
    <div className="min-h-screen bg-base-200/50 py-16 md:py-24">
      <Container>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-serif font-bold italic mb-4">
              Terms & Conditions
            </h1>
            <p className="text-base-content/60">
              The sweet print you need to know about.
            </p>
          </div>

          <div className="bg-base-100 p-8 md:p-12 rounded-3xl shadow-sm border border-base-300">
            <p className="text-lg text-base-content/80 leading-relaxed mb-10 text-center max-w-2xl mx-auto">
              Welcome to Cream & Co. By browsing our website and placing an order with us, you agree to the following terms and conditions.
            </p>

            <div className="space-y-6">
              {terms.map((term, index) => (
                <div key={index} className="flex gap-6 p-6 rounded-2xl bg-base-200/30 border border-base-200 hover:border-primary/30 transition-colors">
                  <div className="text-primary mt-1 shrink-0">
                    {term.icon}
                  </div>
                  <div>
                    <h2 className="text-xl font-serif font-bold mb-3">{term.title}</h2>
                    <p className="text-base-content/70 leading-relaxed">
                      {term.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
