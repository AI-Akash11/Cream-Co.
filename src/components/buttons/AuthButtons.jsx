"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

const AuthButtons = () => {
  const session = useSession();
  return (
    <>
      {session.status == "authenticated" ? (
        <div className="flex flex-col items-center gap-3 w-full">
          <Link
            href="/orders"
            className="btn bg-base-100 md:btn-outline w-full rounded-xl font-semibold h-12 flex items-center justify-center border-[#7a4b4b] text-[#7a4b4b] hover:bg-[#7a4b4b] hover:text-white shadow-md transition-all"
          >
            My Orders
          </Link>
          
          {session.data?.user?.role === "admin" && (
            <div className="flex flex-col gap-3 w-full">
            <div className="flex flex-col gap-3 w-full">
              <Link
                href="/admin/manage-cakes"
                className="btn bg-base-100 md:btn-outline w-full rounded-xl font-semibold h-12 flex items-center justify-center border-[#7a4b4b] text-[#7a4b4b] hover:bg-[#7a4b4b] hover:text-white shadow-md transition-all"
              >
                Manage Cakes
              </Link>
              <Link
                href="/admin/add-cake"
                className="btn bg-base-100 md:btn-outline w-full rounded-xl font-semibold h-12 flex items-center justify-center border-[#7a4b4b] text-[#7a4b4b] hover:bg-[#7a4b4b] hover:text-white shadow-md transition-all"
              >
                Add Cake
              </Link>
            </div>
            </div>
          )}
          
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="btn bg-base-100 md:btn-outline btn-error w-full rounded-xl font-semibold h-12 flex items-center justify-center shadow-md transition-all hover:bg-error hover:text-white"
          >
            Logout
          </button>
        </div>
      ) : (
        <Link
          href="/login"
          className="btn btn-primary w-full rounded-xl font-semibold h-12 shadow-md hover:-translate-y-1 transition-all flex items-center justify-center"
        >
          Sign In to Order
        </Link>
      )}
    </>
  );
};

export default AuthButtons;
