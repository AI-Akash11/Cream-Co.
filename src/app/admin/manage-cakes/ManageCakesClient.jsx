"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { getCake, deleteCake } from "@/actions/server/cake";
import Swal from "sweetalert2";
import { 
  FiEdit2, 
  FiTrash2, 
  FiEye, 
  FiSearch, 
  FiPlus, 
  FiChevronLeft, 
  FiChevronRight,
  FiFilter,
  FiPackage
} from "react-icons/fi";

export default function ManageCakesClient({ initialData }) {
  const [cakes, setCakes] = useState(initialData.cakes || []);
  const [total, setTotal] = useState(initialData.total || 0);
  const [totalPages, setTotalPages] = useState(initialData.totalPages || 1);
  const [currentPage, setCurrentPage] = useState(initialData.page || 1);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [isLoading, setIsLoading] = useState(false);

  const CATEGORIES = [
    "All",
    "Birthday Cakes",
    "Signature Cakes",
    "Premium Cakes",
    "Custom Cakes",
    "Bento Cakes",
    "Wedding Cakes",
    "Cupcakes",
    "Pastries",
  ];

  const fetchCakes = useCallback(async (page = 1) => {
    setIsLoading(true);
    const result = await getCake({ 
      page, 
      limit: 10, 
      search, 
      category 
    });
    
    if (result.success) {
      setCakes(result.cakes);
      setTotal(result.total);
      setTotalPages(result.totalPages);
      setCurrentPage(result.page);
    }
    setIsLoading(false);
  }, [search, category]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchCakes(1);
    }, 500);
    return () => clearTimeout(timer);
  }, [fetchCakes]);

  const handleDelete = async (id, name) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: `You are about to delete "${name}". This action cannot be undone!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      const result = await deleteCake(id);
      if (result.success) {
        Swal.fire("Deleted!", "The cake has been removed.", "success");
        fetchCakes(currentPage);
      } else {
        Swal.fire("Error!", result.error || "Failed to delete cake.", "error");
      }
    }
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-serif font-black text-base-content">Manage Cakes</h1>
          <p className="text-base-content/60 mt-1">Found {total} cakes in your collection</p>
        </div>
        <Link href="/admin/add-cake" className="btn btn-primary rounded-xl shadow-lg shadow-primary/20 flex items-center gap-2">
          <FiPlus size={20} /> Add New Cake
        </Link>
      </div>

      {/* Filters & Search */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-base-200 p-6 rounded-3xl border border-base-300">
        <div className="relative md:col-span-2">
          <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-primary pointer-events-none">
            <FiSearch size={18} />
          </span>
          <input
            type="text"
            placeholder="Search by name or description..."
            className="input input-bordered w-full pl-12 rounded-xl bg-base-100"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="relative">
          <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-primary pointer-events-none">
            <FiFilter size={18} />
          </span>
          <select
            className="select select-bordered w-full pl-12 rounded-xl bg-base-100"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {CATEGORIES.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Cakes Table */}
      <div className="bg-base-100 rounded-3xl shadow-xl overflow-hidden border border-base-300">
        <div className="overflow-x-auto">
          <table className="table table-lg w-full">
            <thead>
              <tr className="bg-base-200/50 text-[10px] uppercase tracking-widest font-black opacity-60">
                <th>Cake Info</th>
                <th>Category</th>
                <th>Price</th>
                <th>Prep Time</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan="5" className="text-center py-20">
                    <span className="loading loading-spinner loading-lg text-primary"></span>
                  </td>
                </tr>
              ) : cakes.length > 0 ? (
                cakes.map((cake) => (
                  <tr key={cake._id} className="hover:bg-base-200/30 transition-colors">
                    <td>
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-xl overflow-hidden bg-base-200 shrink-0 border border-base-300 relative">
                          {cake.images?.[0] ? (
                            <Image src={cake.images[0]} alt={cake.name} fill className="object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-base-content/20"><FiPackage size={24}/></div>
                          )}
                        </div>
                        <div>
                          <div className="font-bold text-base line-clamp-1">{cake.name}</div>
                          {cake.featured && <span className="badge badge-accent badge-xs font-bold uppercase tracking-tighter rounded-sm">Featured</span>}
                        </div>
                      </div>
                    </td>
                    <td><span className="opacity-80 font-medium text-sm">{cake.category}</span></td>
                    <td><span className="font-bold text-primary">৳{cake.basePrice}</span></td>
                    <td><span className="opacity-60 text-sm font-medium">{cake.preparationTimeHours}h</span></td>
                    <td>
                      <div className="flex items-center justify-center gap-2">
                        <Link 
                          href={`/shop/${cake._id}`} 
                          target="_blank"
                          className="btn btn-square btn-ghost btn-sm hover:text-info hover:bg-info/10"
                        >
                          <FiEye size={16} />
                        </Link>
                        <Link 
                          href={`/admin/update-cake/${cake._id}`} 
                          className="btn btn-square btn-ghost btn-sm hover:text-warning hover:bg-warning/10"
                        >
                          <FiEdit2 size={16} />
                        </Link>
                        <button 
                          onClick={() => handleDelete(cake._id, cake.name)}
                          className="btn btn-square btn-ghost btn-sm hover:text-error hover:bg-error/10"
                        >
                          <FiTrash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-20 opacity-40">
                    No cakes found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="p-6 border-t border-base-200 flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-widest opacity-50">Page {currentPage} of {totalPages}</span>
            <div className="join gap-1">
              <button 
                className="btn btn-sm join-item rounded-lg"
                disabled={currentPage === 1 || isLoading}
                onClick={() => fetchCakes(currentPage - 1)}
              >
                <FiChevronLeft />
              </button>
              {[...Array(totalPages)].map((_, i) => (
                <button 
                  key={i}
                  className={`btn btn-sm join-item rounded-lg w-10 ${currentPage === i + 1 ? 'btn-primary shadow-lg shadow-primary/20' : ''}`}
                  onClick={() => fetchCakes(i + 1)}
                  disabled={isLoading}
                >
                  {i + 1}
                </button>
              ))}
              <button 
                className="btn btn-sm join-item rounded-lg"
                disabled={currentPage === totalPages || isLoading}
                onClick={() => fetchCakes(currentPage + 1)}
              >
                <FiChevronRight />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
