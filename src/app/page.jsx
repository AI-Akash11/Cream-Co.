import Banner from "@/components/home/Banner";
import CategoriesSection from "@/components/home/CategoriesSection";
import FeaturedCakes from "@/components/home/FeaturedCakes";
import Testimonials from "@/components/home/Testimonials";
import HomeCTA from "@/components/home/HomeCTA";
import Features from "@/components/home/Features";
import { getCake } from "@/actions/server/cake";
import { getServerSession } from "next-auth";
import Test from "@/components/Test";
import { authOptions } from "@/lib/authOption";

export const metadata = {
  title: "Cream & Co | Premium Cakes & Custom Desserts",
  description:
    "Dhaka's finest artisan cake studio. Order handcrafted premium cakes, custom celebration cakes, and delicious desserts delivered to your doorstep.",
  openGraph: {
    title: "Cream & Co | Premium Cakes & Custom Desserts",
    description:
      "Dhaka's finest artisan cake studio. Order handcrafted premium cakes and custom celebration cakes.",
  },
};

export default async function Home() {
  const session = await getServerSession(authOptions);
  const { cakes: allCakes } = await getCake();
  const featuredCakes = allCakes.filter((cake) => cake.featured).slice(0, 4);

  return (
    <div className="">
      <section>
        <Banner />
      </section>

      <section>
        <CategoriesSection />
      </section>

      <section>
        <FeaturedCakes featuredCakes={featuredCakes} />
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
