import Container from "@/components/ui/Container";
import { FiTruck, FiClock, FiUserCheck } from "react-icons/fi";

export const metadata = {
  title: "Delivery Policy | Cream & Co.",
  description: "Information about our cake delivery services.",
};

export default function DeliveryPolicyPage() {
  return (
    <div className="min-h-screen bg-base-200/50 py-16 md:py-24">
      <Container>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-serif font-bold italic mb-4">
              Delivery Policy
            </h1>
            <p className="text-base-content/60">
              Bringing sweetness straight to your doorstep.
            </p>
          </div>

          <div className="bg-base-100 p-8 md:p-12 rounded-3xl shadow-sm border border-base-300">
            <p className="text-lg text-base-content/80 leading-relaxed mb-10 text-center max-w-2xl mx-auto">
              At Cream & Co., we want to ensure your cakes arrive perfectly intact and fresh. Please read our delivery guidelines carefully.
            </p>

            <div className="space-y-8">
              <div className="flex flex-col md:flex-row gap-6 p-6 rounded-2xl bg-primary/5 border border-primary/20">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center shrink-0">
                  <FiTruck size={28} className="text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-serif font-bold mb-3">Delivery Areas</h2>
                  <p className="text-base-content/70 leading-relaxed">
                    We currently offer delivery exclusively within the Dhaka metropolitan area. Because our cakes are delicate, we handle all deliveries through our trained, specialized drivers to ensure they remain in pristine condition.
                  </p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-6 p-6 rounded-2xl bg-base-200/80 border border-base-300">
                <div className="bg-base-300 w-16 h-16 rounded-full flex items-center justify-center shrink-0">
                  <FiClock size={28} className="text-base-content" />
                </div>
                <div>
                  <h2 className="text-2xl font-serif font-bold mb-3">Delivery Windows</h2>
                  <p className="text-base-content/70 leading-relaxed">
                    Deliveries are scheduled in specific time slots. While we do our best to meet your exact requested time, please allow a delivery window of +/- 1 hour due to traffic conditions in Dhaka.
                  </p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-6 p-6 rounded-2xl bg-secondary/5 border border-secondary/20">
                <div className="bg-secondary/10 w-16 h-16 rounded-full flex items-center justify-center shrink-0">
                  <FiUserCheck size={28} className="text-secondary" />
                </div>
                <div>
                  <h2 className="text-2xl font-serif font-bold mb-3">Receiving Your Cake</h2>
                  <p className="text-base-content/70 leading-relaxed">
                    Please ensure someone is available at the delivery location to receive the cake. Our drivers will wait for a maximum of 15 minutes. If no one is reachable, the cake will be returned to our studio, and re-delivery charges will apply.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
