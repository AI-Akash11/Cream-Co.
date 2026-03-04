import Link from "next/link";
import Image from "next/image";
import {
  FaInstagram,
  FaFacebook,
  FaTwitter,
  FaTiktok,
  FaPinterest,
} from "react-icons/fa";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-neutral text-neutral-content">
      {/* Main Footer Content */}
      <div className="px-4 py-12 md:px-8 md:py-16">
        {/* 4-Column Grid - Desktop, Stacked Mobile */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 max-w-7xl mx-auto">
          {/* Column 1: Brand Section */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 relative">
                <Image
                  src="/favicon.ico"
                  alt="Cream & Co. Logo"
                  width={40}
                  height={40}
                  className="w-full h-full"
                />
              </div>
              <div>
                <p className="font-serif font-bold text-lg">Cream</p>
                <p className="font-sans font-semibold text-xs -mt-1">& Co.</p>
              </div>
            </div>

            {/* Brand Description */}
            <p className="text-sm opacity-80 leading-relaxed">
              Premium handcrafted cakes delivered across Dhaka. Order 24 hours
              in advance for your perfect celebration.
            </p>

            {/* Social Icons */}
            <div className="flex gap-4 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-pink-600 hover:text-pink-400 transition-colors duration-200"
                aria-label="Instagram"
                title="Follow us on Instagram"
              >
                <FaInstagram size={20} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-400 transition-colors duration-200"
                aria-label="Facebook"
                title="Follow us on Facebook"
              >
                <FaFacebook size={20} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sky-500 hover:text-sky-400 transition-colors duration-200"
                aria-label="Twitter"
                title="Follow us on Twitter"
              >
                <FaTwitter size={20} />
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-500 hover:text-cyan-300 transition-colors duration-200"
                aria-label="TikTok"
                title="Follow us on TikTok"
              >
                <FaTiktok size={20} />
              </a>
              <a
                href="https://pinterest.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-red-600 hover:text-red-400 transition-colors duration-200"
                aria-label="Pinterest"
                title="Follow us on Pinterest"
              >
                <FaPinterest size={20} />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="font-semibold text-base mb-4">Quick Links</h3>
            <ul className="flex flex-col gap-3">
              <li>
                <Link
                  href="/"
                  className="text-sm opacity-80 hover:opacity-100 transition-opacity duration-200"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/shop"
                  className="text-sm opacity-80 hover:opacity-100 transition-opacity duration-200"
                >
                  Shop
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-sm opacity-80 hover:opacity-100 transition-opacity duration-200"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm opacity-80 hover:opacity-100 transition-opacity duration-200"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Customer Support */}
          <div>
            <h3 className="font-semibold text-base mb-4">Support</h3>
            <ul className="flex flex-col gap-3">
              <li>
                <Link
                  href="#"
                  className="text-sm opacity-80 hover:opacity-100 transition-opacity duration-200"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm opacity-80 hover:opacity-100 transition-opacity duration-200"
                >
                  Delivery Policy
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm opacity-80 hover:opacity-100 transition-opacity duration-200"
                >
                  Refund Policy
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm opacity-80 hover:opacity-100 transition-opacity duration-200"
                >
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div>
            <h3 className="font-semibold text-base mb-4">Contact Info</h3>
            <ul className="flex flex-col gap-4 text-sm">
              <li className="opacity-80">
                <p className="font-medium">Location</p>
                <p className="text-xs">Dhaka, Bangladesh</p>
              </li>
              <li className="opacity-80">
                <p className="font-medium">Phone</p>
                <a
                  href="tel:+8801700000000"
                  className="text-xs hover:opacity-100 transition-opacity duration-200"
                >
                  +880 1700 000000
                </a>
              </li>
              <li className="opacity-80">
                <p className="font-medium">Email</p>
                <a
                  href="mailto:hello@creamandco.com"
                  className="text-xs hover:opacity-100 transition-opacity duration-200"
                >
                  hello@creamandco.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar - Copyright */}
      <div className="border-t border-neutral-focus">
        <div className="px-4 md:px-8 py-3 text-center">
          <p className="text-xs opacity-70">
            © {currentYear} Cream & Co. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
