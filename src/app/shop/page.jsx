import ShopClient from "../../components/shop/ShopClient";
import { getCake } from "@/actions/server/cake";

// 1. Export standard static metadata for the Shop page
export const metadata = {
  // ... (keep metadata)
  title: "Our Collection | Cream & Co.",
  description:
    "Explore our premium collection of artisan cakes, from custom birthday cakes to elegant wedding centerpieces. Handcrafted with the finest ingredients in Dhaka.",
  keywords: [
    "cake shop",
    "online cake order",
    "custom birthday cakes",
    "wedding cakes",
    "bento cakes",
    "premium bakery",
    "cake delivery service",
    "artisan cakes",
    "Cream & Co bakery",
  ],
  openGraph: {
    title: "Our Collection | Cream & Co.",
    description:
      "Explore our premium collection of artisan cakes and desserts.",
    url: "https://creamandco.com/shop",
    siteName: "Cream & Co.",
    images: [
      {
        url: "https://i.ibb.co.com/9HwfDvG9/image.png", // Replace with a generic beautiful shop image
        width: 1200,
        height: 630,
        alt: "Cream & Co. Cake Collection",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default async function ShopPage() {
  const initialData = await getCake({ page: 1, limit: 12 });

  // 2. Render the interactive client component
  return <ShopClient initialData={initialData} />;
}
