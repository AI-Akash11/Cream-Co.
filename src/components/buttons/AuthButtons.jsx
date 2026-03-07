"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

const AuthButtons = () => {
  const session = useSession();
  return (
    <div className="w-full">
      {session.status == "authenticated" 
      ? 
      (
        <button 
        onClick={() => signOut()}
        className="btn btn-secondary w-full rounded-xl text-white font-bold h-12 shadow-lg shadow-secondary/20 hover:-translate-y-1 transition-all flex items-center justify-center">
          Logout
        </button>
      ) 
      : 
      (
        <Link
          href="/login"
          className="btn btn-secondary w-full rounded-xl text-white font-bold h-12 shadow-lg shadow-secondary/20 hover:-translate-y-1 transition-all flex items-center justify-center"
        >
          Sign In to Order
        </Link>
      )}
    </div>
  );
};

export default AuthButtons;
