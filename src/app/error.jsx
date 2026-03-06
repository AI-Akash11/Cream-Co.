"use client";

import { useEffect } from "react";
import Link from "next/link";
import { FiHome, FiRefreshCcw, FiAlertCircle } from "react-icons/fi";
import Container from "@/components/ui/Container";

export default function Error({ error, reset }) {
  useEffect(() => {
    // Log the error to an error reporting service if needed
    console.error("Global Error Caught:", error);
  }, [error]);

  return (
    <div className="min-h-[calc(100vh-421px)] flex items-center justify-center bg-base-100 py-20">
      <Container>
        <div className="max-w-2xl mx-auto text-center space-y-8">
          {/* Error Graphic / Icon */}
          <div className="flex flex-col items-center justify-center gap-6">
            <div className="text-error/20 select-none animate-pulse">
              <FiAlertCircle
                className="w-[100px] h-[100px] md:w-[140px] md:h-[140px]"
                strokeWidth={1.5}
              />
            </div>
            <h1 className="text-3xl md:text-5xl font-serif font-bold italic text-base-content mt-2">
              Oops! Something went wrong.
            </h1>
          </div>

          <div className="space-y-4 mt-6">
            <h2 className="text-xl md:text-2xl font-bold text-base-content">
              We dropped the cake!
            </h2>
            <p className="text-base-content/70 md:text-lg max-w-md mx-auto">
              Our bakers encountered an unexpected issue while preparing this
              page. Don&apos;t worry, the kitchen is working on fixing it.
            </p>
            {/* Optional: Show error message in development only */}
            {process.env.NODE_ENV === "development" && (
              <div className="mt-4 p-4 bg-error/10 text-error rounded-lg text-left text-sm overflow-auto max-h-40 font-mono">
                <p className="font-bold">Developer Details:</p>
                {error.message}
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
            <button
              onClick={() => reset()}
              className="btn btn-primary rounded-xl px-8 h-14 w-full sm:w-auto font-bold gap-2 shadow-lg shadow-primary/20 hover:-translate-y-1 transition-all"
            >
              <FiRefreshCcw size={18} />
              Try Again
            </button>
            <Link
              href="/"
              className="btn btn-outline border-base-content/20 rounded-xl px-8 h-14 w-full sm:w-auto font-bold gap-2 hover:bg-base-200 hover:border-base-content/40 transition-all text-base-content"
            >
              <FiHome size={18} />
              Return Home
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
