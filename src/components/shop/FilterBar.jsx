"use client";

import { HiSearch } from "react-icons/hi";

export default function FilterBar({
  categories,
  activeCategory,
  setActiveCategory,
  searchQuery,
  setSearchQuery,
  sortBy,
  setSortBy,
}) {
  return (
    <div className="sticky top-20 z-40 w-full mb-8 sm:mb-12">
      <div className="bg-base-200/80 backdrop-blur-md border border-base-300 rounded-xl p-4 sm:p-5 shadow-sm">
        <div className="flex flex-col lg:flex-row gap-4 lg:items-center justify-between">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-base-content/40">
              <HiSearch className="h-5 w-5" />
            </span>
            <input
              type="text"
              placeholder="Search our collection..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-base-300 rounded-lg bg-base-100 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-inner"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            {/* Category Filter */}
            <div className="flex flex-col gap-1.5 min-w-[140px]">
              <label className="text-[10px] uppercase tracking-widest font-bold text-base-content/50 ml-1">
                Category
              </label>
              <select
                value={activeCategory}
                onChange={(e) => setActiveCategory(e.target.value)}
                className="select select-bordered select-sm w-full bg-base-100 rounded-lg text-xs font-medium focus:ring-2 focus:ring-primary/20 focus:border-primary border-base-300 shadow-sm"
              >
                <option value="All">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Price */}
            <div className="flex flex-col gap-1.5 min-w-[140px]">
              <label className="text-[10px] uppercase tracking-widest font-bold text-base-content/50 ml-1">
                Sort By
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="select select-bordered select-sm w-full bg-base-100 rounded-lg text-xs font-medium focus:ring-2 focus:ring-primary/20 focus:border-primary border-base-300 shadow-sm"
              >
                <option value="default">Newest Arrival</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Name: A to Z</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
