import Link from "next/link";
import { FiHome, FiShoppingBag, FiFrown } from "react-icons/fi";
import Container from "@/components/ui/Container";

export default function NotFound() {
  return (
    <div className="min-h-[calc(100vh-421px)] flex items-center justify-center bg-base-100 py-20">
      <Container>
        <div className="max-w-2xl mx-auto text-center space-y-8">
          {/* 404 Graphic / Text */}
          <div className="flex flex-col items-center justify-center gap-6">
            <div className="text-primary/20 select-none">
              <FiFrown
                className="w-[120px] h-[120px] md:w-[180px] md:h-[180px]"
                strokeWidth={1}
              />
            </div>
            <h1 className="text-4xl md:text-6xl font-serif font-bold italic text-base-content">
              Page Not Found
            </h1>
          </div>

          <div className="space-y-4 mt-8">
            <h2 className="text-2xl md:text-3xl font-bold text-base-content">
              Looks like someone took the last slice!
            </h2>
            <p className="text-base-content/70 md:text-lg max-w-md mx-auto">
              The page you are looking for might have been removed, had its name
              changed, or is temporarily unavailable.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
            <Link
              href="/"
              className="btn btn-primary rounded-xl px-8 h-14 w-full sm:w-auto font-bold gap-2 shadow-lg shadow-primary/20 hover:-translate-y-1 transition-all"
            >
              <FiHome size={18} />
              Back to Home
            </Link>
            <Link
              href="/shop"
              className="btn btn-outline border-base-content/20 rounded-xl px-8 h-14 w-full sm:w-auto font-bold gap-2 hover:bg-base-200 hover:border-base-content/40 transition-all text-base-content"
            >
              <FiShoppingBag size={18} />
              Explore Shop
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
