import ShopClient from "../../components/shop/ShopClient";

// 1. Export standard static metadata for the Shop page
export const metadata = {
  title: "Our Collection | Cream & Co.",
  description:
    "Explore our premium collection of artisan cakes, from custom birthday cakes to elegant wedding centerpieces. Handcrafted with the finest ingredients in Dhaka.",
  keywords: [
    "cakes",
    "desserts",
    "birthday cakes",
    "custom cakes",
    "dhaka bakery",
    "wedding cakes",
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

export default function ShopPage() {
  // 2. Render the interactive client component
  return <ShopClient />;
}
