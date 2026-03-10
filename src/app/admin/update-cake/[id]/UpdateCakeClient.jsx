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

export default function UpdateProductClient({ cake }) {
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
      stock: parseInt(formData.get("stock")),
      preparationTimeHours: parseInt(formData.get("prepTime")),
      featured: formData.get("featured") === "on",
    };

    const response = await updateCake(cake._id, updatedData);

    setIsSubmitting(false);

    if (response.success) {
      Swal.fire({
        icon: "success",
        title: "Product Updated!",
        text: "The cake details have been successfully updated.",
        timer: 2000,
        showConfirmButton: false,
      });
      router.push("/admin/manage-products");
      router.refresh();
    } else {
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: response.error || "There was an error updating the product.",
      });
    }
  };

  return (
    <Container>
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <SectionHeading
            eyebrow="Inventory Management"
            title="Update Product"
            align="left"
          />
          <Link 
            href="/admin/manage-products" 
            className="btn btn-ghost flex items-center gap-2 opacity-60 hover:opacity-100 transition-opacity"
          >
            <FiArrowLeft /> Back to List
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-base-200 p-8 rounded-3xl shadow-xl border border-base-300">
          {/* Product Name */}
          <div className="form-control md:col-span-2">
            <label className="label text-sm font-bold uppercase tracking-widest opacity-70">
              Product Name
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
            <label className="label text-sm font-bold uppercase tracking-widest opacity-70">
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
            <label className="label text-sm font-bold uppercase tracking-widest opacity-70">
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

          {/* Stock */}
          <div className="form-control">
            <label className="label text-sm font-bold uppercase tracking-widest opacity-70">
              Stock Quantity
            </label>
            <input
              type="number"
              name="stock"
              defaultValue={cake.stock}
              placeholder="10"
              className="input input-bordered w-full rounded-xl bg-base-100"
              required
            />
          </div>

          {/* Prep Time */}
          <div className="form-control">
            <label className="label text-sm font-bold uppercase tracking-widest opacity-70">
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
            <label className="label text-sm font-bold uppercase tracking-widest opacity-70">
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
            <label className="label text-sm font-bold uppercase tracking-widest opacity-70">
              Full Description
            </label>
            <textarea
              name="description"
              defaultValue={cake.description}
              placeholder="Detailed product information..."
              className="textarea textarea-bordered w-full h-32 rounded-xl bg-base-100"
              required
            ></textarea>
          </div>

          {/* Image URLs */}
          <div className="form-control md:col-span-2">
            <label className="label text-sm font-bold uppercase tracking-widest opacity-70">
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
            <label className="label cursor-pointer justify-start gap-4">
              <input 
                type="checkbox" 
                name="featured" 
                defaultChecked={cake.featured}
                className="checkbox checkbox-primary rounded-md" 
              />
              <span className="label-text font-bold uppercase tracking-widest opacity-70">Feature this product on homepage</span>
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
                  Updating Product...
                </>
              ) : (
                <>
                  <FiSave className="mr-2" /> Save Changes
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </Container>
  );
}
