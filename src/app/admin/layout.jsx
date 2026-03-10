"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { 
  FiPackage, 
  FiPlusCircle, 
  FiShoppingBag, 
  FiHome, 
  FiLogOut,
  FiMenu,
  FiUser
} from "react-icons/fi";
import { signOut, useSession } from "next-auth/react";

const sidebarLinks = [
  { name: "Manage Cakes", href: "/admin/manage-cakes", icon: FiPackage },
  { name: "Add New Cake", href: "/admin/add-cake", icon: FiPlusCircle },
  { name: "All Orders", href: "/admin/orders", icon: FiShoppingBag },
];

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <div className="drawer lg:drawer-open">
      <input id="admin-drawer" type="checkbox" className="drawer-toggle" />
      
      <div className="drawer-content flex flex-col bg-base-100 min-h-screen">
        {/* Navbar for Mobile */}
        <div className="w-full navbar bg-base-200 lg:hidden shadow-sm sticky top-0 z-30">
          <div className="flex-none">
            <label htmlFor="admin-drawer" className="btn btn-square btn-ghost">
              <FiMenu size={20} />
            </label>
          </div>
          <div className="flex-1 px-2 mx-2 font-serif font-black text-xl">Cream & Co.</div>
        </div>
        
        {/* Main Content Area */}
        <main className="p-4 sm:p-8 lg:p-12">
          {children}
        </main>
      </div>

      <div className="drawer-side z-40">
        <label htmlFor="admin-drawer" className="drawer-overlay"></label>
        <div className="menu p-4 w-80 min-h-full bg-base-200 text-base-content border-r border-base-300 flex flex-col justify-between">
          <div>
            {/* Sidebar Branding */}
            <Link href="/" className="flex items-center gap-3 px-4 py-8 mb-4 border-b border-base-300 hover:opacity-80 transition-opacity">
               <div className="relative w-12 h-12">
                  <Image 
                    src="/logoImage.png" 
                    alt="Cream & Co. Logo" 
                    fill 
                    className="object-contain"
                    sizes="48px"
                  />
               </div>
               <div>
                  <h1 className="font-serif font-black text-xl leading-none">Admin</h1>
                  <p className="text-[10px] uppercase tracking-widest opacity-50 mt-1 font-bold">Cake Management</p>
               </div>
            </Link>

            {/* Sidebar Navigation */}
            <ul className="space-y-2">
              <li className="menu-title opacity-40 text-[10px] uppercase font-bold tracking-widest ml-4 mb-2">Navigation</li>
              {sidebarLinks.map((link) => {
                const Icon = link.icon;
                const isActive = pathname === link.href;
                return (
                  <li key={link.href}>
                    <Link 
                      href={link.href}
                      className={`flex items-center gap-3 px-6 py-4 rounded-xl transition-all ${
                        isActive 
                        ? "bg-primary text-primary-content font-bold shadow-lg shadow-primary/20" 
                        : "hover:bg-base-300"
                      }`}
                    >
                      <Icon size={18} />
                      <span>{link.name}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          <div>
             {/* User Profile Section */}
             <div className="mt-8 pt-8 border-t border-base-300 px-4">
                <div className="flex items-center gap-3 mb-6">
                   <div className="avatar ring-2 ring-primary/20 ring-offset-2 rounded-full">
                      <div className="w-10 rounded-full bg-base-300 relative overflow-hidden">
                        {session?.user?.image ? (
                          <Image 
                            src={session.user.image} 
                            alt={session.user.name || "User"} 
                            fill 
                            className="object-cover"
                            sizes="40px"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-base-content/40">
                             <FiUser size={20} />
                          </div>
                        )}
                      </div>
                   </div>
                   <div className="overflow-hidden">
                      <p className="font-bold truncate text-sm">{session?.user?.name || "Administrator"}</p>
                      <p className="text-xs opacity-50 truncate">{session?.user?.email}</p>
                   </div>
                </div>

                <div className="space-y-2">
                  <Link 
                    href="/" 
                    className="btn btn-ghost btn-sm w-full justify-start rounded-lg text-xs opacity-60 hover:opacity-100"
                  >
                    <FiHome className="mr-2" /> Back to Store
                  </Link>
                  <button 
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="btn btn-ghost btn-sm w-full justify-start rounded-lg text-xs text-error hover:bg-error/10"
                  >
                    <FiLogOut className="mr-2" /> Sign Out
                  </button>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
