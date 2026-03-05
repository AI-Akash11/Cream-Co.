import Banner from "@/components/home/Banner";
import CategoriesSection from "@/components/home/CategoriesSection";
import FeaturedCakes from "@/components/home/FeaturedCakes";

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
    </div>
  );
}
