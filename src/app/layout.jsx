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
          <header>
            <Navbar />
          </header>
          {children}
          <footer>
            <Footer />
          </footer>
        </CartProvider>
      </body>
    </html>
  );
}
