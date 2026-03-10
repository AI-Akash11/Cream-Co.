"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import NavLink from "@/components/buttons/NavLink";
import {
  FiShoppingCart,
  FiMenu,
  FiX,
  FiSun,
  FiMoon,
  FiChevronDown,
  FiStar,
  FiUser,
  FiLogOut,
  FiLayout,
} from "react-icons/fi";
import { useSession } from "next-auth/react";
import { useCart } from "@/context/CartContext";
import Logo from "@/components/shared/Logo";
import Container from "@/components/ui/Container";
import AuthButtons from "../buttons/AuthButtons";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const { cartCount, setIsCartOpen } = useCart();

  // Theme application function must be defined before useEffect
  const applyTheme = (dark) => {
    const html = document.documentElement;
    if (dark) {
      html.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
    } else {
      html.setAttribute("data-theme", "light");
      localStorage.setItem("theme", "light");
    }
  };

  // Theme initialization with a small delay to avoid cascading render lint
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    const isDarkMode = savedTheme === "dark";

    const timer = setTimeout(() => {
      setIsDark(isDarkMode);
      applyTheme(isDarkMode);
      setIsMounted(true);
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    applyTheme(newTheme);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-primary/95 backdrop-blur-sm text-primary-content shadow-md transition-all duration-300">
      {/* Main Navbar - Full width background, max-width content */}
      <Container>
        <div className="w-full px-4 md:px-8">
          <div className="navbar p-0 bg-transparent text-primary-content">
            {/* Left Section - Logo */}
            <div className="flex-initial">
              <Logo />
            </div>

            {/* Center Section - Navigation Links */}
            <div className="flex-1 flex items-center justify-center">
              <div className="hidden md:flex gap-8">
                {navLinks.map((link) => (
                  <NavLink key={link.href} href={link.href}>
                    {link.label}
                  </NavLink>
                ))}
              </div>
            </div>

            {/* Right Side - Cart, Theme Toggle, Combined Options (Desktop) & Mobile Menu Toggle */}
            <div className="flex-none flex items-center gap-2 md:gap-3">
              {/* Cart Icon with Badge */}
              <div className="indicator">
                {cartCount > 0 && (
                  <span className="badge badge-sm badge-accent indicator-item -translate-y-2 translate-x-2">
                    {cartCount}
                  </span>
                )}
                <button
                  onClick={() => setIsCartOpen(true)}
                  className="btn btn-ghost bg-secondary btn-sm md:btn-md shadow-2xl hover:bg-secondary/30 focus:outline-none transition-all duration-200"
                  aria-label="Open cart"
                >
                  <FiShoppingCart size={20} />
                </button>
              </div>

              {/* Theme Toggle Button */}
              <button
                onClick={toggleTheme}
                className={`btn btn-ghost btn-sm md:btn-md rounded-full bg-secondary shadow-2xl hover:bg-secondary/30 focus:outline-none transition-all duration-200 ${isDark ? "hover:border-blue-400" : "hover:border-yellow-400"}`}
                aria-label="Toggle theme"
                title={isDark ? "Switch to light mode" : "Switch to dark mode"}
              >
                {isDark ? (
                  <FiMoon size={20} className="text-blue-400" />
                ) : (
                  <FiSun size={20} className="text-yellow-400" />
                )}
              </button>

              {/* Desktop Combined Dropdown - Hidden on Mobile */}
              <div className="hidden md:block">
                <div className="dropdown dropdown-end dropdown-hover group">
                  <label
                    tabIndex={0}
                    className="btn btn-ghost btn-sm md:btn-md rounded-full bg-secondary shadow-2xl hover:bg-secondary/30 focus:outline-none transition-all duration-200 flex items-center gap-1 px-4"
                  >
                    <FiUser size={18} />
                    <FiChevronDown
                      size={14}
                      className="group-hover:rotate-180 transition-transform duration-300 opacity-60"
                    />
                  </label>
                  <ul
                    tabIndex={0}
                    className="dropdown-content menu p-2 shadow-2xl bg-base-100 rounded-2xl w-72 border border-base-200 animate-in fade-in slide-in-from-top-2 duration-200 z-50"
                  >
                    {/* Invisible Bridge to prevent hover loss */}
                    <div className="absolute -top-4 left-0 w-full h-4 bg-transparent" />

                    <div className="p-4 border-b border-base-200 mb-2">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-base-content/40">
                        Exclusive Services
                      </p>
                    </div>
                    <li className="px-2">
                      <Link
                        href="/custom"
                        className="flex flex-col items-start gap-1 p-4 rounded-xl bg-linear-to-br from-primary/10 to-transparent hover:from-primary hover:to-primary/80 group/item transition-all duration-300 border border-primary/20 hover:border-primary shadow-sm hover:shadow-primary/20"
                      >
                        <div className="flex items-center gap-3 w-full">
                          <div className="bg-primary text-white p-2 rounded-lg group-hover/item:bg-white group-hover/item:text-primary transition-colors duration-300 shadow-sm">
                            <FiStar className="w-4 h-4" />
                          </div>
                          <span className="font-serif font-bold italic text-lg tracking-tight text-base-content group-hover/item:text-white">
                            Build Your Cake
                          </span>
                        </div>
                        <p className="text-[10px] text-base-content/60 group-hover/item:text-white uppercase tracking-widest font-bold mt-2 leading-none">
                          Custom Creations
                        </p>
                      </Link>
                    </li>
                    <div className="divider my-2 opacity-50 px-4" />
                    <div className="px-4 mb-2">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-base-content/40">
                        Account Interface
                      </p>
                    </div>
                    <div className="px-4 mt-2">
                      <AuthButtons />
                    </div>
                  </ul>
                </div>
              </div>

              {/* Mobile Menu Button - Visible on Mobile Only */}
              <button
                className="md:hidden btn btn-ghost btn-sm"
                onClick={toggleMobileMenu}
                aria-label="Toggle navigation menu"
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </Container>
      {/* Mobile Menu Drawer - Slide from Right */}
      {mobileMenuOpen && (
        <>
          {/* Backdrop Overlay */}
          <div
            className="fixed inset-0 md:hidden bg-black/40 z-40"
            onClick={() => setMobileMenuOpen(false)}
          />
          {/* Drawer Panel */}
          <div className="fixed right-0 top-16 h-screen w-72 bg-primary text-primary-content shadow-xl z-50 animate-in slide-in-from-right md:hidden overflow-y-auto">
            <div className="flex flex-col p-6 gap-6">
              {/* Mobile Nav Links */}
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase opacity-60 px-2 mb-2">
                  Navigation
                </p>
                {navLinks.map((link) => (
                  <div key={link.href} onClick={() => setMobileMenuOpen(false)}>
                    <NavLink href={link.href}>{link.label}</NavLink>
                  </div>
                ))}
              </div>

              {/* Mobile CTA (Build Your Cake) */}
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase opacity-60 px-2 mb-2">
                  Special Services
                </p>
                <Link
                  href="/custom"
                  className="flex items-center gap-4 px-4 py-4 rounded-2xl bg-primary/10 text-primary-content hover:bg-primary/20 transition-all border border-primary/20"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <div className="bg-primary text-white p-2 rounded-xl shrink-0">
                    <FiStar className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-bold text-base leading-none">
                      Build Your Cake
                    </p>
                    <p className="text-[10px] opacity-60 uppercase tracking-widest mt-1">
                      Custom Creations
                    </p>
                  </div>
                </Link>
              </div>

              {/* Divider */}
              <div className="border-t border-primary-content/10 mx-2" />

              {/* Mobile Auth Section */}
              <div className="space-y-4">
                <p className="text-xs font-semibold uppercase opacity-60 px-2">
                  Account Access
                </p>
                <div className="px-2">
                  <AuthButtons />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </nav>
  );
}
