import CakeDetailsClient from "../../../components/shop/CakeDetailsClient";
import { getCake, getSingleCake } from "@/actions/server/cake";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const { cakes } = await getCake();
  return cakes.map((item) => ({
    id: item._id,
  }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const cake = await getSingleCake(id);

  if (!cake) {
    return {
      title: "Cake Not Found | Cream & Co.",
    };
  }

  // Use the first image or a fallback
  const ogImage =
    cake.images?.[0] ||
    "https://images.unsplash.com/photo-1464347744102-11db6282f854";

  return {
    title: `${cake.name} | Cream & Co.`,
    description: cake.description,
    openGraph: {
      title: `${cake.name} | Cream & Co.`,
      description: cake.description,
      images: [
        {
          url: ogImage,
          width: 800,
          height: 800,
          alt: cake.name,
        },
      ],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${cake.name} | Cream & Co.`,
      description: cake.description,
      images: [ogImage],
    },
  };
}

export default async function CakeDetailsPage({ params }) {
  const { id } = await params;

  const cake = await getSingleCake(id);
  if (!cake) {
    notFound();
  }

  return <CakeDetailsClient cake={cake} />;
}
