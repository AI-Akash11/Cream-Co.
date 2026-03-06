import ProductDetailsClient from "../../../components/shop/ProductDetailsClient";
import foodsData from "@/data/foods.json";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return foodsData.map((item) => ({
    slug: item.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = foodsData.find((item) => item.slug === slug);

  if (!product) {
    return {
      title: "Product Not Found | Cream & Co.",
    };
  }

  // Use the first image or a fallback
  const ogImage =
    product.images?.[0] ||
    "https://images.unsplash.com/photo-1464347744102-11db6282f854";

  return {
    title: `${product.name} | Cream & Co.`,
    description: product.description,
    openGraph: {
      title: `${product.name} | Cream & Co.`,
      description: product.description,
      images: [
        {
          url: ogImage,
          width: 800,
          height: 800,
          alt: product.name,
        },
      ],
      type: "article", // Next.js standard for e-commerce products
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} | Cream & Co.`,
      description: product.description,
      images: [ogImage],
    },
  };
}

export default async function ProductDetailsPage({ params }) {
  const { slug } = await params;

  const product = foodsData.find((item) => item.slug === slug);
  if (!product) {
    notFound();
  }

  return <ProductDetailsClient product={product} />;
}
