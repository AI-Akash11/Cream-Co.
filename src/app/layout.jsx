import { Geist, Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import { CartProvider } from "@/context/CartContext";
import ConditionalLayout from "@/components/layouts/ConditionalLayout";

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
        </CartProvider>
      </body>
    </html>
  );
}
