"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import NavLink from "@/components/buttons/NavLink";
import { FiShoppingCart, FiMenu, FiX, FiSun, FiMoon } from "react-icons/fi";
import { useCart } from "@/context/CartContext";
import Logo from "@/components/shared/Logo";
import Container from "../ui/Container";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const { cartCount } = useCart();

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

  // Initialize theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    const isDarkMode = savedTheme === "dark";
    setIsDark(isDarkMode);
    applyTheme(isDarkMode);
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    applyTheme(newTheme);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setMobileMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-primary text-primary-content shadow-md will-change-transform">
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

          {/* Right Side - Cart, Theme Toggle, Mobile Menu & Auth */}
          <div className="flex-none flex items-center gap-2 md:gap-3">
            {/* Cart Icon with Badge */}
            <div className="indicator">
              {cartCount > 0 && (
                <span className="badge badge-sm badge-accent indicator-item -translate-y-2 translate-x-2">
                  {cartCount}
                </span>
              )}
              <Link
                href="/cart"
                className="btn btn-ghost bg-secondary btn-sm md:btn-md shadow-2xl hover:bg-secondary/30 focus:outline-none transition-all duration-200"
                aria-label="Shopping cart"
              >
                <FiShoppingCart size={20} />
              </Link>
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

            {/* Mobile Menu Button - Visible on Mobile Only */}
            <button
              className="md:hidden btn btn-ghost btn-sm"
              onClick={toggleMobileMenu}
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>

            {/* Desktop Auth - Hidden on Mobile */}
            <div className="hidden md:block">
              {isLoggedIn ? (
                // Profile Dropdown when logged in
                <div className="dropdown dropdown-end">
                  <button
                    className="btn btn-primary btn-sm rounded-lg"
                    tabIndex={0}
                  >
                    Profile
                  </button>
                  <ul
                    tabIndex={0}
                    className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-40"
                  >
                    <li>
                      <Link href="/dashboard" className="text-neutral">
                        Dashboard
                      </Link>
                    </li>
                    <li>
                      <Link href="/dashboard/orders" className="text-neutral">
                        Orders
                      </Link>
                    </li>
                    <li>
                      <button onClick={handleLogout} className="text-neutral">
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              ) : (
                // Login Button when not logged in
                <button
                  className="btn btn-secondary btn-sm rounded-lg"
                  onClick={() => setIsLoggedIn(true)}
                >
                  Login
                </button>
              )}
            </div>
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
            <div className="flex flex-col p-6 gap-4">
              {/* Mobile Nav Links */}
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase opacity-60 px-2">
                  Navigation
                </p>
                {navLinks.map((link) => (
                  <div key={link.href} onClick={() => setMobileMenuOpen(false)}>
                    <NavLink href={link.href}>{link.label}</NavLink>
                  </div>
                ))}
              </div>

              {/* Divider */}
              <div className="border-t border-primary-focus" />

              {/* Mobile Auth Section */}
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase opacity-60 px-2">
                  Account
                </p>
                {isLoggedIn ? (
                  <>
                    <Link
                      href="/dashboard"
                      className="block px-4 py-3 rounded-lg hover:bg-primary-focus transition-colors duration-200 text-sm font-medium"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <Link
                      href="/dashboard/orders"
                      className="block px-4 py-3 rounded-lg hover:bg-primary-focus transition-colors duration-200 text-sm font-medium"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Orders
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-3 rounded-lg hover:bg-primary-focus transition-colors duration-200 text-sm font-medium"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => {
                      setIsLoggedIn(true);
                      setMobileMenuOpen(false);
                    }}
                    className="w-full btn btn-secondary btn-sm rounded-lg"
                  >
                    Login
                  </button>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </nav>
  );
}
