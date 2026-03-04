"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NavLink = ({ href, children }) => {
  const path = usePathname();
  const isActive = href === "/" ? path === "/" : path.startsWith(href);
  return (
    <div>
      <Link
        className={`${isActive ? "text-base-100 font-semibold underline underline-offset-4" : "hover:text-base-100/80 hover:underline hover:underline-offset-4"} text-sm font-medium transition-colors duration-200`}
        href={href}
      >
        {children}
      </Link>
    </div>
  );
};

export default NavLink;
