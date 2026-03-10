import { Geist, Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import { CartProvider } from "@/context/CartContext";
import ConditionalLayout from "@/components/layouts/ConditionalLayout";
import CartDrawer from "@/components/cart/CartDrawer";
import NextAuthProvider from "@/provider/NextAuthProvider";
import SmoothScrolling from "@/components/animations/SmoothScrolling";

const poppins = Poppins({
  weight: ["100", "200", "400", "500", "600", "800"],
    subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL("https://cream-and-co.vercel.app"),

  title: {
    default: "Cream & Co | Premium Cakes & Custom Desserts",
    template: "%s | Cream & Co",
  },

  description:
    "Cream & Co is a premium cake studio offering freshly baked cakes, custom celebration cakes, and handcrafted desserts for birthdays, weddings, and special occasions.",

  category: "Food & Bakery",

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
    "custom cakes Dhaka",
    "best cakes Dhaka",
  ],

  authors: [{ name: "Ali Imam Akash" }],
  creator: "Ali Imam Akash",
  publisher: "Ali Imam Akash",

  icons: {
    icon: "/logoImage.png",
  },

  openGraph: {
    type: "website",
    url: "https://cream-and-co.vercel.app",
    title: "Cream & Co | Premium Cakes & Custom Desserts",
    description:
      "Order beautifully crafted cakes and desserts from Cream & Co. Freshly baked with premium ingredients and perfect for every celebration.",
    siteName: "Cream & Co",
    images: [
      {
        url: "https://i.ibb.co.com/ZRV9qq4X/image.png",
        width: 1200,
        height: 630,
        alt: "Cream & Co Premium Cakes",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Cream & Co | Premium Cakes & Custom Desserts",
    description:
      "Freshly baked cakes, custom designs, and premium desserts for every celebration.",
    images: ["https://i.ibb.co.com/ZRV9qq4X/image.png"],
  },

  robots: {
    index: true,
    follow: true,
  },
};
export default function RootLayout({ children }) {
  return (
    <NextAuthProvider>
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.className} antialiased selection:bg-primary/10`}>
        <CartProvider>
          <SmoothScrolling>
            <ConditionalLayout
              header={
                <header className="sticky top-0 z-50 w-full">
                  <Navbar />
                </header>
              }
              footer={
                <footer>
                  <Footer />
                </footer>
              }
            >
              {children}
            </ConditionalLayout>
          </SmoothScrolling>
          {/* Global Cart Drawer */}
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
    </NextAuthProvider>
  );
}
