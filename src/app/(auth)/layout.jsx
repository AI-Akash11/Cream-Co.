"use client";

export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen bg-base-100 flex items-center justify-center p-4 md:p-8 lg:p-12">
      <div className="w-full max-w-6xl bg-base-200 rounded-3xl shadow-2xl overflow-hidden border border-base-300">
        {children}
      </div>
    </div>
  );
}
