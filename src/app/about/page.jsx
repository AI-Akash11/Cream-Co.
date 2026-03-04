import AboutHero from "@/components/about/AboutHero";
import BrandStory from "@/components/about/BrandStory";
import ValuesSection from "@/components/about/ValuesSection";
import WhyChooseUs from "@/components/about/WhyChooseUs";
import CallToAction from "@/components/about/CallToAction";

export const metadata = {
  title: "About | Cream & Co.",
  description:
    "Discover the story behind Cream & Co. – Dhaka’s premium artisan cake and pastry studio crafting small-batch bakes with fresh, locally sourced ingredients.",
};

export default function AboutPage() {
  return (
    <main className="bg-base-100 text-base-content">
      <AboutHero />
      <BrandStory />
      <ValuesSection />
      <WhyChooseUs />
      <CallToAction />
    </main>
  );
}

