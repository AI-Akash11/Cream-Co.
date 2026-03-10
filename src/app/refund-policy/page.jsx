import Container from "@/components/ui/Container";
import { FiRefreshCcw, FiAlertCircle, FiCamera } from "react-icons/fi";

export const metadata = {
  title: "Refund Policy | Cream & Co.",
  description: "Our policies regarding cancellations and refunds.",
};

export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen bg-base-200/50 py-16 md:py-24">
      <Container>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-serif font-bold italic mb-4">
              Refund Policy
            </h1>
            <p className="text-base-content/60">
              Clear guidelines on cancellations and adjustments.
            </p>
          </div>

          <div className="bg-base-100 p-8 md:p-12 rounded-3xl shadow-sm border border-base-300">
            <p className="text-lg text-base-content/80 leading-relaxed mb-10 text-center max-w-2xl mx-auto">
              We take great pride in our delicious creations. If you are not entirely satisfied with your purchase, we are here to help.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="p-8 rounded-2xl bg-base-200/50 border border-base-300">
                <FiRefreshCcw size={32} className="text-primary mb-4" />
                <h2 className="text-2xl font-serif font-bold mb-4">Cancellations</h2>
                <p className="text-base-content/70 leading-relaxed">
                  Orders for signature cakes can be canceled up to 48 hours before the scheduled delivery or pickup time for a full refund. Custom cake orders must be canceled at least 72 hours in advance, as specialized ingredients and designs are prepared early.
                </p>
              </div>

              <div className="p-8 rounded-2xl bg-base-200/50 border border-base-300">
                <FiCamera size={32} className="text-primary mb-4" />
                <h2 className="text-2xl font-serif font-bold mb-4">Order Issues</h2>
                <p className="text-base-content/70 leading-relaxed">
                  If there is a defect with your cake or it was damaged during delivery by our staff, please contact us immediately upon receiving it. We will require photos of the issues to process a replacement or a refund. 
                </p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-warning/10 border border-warning/20 flex gap-4 items-start">
              <FiAlertCircle size={28} className="text-warning shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold mb-2">Important Note on Quality</h3>
                <p className="text-base-content/80 leading-relaxed">
                  We cannot offer refunds for cakes that have been improperly handled, transported, or stored by the customer after pickup/delivery. Taste is subjective, and we do not offer refunds simply because a flavor wasn&apos;t to a personal preference.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
