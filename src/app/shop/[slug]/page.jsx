import ProductDetailsClient from "./ProductDetailsClient";
import foodsData from "@/data/foods.json";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return foodsData.map((item) => ({
    slug: item.slug,
  }));
}

export default async function ProductDetailsPage({ params }) {
  const { slug } = await params;

  const product = foodsData.find((item) => item.slug === slug);
  if (!product) {
    notFound();
  }

  return <ProductDetailsClient product={product} />;
}
