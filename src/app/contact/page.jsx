import ContactHero from "@/components/contact/ContactHero";
import ContactInfo from "@/components/contact/ContactInfo";
import ContactForm from "@/components/contact/ContactForm";
import MapSection from "@/components/contact/MapSection";
import FAQTeaser from "@/components/contact/FAQTeaser";
import ContactCTA from "@/components/contact/ContactCTA";

export const metadata = {
  title: "Contact Us & Find Our Location",
  description:
    "Get in touch with Cream & Co. – Dhaka's premium artisan bakery. Reach out for order inquiries, custom cake designs, or visit our location.",
  openGraph: {
    title: "Contact Us & Find Our Location | Cream & Co.",
    description:
      "Get in touch for order inquiries and custom cake designs in Dhaka.",
  },
};

export default function ContactPage() {
  return (
    <main className="bg-base-100 text-base-content">
      <ContactHero />
      <ContactInfo />
      <ContactForm />
      <MapSection />
      <FAQTeaser />
      <ContactCTA />
    </main>
  );
}
