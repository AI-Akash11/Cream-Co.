"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { updateCake } from "@/actions/server/cake";
import Swal from "sweetalert2";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/about/SectionHeading";
import { FiSave, FiImage, FiTag, FiDollarSign, FiClock, FiArrowLeft } from "react-icons/fi";
import Link from "next/link";

const CATEGORIES = [
  "Birthday Cakes",
  "Signature Cakes",
  "Premium Cakes",
  "Custom Cakes",
  "Bento Cakes",
  "Wedding Cakes",
  "Cupcakes",
  "Pastries",
];

export default function UpdateCakeClient({ cake }) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.target);
    const images = [
      formData.get("image1"),
      formData.get("image2"),
      formData.get("image3"),
    ].filter((url) => url && url.trim() !== "");

    const updatedData = {
      name: formData.get("name"),
      category: formData.get("category"),
      basePrice: parseFloat(formData.get("price")),
      shortDescription: formData.get("shortDescription"),
      description: formData.get("description"),
      images: images,
      preparationTimeHours: parseInt(formData.get("prepTime")),
      featured: formData.get("featured") === "on",
    };

    const response = await updateCake(cake._id, updatedData);

    setIsSubmitting(false);

    if (response.success) {
      Swal.fire({
        icon: "success",
        title: "Cake Updated!",
        text: "The cake details have been successfully updated.",
        timer: 2000,
        showConfirmButton: false,
      });
      router.push("/admin/manage-cakes");
      router.refresh();
    } else {
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: response.error || "There was an error updating the cake.",
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-8">
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-serif font-black text-base-content">Update Cake</h1>
          <p className="text-base-content/60 mt-1">Refine the details of your handcrafted creation</p>
        </div>
        <Link 
          href="/admin/manage-cakes" 
          className="btn btn-ghost rounded-xl flex items-center gap-2 opacity-60 hover:opacity-100 hover:bg-base-200 transition-all font-bold"
        >
          <FiArrowLeft /> Back to Inventory
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-base-100 p-8 rounded-3xl shadow-xl border border-base-300">
        {/* Cake Name */}
        <div className="form-control md:col-span-2">
          <label className="label text-xs font-bold uppercase tracking-widest opacity-60">
            Cake Name
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-primary">
              <FiTag size={18} />
            </span>
            <input
              type="text"
              name="name"
              defaultValue={cake.name}
              placeholder="Ex: Artisan Dark Chocolate Truffle"
              className="input input-bordered w-full pl-12 rounded-xl bg-base-100"
              required
            />
          </div>
        </div>

        {/* Category */}
        <div className="form-control">
          <label className="label text-xs font-bold uppercase tracking-widest opacity-60">
            Category
          </label>
          <select 
            name="category" 
            defaultValue={cake.category} 
            className="select select-bordered w-full rounded-xl bg-base-100" 
            required
          >
            <option disabled>Choose a category</option>
            {CATEGORIES.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Price */}
        <div className="form-control">
          <label className="label text-xs font-bold uppercase tracking-widest opacity-60">
            Base Price (৳)
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-primary">
              <FiDollarSign size={18} />
            </span>
            <input
              type="number"
              name="price"
              defaultValue={cake.basePrice}
              placeholder="1500"
              className="input input-bordered w-full pl-12 rounded-xl bg-base-100"
              required
            />
          </div>
        </div>

        {/* Prep Time */}
        <div className="form-control">
          <label className="label text-xs font-bold uppercase tracking-widest opacity-60">
            Prep Time (Hours)
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-primary">
              <FiClock size={18} />
            </span>
            <input
              type="number"
              name="prepTime"
              defaultValue={cake.preparationTimeHours}
              placeholder="24"
              className="input input-bordered w-full pl-12 rounded-xl bg-base-100"
              required
            />
          </div>
        </div>

        {/* Short Description */}
        <div className="form-control md:col-span-2">
          <label className="label text-xs font-bold uppercase tracking-widest opacity-60">
            Short Description (1-2 lines)
          </label>
          <input
            type="text"
            name="shortDescription"
            defaultValue={cake.shortDescription}
            placeholder="Brief overview for the card..."
            className="input input-bordered w-full rounded-xl bg-base-100"
            required
          />
        </div>

        {/* Full Description */}
        <div className="form-control md:col-span-2">
          <label className="label text-xs font-bold uppercase tracking-widest opacity-60">
            Full Description
          </label>
          <textarea
            name="description"
            defaultValue={cake.description}
            placeholder="Detailed information about the cake..."
            className="textarea textarea-bordered w-full h-32 rounded-xl bg-base-100"
            required
          ></textarea>
        </div>

        {/* Image URLs */}
        <div className="form-control md:col-span-2">
          <label className="label text-xs font-bold uppercase tracking-widest opacity-60">
            Image URLs (Add up to 3)
          </label>
          <div className="space-y-4">
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-primary">
                <FiImage size={18} />
              </span>
              <input
                type="url"
                name="image1"
                defaultValue={cake.images?.[0] || ""}
                placeholder="Primary Image URL"
                className="input input-bordered w-full pl-12 rounded-xl bg-base-100"
                required
              />
            </div>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-primary">
                <FiImage size={18} />
              </span>
              <input
                type="url"
                name="image2"
                defaultValue={cake.images?.[1] || ""}
                placeholder="Secondary Image URL (Optional)"
                className="input input-bordered w-full pl-12 rounded-xl bg-base-100"
              />
            </div>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-primary">
                <FiImage size={18} />
              </span>
              <input
                type="url"
                name="image3"
                defaultValue={cake.images?.[2] || ""}
                placeholder="Third Image URL (Optional)"
                className="input input-bordered w-full pl-12 rounded-xl bg-base-100"
              />
            </div>
          </div>
        </div>

        {/* Featured Toggle */}
        <div className="form-control md:col-span-2">
          <label className="label cursor-pointer justify-start gap-4 p-4 rounded-2xl bg-base-200/30 border border-base-300/50">
            <input 
              type="checkbox" 
              name="featured" 
              defaultChecked={cake.featured}
              className="checkbox checkbox-primary rounded-md" 
            />
            <span className="label-text font-bold uppercase tracking-wider sm:tracking-widest opacity-70 text-[10px] sm:text-xs">Feature this cake on homepage</span>
          </label>
        </div>

        {/* Submit Button */}
        <div className="md:col-span-2 mt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn btn-primary w-full h-16 rounded-xl text-lg font-bold uppercase tracking-widest shadow-lg shadow-primary/20 hover:-translate-y-1 transition-all"
          >
            {isSubmitting ? (
              <>
                <span className="loading loading-spinner"></span>
                Saving Changes...
              </>
            ) : (
              <>
                <FiSave className="mr-2" /> Update Cake Details
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
