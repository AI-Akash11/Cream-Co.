import Banner from "@/components/home/Banner";
import FeaturedCakes from "@/components/home/FeaturedCakes";

export default function Home() {
  return (
    <div className="">
      <section>
        <Banner />
      </section>

      <section>
        <FeaturedCakes />
      </section>
    </div>
  );
}
