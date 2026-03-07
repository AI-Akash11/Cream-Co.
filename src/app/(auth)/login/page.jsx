"use client";

import Link from "next/link";
import { FiMail, FiLock, FiArrowLeft } from "react-icons/fi";
import { signIn } from "next-auth/react";
import Swal from "sweetalert2";
import {  useRouter, useSearchParams } from "next/navigation";
import SocialButton from "@/components/buttons/SocialButton";

export default function LoginPage() {
  const params = useSearchParams();
  const callBackUrl = params.get("callbackUrl") || "/";
  const router = useRouter()

  const handleLogin = async (e) => {
    e.preventDefault();
    const form = e.target;

    const result = await signIn("credentials", {
      email: form.email.value,
      password: form.password.value,
      redirect: false,
      // callbackUrl: params.get("callbackUrl") || "/",
    });
    console.log(result);
    if (!result.ok) {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: "Invalid credentials",
        timer: 2000,
        showConfirmButton: false,
      });
    } else {
      Swal.fire({
        icon: "success",
        title: "Login Successful",
        text: "You are now logged in",
        timer: 2000,
        showConfirmButton: false,
      });
      router.push(callBackUrl);
    }
  };
  return (
    <div className="flex flex-col md:flex-row min-h-[600px]">
      {/* Left Column: Form */}
      <div className="w-full md:w-1/2 p-8 lg:p-16 flex flex-col justify-center">
        <Link
          href="/"
          className="flex items-center gap-2 text-sm font-medium opacity-60 hover:opacity-100 transition-opacity mb-8 w-fit"
        >
          <FiArrowLeft /> Back to Home
        </Link>

        <div className="mb-10">
          <h1 className="text-4xl font-serif font-bold italic mb-2">
            Welcome Back
          </h1>
          <p className="text-base-content/60">
            Enter your credentials to access your account
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleLogin}>
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
                placeholder="email@example.com"
                className="input input-bordered w-full pl-12 rounded-xl bg-base-100 border-base-300 focus:border-primary transition-all"
                name="email"
                required
              />
            </div>
          </div>

          <div className="form-control">
            <div className="flex justify-between items-center mb-1">
              <label className="label text-sm font-bold opacity-70 p-0">
                Password
              </label>
              <Link
                href="#"
                className="text-xs text-primary font-bold hover:underline"
              >
                Forgot Password?
              </Link>
            </div>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-base-content/40">
                <FiLock size={18} />
              </span>
              <input
                type="password"
                placeholder="••••••••"
                className="input input-bordered w-full pl-12 rounded-xl bg-base-100 border-base-300 focus:border-primary transition-all"
                name="password"
                required
              />
            </div>
          </div>

          <button className="btn btn-primary w-full h-14 rounded-xl text-lg font-bold shadow-lg shadow-primary/20 hover:-translate-y-1 transition-all">
            Sign In
          </button>
        </form>

        <div className="divider my-8 opacity-50 uppercase text-[10px] font-bold tracking-widest">
          Or continue with
        </div>

        <SocialButton />

        <p className="mt-10 text-center text-sm opacity-70">
          Don&apos;t have an account?{" "}
          <Link
            href={`/register?callbackUrl=${callBackUrl}`}
            className="text-primary font-bold hover:underline ml-1"
          >
            Create Account
          </Link>
        </p>
      </div>

      {/* Right Column: Banner */}
      <div className="hidden md:block w-1/2 relative bg-base-300">
        <img
          src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=1089&auto=format&fit=crop"
          alt="Artisan Cakes"
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-primary/20 backdrop-blur-[2px] flex flex-col items-center justify-center p-12 text-center text-white">
          <div className="bg-black/40 backdrop-blur-md p-8 rounded-3xl border border-white/20">
            <h2 className="text-3xl font-serif font-bold mb-4 italic">
              Artisan Treats Await
            </h2>
            <p className="text-white/80 max-w-xs mx-auto">
              Savor the moments with Dhaka&apos;s finest handcrafted cakes and
              confections.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
