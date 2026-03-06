"use client";

import { usePathname } from "next/navigation";

export default function ConditionalLayout({ header, footer, children }) {
  const pathname = usePathname();
  // Check if we are on login or register routes
  const isAuthPage =
    pathname?.startsWith("/login") || pathname?.startsWith("/register");

  return (
    <>
      {!isAuthPage && header}
      {/* Remove the min-h offset on auth pages so the auth layout can fill the screen properly */}
      <main
        className={!isAuthPage ? "min-h-[calc(100vh-421px)]" : "min-h-screen"}
      >
        {children}
      </main>
      {!isAuthPage && footer}
    </>
  );
}
