"use client";

import React, { useState, useEffect, useCallback, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/about/SectionHeading";
import CakeCard from "@/components/cards/CakeCard";
import FilterBar from "@/components/shop/FilterBar";
import { HiArrowLeft, HiArrowRight } from "react-icons/hi";
import ShopCTA from "@/components/shop/ShopCTA";
import { getCake } from "@/actions/server/cake";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations/Animations";

const ITEMS_PER_PAGE = 12;

const ALL_CATEGORIES = [
  "Birthday Cakes",
  "Signature Cakes",
  "Premium Cakes",
  "Custom Cakes",
  "Bento Cakes",
  "Wedding Cakes",
  "Cupcakes",
  "Pastries",
];

function ShopContent({ initialData }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const categoryParam = searchParams.get("category");

  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState(
    (categoryParam && ALL_CATEGORIES.includes(categoryParam))
      ? categoryParam
      : "All"
  );
  const [sortBy, setSortBy] = useState("default");
  const [currentPage, setCurrentPage] = useState(initialData.page || 1);
  const [cakes, setCakes] = useState(initialData.cakes || []);
  const [totalPages, setTotalPages] = useState(initialData.totalPages || 1);
  const [isLoading, setIsLoading] = useState(false);

  const fetchCakes = useCallback(async (page = 1) => {
    setIsLoading(true);
    const result = await getCake({
      page,
      limit: ITEMS_PER_PAGE,
      search: searchQuery,
      category: activeCategory,
      sortBy: sortBy
    });

    if (result.success) {
      setCakes(result.cakes);
      setTotalPages(result.totalPages);
      setCurrentPage(result.page);
    }
    setIsLoading(false);
  }, [searchQuery, activeCategory, sortBy]);

  // No need for separate useEffect to sync category, we can derive it or handle it in fetchCakes

  // Handle Fetching
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchCakes(1);
    }, 500);
    return () => clearTimeout(timer);
  }, [fetchCakes]);

  const handleResetFilters = () => {
    setSearchQuery("");
    setActiveCategory("All");
    setSortBy("default");
    router.push("/shop", { scroll: false });
  };

  return (
    <div className="min-h-screen bg-base-100">
      {/* Main Shop Section */}
      <section className="py-12 sm:py-16 lg:py-20">
        <Container>
          <div className="flex flex-col gap-10 sm:gap-14">
            {/* Header Area */}
            <FadeIn className="max-w-3xl mx-auto text-center" direction="up">
              <SectionHeading
                eyebrow="Our Collection"
                title="Explore Our Cakes & Desserts"
                align="center"
              />
              <p className="mt-5 text-sm sm:text-base text-base-content/70 leading-relaxed font-light">
                Each cake in our collection is a labor of love, handcrafted with
                the finest ingredients and a dash of magic. Whether it&apos;s a
                milestone celebration or an everyday treat, we have something
                sweet waiting for you.
              </p>
            </FadeIn>

            {/* Filter & Cake Area */}
            <div className="flex flex-col gap-8 sm:gap-12">
              <FilterBar
                categories={ALL_CATEGORIES}
                activeCategory={activeCategory}
                setActiveCategory={setActiveCategory}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                sortBy={sortBy}
                setSortBy={setSortBy}
              />

              {/* Cake Grid / Empty State */}
              <div className="relative min-h-[400px]">
                {isLoading && (
                  <div className="absolute inset-0 z-10 bg-base-100/50 flex items-center justify-center backdrop-blur-sm">
                     <span className="loading loading-spinner loading-lg text-primary"></span>
                  </div>
                )}
                
                {cakes.length > 0 ? (
                  <>
                    <StaggerContainer className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-8 sm:gap-x-8 sm:gap-y-12">
                      {cakes.map((cake) => (
                        <StaggerItem key={cake._id} className="h-full">
                          <CakeCard cake={cake} />
                        </StaggerItem>
                      ))}
                    </StaggerContainer>

                    {/* Pagination */}
                    {totalPages > 1 && (
                      <div className="mt-16 sm:mt-24 flex items-center justify-center gap-4">
                        <button
                          onClick={() => fetchCakes(currentPage - 1)}
                          disabled={currentPage === 1 || isLoading}
                          className="p-2 border border-base-300 rounded-full text-base-content hover:bg-primary hover:text-white transition-all disabled:opacity-20 disabled:hover:bg-transparent"
                        >
                          <HiArrowLeft className="w-5 h-5" />
                        </button>

                        <div className="flex items-center gap-2">
                          {Array.from({ length: totalPages }).map((_, i) => (
                            <button
                              key={i}
                              onClick={() => fetchCakes(i + 1)}
                              disabled={isLoading}
                              className={`w-10 h-10 rounded-full text-xs font-bold transition-all border-2 ${
                                currentPage === i + 1
                                  ? "bg-primary text-white border-primary shadow-lg shadow-primary/20"
                                  : "border-transparent text-base-content/60 hover:border-base-300"
                              }`}
                            >
                              {i + 1}
                            </button>
                          ))}
                        </div>

                        <button
                          onClick={() => fetchCakes(currentPage + 1)}
                          disabled={currentPage === totalPages || isLoading}
                          className="p-2 border border-base-300 rounded-full text-base-content hover:bg-primary hover:text-white transition-all disabled:opacity-20 disabled:hover:bg-transparent"
                        >
                          <HiArrowRight className="w-5 h-5" />
                        </button>
                      </div>
                    )}
                  </>
                ) : !isLoading && (
                  <div className="flex flex-col items-center justify-center py-20 text-center gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="p-8 bg-base-200 rounded-full border-2 border-dashed border-base-300 text-base-content/20 scale-110">
                      <svg
                        className="w-16 h-16"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                          d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                        />
                      </svg>
                    </div>
                    <div className="max-w-sm">
                      <h3 className="text-xl font-serif font-bold text-base-content mb-2">
                        No results found
                      </h3>
                      <p className="text-sm text-base-content/60 mb-6 font-light">
                        We couldn&apos;t find any cakes matching your current
                        filters. Try adjusting your search or category
                        selection.
                      </p>
                      <button
                        onClick={handleResetFilters}
                        className="btn btn-primary rounded-full px-8 shadow-lg shadow-primary/20"
                      >
                        Reset All Filters
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Call to Action Section */}
      <ShopCTA />
    </div>
  );
}

// Wrap with Suspense because it uses useSearchParams()
export default function ShopClient({ initialData }) {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
        <p className="ml-4 font-medium text-base-content/60">Loading Shop...</p>
      </div>
    }>
      <ShopContent initialData={initialData} />
    </Suspense>
  );
}
