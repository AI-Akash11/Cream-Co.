"use client";

import { usePathname } from "next/navigation";

export default function ConditionalLayout({ header, footer, children }) {
  const pathname = usePathname();
  // Check if we are on login, register or admin routes
  const isAuthPage =
    pathname?.startsWith("/login") || pathname?.startsWith("/register");
  
  const isAdminPage = pathname?.startsWith("/admin");

  const hideHeaderFooter = isAuthPage || isAdminPage;

  return (
    <>
      {!hideHeaderFooter && header}
      {/* Remove the min-h offset on auth/admin pages so the specialized layout can fill the screen properly */}
      <main
        className={!hideHeaderFooter ? "min-h-[calc(100vh-421px)]" : "min-h-screen"}
      >
        {children}
      </main>
      {!hideHeaderFooter && footer}
    </>
  );
}
