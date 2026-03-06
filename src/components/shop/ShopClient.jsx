"use client";

import React, { useState, useMemo, useEffect } from "react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/about/SectionHeading";
import CakeCard from "@/components/shop/CakeCard";
import FilterBar from "@/components/shop/FilterBar";
import { HiArrowLeft, HiArrowRight } from "react-icons/hi";
import ShopCTA from "@/components/shop/ShopCTA";

const ITEMS_PER_PAGE = 12;

export default function ShopClient({ initialCakes = [] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy] = useState("default");
  const [currentPage, setCurrentPage] = useState(1);

  // Extract unique categories from data
  const categories = useMemo(() => {
    const cats = initialCakes.map((item) => item.category);
    return Array.from(new Set(cats)).sort();
  }, [initialCakes]);

  // Filtering and Sorting Logic
  const filteredCakes = useMemo(() => {
    let results = [...initialCakes];

    // Filter by Search Query
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      results = results.filter(
        (cake) =>
          cake.name.toLowerCase().includes(query) ||
          cake.description?.toLowerCase().includes(query),
      );
    }

    // Filter by Category
    if (activeCategory !== "All") {
      results = results.filter((cake) => cake.category === activeCategory);
    }

    // Sorting
    switch (sortBy) {
      case "price-low":
        results.sort((a, b) => a.basePrice - b.basePrice);
        break;
      case "price-high":
        results.sort((a, b) => b.basePrice - a.basePrice);
        break;
      case "name":
        results.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        // Default: Sort by Featured first, then Newest (simulated by createdAt)
        results.sort((a, b) => {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
        break;
    }

    return results;
  }, [searchQuery, activeCategory, sortBy, initialCakes]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredCakes.length / ITEMS_PER_PAGE);
  const currentItems = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredCakes.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredCakes, currentPage]);

  // Reset page when filters change
  useEffect(() => {
    setTimeout(() => setCurrentPage(1), 0);
  }, [searchQuery, activeCategory, sortBy]);

  const handleResetFilters = () => {
    setSearchQuery("");
    setActiveCategory("All");
    setSortBy("default");
  };

  return (
    <div className="min-h-screen bg-base-100">
      {/* Main Shop Section */}
      <section className="py-12 sm:py-16 lg:py-20">
        <Container>
          <div className="flex flex-col gap-10 sm:gap-14">
            {/* Header Area */}
            <div className="max-w-3xl mx-auto text-center">
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
            </div>

            {/* Filter & Cake Area */}
            <div className="flex flex-col gap-8 sm:gap-12">
              <FilterBar
                categories={categories}
                activeCategory={activeCategory}
                setActiveCategory={setActiveCategory}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                sortBy={sortBy}
                setSortBy={setSortBy}
              />

              {/* Cake Grid / Empty State */}
              <div className="relative min-h-[400px]">
                {filteredCakes.length > 0 ? (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10 sm:gap-x-8 sm:gap-y-12">
                      {currentItems.map((cake) => (
                        <CakeCard key={cake._id} cake={cake} />
                      ))}
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                      <div className="mt-16 sm:mt-24 flex items-center justify-center gap-4">
                        <button
                          onClick={() =>
                            setCurrentPage((p) => Math.max(1, p - 1))
                          }
                          disabled={currentPage === 1}
                          className="p-2 border border-base-300 rounded-full text-base-content hover:bg-primary hover:text-white transition-all disabled:opacity-20 disabled:hover:bg-transparent"
                        >
                          <HiArrowLeft className="w-5 h-5" />
                        </button>

                        <div className="flex items-center gap-2">
                          {Array.from({ length: totalPages }).map((_, i) => (
                            <button
                              key={i}
                              onClick={() => setCurrentPage(i + 1)}
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
                          onClick={() =>
                            setCurrentPage((p) => Math.min(totalPages, p + 1))
                          }
                          disabled={currentPage === totalPages}
                          className="p-2 border border-base-300 rounded-full text-base-content hover:bg-primary hover:text-white transition-all disabled:opacity-20 disabled:hover:bg-transparent"
                        >
                          <HiArrowRight className="w-5 h-5" />
                        </button>
                      </div>
                    )}
                  </>
                ) : (
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
