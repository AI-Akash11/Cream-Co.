import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/about/SectionHeading";
import { StaggerContainer, StaggerItem } from "@/components/animations/Animations";

const categories = [
  {
    name: "Birthday Cakes",
    slug: "birthday-cakes",
    image: "https://i.ibb.co.com/4wgXKrwZ/Birthday-Cake1.jpg",
  },
  {
    name: "Signature Cakes",
    slug: "signature-cakes",
    image: "https://i.ibb.co.com/KpgCNn4H/Signature1.jpg",
  },
  {
    name: "Premium Cakes",
    slug: "premium-cakes",
    image: "https://i.ibb.co.com/Kx7GYJ8N/Premium1.jpg",
  },
  {
    name: "Custom Cakes",
    slug: "custom-cakes",
    image: "https://i.ibb.co.com/xKBVbWDs/Custom1.jpg",
  },
  {
    name: "Bento Cakes",
    slug: "bento-cakes",
    image: "https://i.ibb.co.com/Mx2P56tM/Bento1.jpg",
  },
  {
    name: "Wedding Cakes",
    slug: "wedding-cakes",
    image: "https://i.ibb.co.com/tTbz8mMm/Wedding1.jpg",
  },
  {
    name: "Cupcakes",
    slug: "cupcakes",
    image: "https://i.ibb.co.com/V0m203Fk/Cupcake1.jpg",
  },
  {
    name: "Pastries",
    slug: "pastries",
    image: "https://i.ibb.co.com/V0Yf5XGp/Pastry1.jpg",
  },
];

// Provide URL encoding to guarantee safe URL generation
export default function CategoriesSection() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-base-100">
      <Container>
        <div className="flex flex-col gap-10 sm:gap-12">
          <SectionHeading
            eyebrow="Browse by type"
            title="Shop by Category"
            align="center"
          />

          <StaggerContainer className="grid grid-cols-4 sm:grid-cols-4 lg:grid-cols-8 gap-6 sm:gap-8">
            {categories.map((cat) => (
              <StaggerItem key={cat.slug}>
                <Link
                  href={`/shop?category=${encodeURIComponent(cat.name)}`}
                  className="group flex flex-col items-center gap-3"
                >
                  {/* Circular Image */}
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-full overflow-hidden ring-2 ring-base-300/40 group-hover:ring-primary/60 transition-all duration-300 shadow-sm group-hover:shadow-md">
                    <Image
                      src={cat.image}
                      alt={cat.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(min-width: 1024px) 96px, (min-width: 640px) 80px, 64px"
                    />
                    {/* Subtle overlay on hover */}
                    <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-300" />
                  </div>

                  {/* Category Name */}
                  <p className="text-xs sm:text-sm font-medium text-center text-base-content/80 group-hover:text-primary transition-colors duration-300 leading-tight">
                    {cat.name}
                  </p>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </Container>
    </section>
  );
}
