import { Geist, Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import { CartProvider } from "@/context/CartContext";

const poppins = Poppins({
  weight: ["100", "200", "400", "500", "600", "800"],
});

export const metadata = {
  title: "Cream & Co.",
  description: "Premium pre-order cakes delivered across Dhaka",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poppins.className} antialiased`}>
        <CartProvider>
          <header className="sticky top-0 z-50 w-full">
            <Navbar />
          </header>
          <main className="min-h-[calc(100vh-421px)]">{children}</main>
          <footer>
            <Footer />
          </footer>
        </CartProvider>
      </body>
    </html>
  );
}
