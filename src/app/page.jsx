import Banner from "@/components/home/Banner";
import CategoriesSection from "@/components/home/CategoriesSection";
import FeaturedCakes from "@/components/home/FeaturedCakes";
import Testimonials from "@/components/home/Testimonials";
import HomeCTA from "@/components/home/HomeCTA";
import Features from "@/components/home/Features";

export default function Home() {
  return (
    <div className="">
      <section>
        <Banner />
      </section>

      <section>
        <CategoriesSection />
      </section>

      <section>
        <FeaturedCakes />
      </section>
      <section>
        <Features />
      </section>

      <section>
        <Testimonials />
      </section>

      <section>
        <HomeCTA />
      </section>
    </div>
  );
}
