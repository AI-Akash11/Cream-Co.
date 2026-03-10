"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FiMail, FiLock, FiUser, FiUpload, FiArrowLeft } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { postUser } from "@/actions/server/auth";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import SocialButton from "@/components/buttons/SocialButton";
import { signIn } from "next-auth/react";
import Image from "next/image";

export default function RegisterPage() {
  const params = useSearchParams();
  const callBackUrl = params.get("callbackUrl") || "/";
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const form = e.target;

    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;

    const payload = { name, email, password };
    // payload log removed

    const result = await postUser(payload);
    // result log removed

    if (result?.success) {
      // router.push("/login");
      const result = await signIn("credentials", {
        email: email,
        password: password,
        redirect: false,
        callbackUrl: callBackUrl,
      });
      if(result.ok){

        toast.success(result.message || "User created successfully.");
        router.push(callBackUrl);
      }
    } else {
      toast.error(result?.message || "Registration failed. Please try again.");
    }
    setIsSubmitting(false);
  };

  return (
    <div className="flex flex-col md:flex-row-reverse min-h-[700px]">
      {/* Right Column: Form */}
      <div className="w-full md:w-1/2 p-8 lg:p-16 flex flex-col justify-center">
        <Link
          href="/"
          className="flex items-center gap-2 text-sm font-medium opacity-60 hover:opacity-100 transition-opacity mb-8 w-fit"
        >
          <FiArrowLeft /> Back to Home
        </Link>

        <div className="mb-10">
          <h1 className="text-4xl font-serif font-bold italic mb-2">
            Join Cream & Co.
          </h1>
          <p className="text-base-content/60">
            Create an account to start your sweet journey
          </p>
        </div>

        <form className="space-y-5" onSubmit={handleRegister}>
          <div className="form-control">
            <label className="label text-sm font-bold opacity-70">
              Full Name
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-base-content/40">
                <FiUser size={18} />
              </span>
              <input
                type="text"
                name="name"
                placeholder="John Doe"
                className="input input-bordered w-full pl-12 rounded-xl bg-base-100 border-base-300 focus:border-primary transition-all"
                required
              />
            </div>
          </div>

          <div className="form-control">
            <label className="label text-sm font-bold opacity-70">
              Email Address
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-base-content/40">
                <FiMail size={18} />
              </span>
              <input
                type="email"
                name="email"
                placeholder="email@example.com"
                className="input input-bordered w-full pl-12 rounded-xl bg-base-100 border-base-300 focus:border-primary transition-all"
                required
              />
            </div>
          </div>

          <div className="form-control">
            <label className="label text-sm font-bold opacity-70">
              Password
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-base-content/40">
                <FiLock size={18} />
              </span>
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                className="input input-bordered w-full pl-12 rounded-xl bg-base-100 border-base-300 focus:border-primary transition-all"
                required
              />
            </div>
          </div>

           <button 
             type="submit"
             disabled={isSubmitting}
             className="btn btn-primary w-full h-14 rounded-xl text-lg font-bold shadow-lg shadow-primary/20 hover:-translate-y-1 transition-all mt-4 flex items-center justify-center gap-2"
           >
             {isSubmitting ? (
               <>
                 <span className="loading loading-spinner"></span>
                 Creating Account...
               </>
             ) : (
               "Create Account"
             )}
           </button>
        </form>

        <div className="divider my-8 opacity-50 uppercase text-[10px] font-bold tracking-widest">
          Or join with
        </div>

        <SocialButton />

        <p className="mt-10 text-center text-sm opacity-70">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-primary font-bold hover:underline ml-1"
          >
            Login here
          </Link>
        </p>
      </div>

      {/* Left Column: Banner (Banner on left for register) */}
      <div className="hidden md:block w-1/2 relative bg-base-300">
        <Image
          src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=1089&auto=format&fit=crop"
          alt="Artisan Cakes Branding"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-primary/20 backdrop-blur-[2px] flex flex-col items-center justify-center p-12 text-center text-white">
          <div className="bg-black/40 backdrop-blur-md p-8 rounded-3xl border border-white/20">
            <h2 className="text-3xl font-serif italic font-bold mb-4">
              Start Something Sweet
            </h2>
            <p className="text-white/80 max-w-xs mx-auto">
              Join our community of cake lovers and get exclusive offers on
              custom creations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
