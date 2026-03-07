"use client";

import React, { useState, useEffect } from "react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/about/SectionHeading";
import { submitCustomOrder } from "@/app/actions/custom-actions";
import {
  HiCheckCircle,
  HiChevronRight,
  HiChevronLeft,
  HiOutlineCake,
  HiOutlineSparkles,
  HiCalendar,
  HiChatAlt,
  HiOutlineUser,
  HiOutlinePhone,
  HiOutlineLocationMarker,
} from "react-icons/hi";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Swal from "sweetalert2";

// --- Form Constants ---

const CAKE_FLAVORS = [
  { id: "chocolate", name: "Classic Chocolate", price: 1200 },
  { id: "vanilla", name: "Madagascar Vanilla", price: 1000 },
  { id: "red-velvet", name: "Red Velvet", price: 1400 },
  { id: "butterscotch", name: "Butterscotch", price: 1300 },
  { id: "custom", name: "Custom Flavor", price: 1500 },
];

const SIZES = [
  { id: "0.5kg", label: "0.5 KG", multiplier: 1 },
  { id: "1kg", label: "1 KG", multiplier: 1.8 },
  { id: "2kg", label: "2 KG", multiplier: 3.5 },
  { id: "3kg", label: "3 KG", multiplier: 5 },
];

const CREAM_TYPES = [
  { id: "whipped", name: "Whipped Cream" },
  { id: "buttercream", name: "Italian Buttercream" },
  { id: "ganache", name: "Rich Ganache" },
  { id: "cream-cheese", name: "Cream Cheese" },
];

export default function CustomCakePage() {
  const { addToCart } = useCart();
  const router = useRouter();
  const { data: session } = useSession();

  const [step, setStep] = useState(1); // 1: Builder, 2: Delivery Info
  const [formData, setFormData] = useState({
    flavorId: "chocolate",
    sizeId: "1kg",
    creamId: "whipped",
    message: "",
    deliveryDate: "",
    notes: "",
    // Delivery Info
    phone: "",
    address: "",
    city: "",
    zip: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // --- Calculations ---

  const selectedFlavor = CAKE_FLAVORS.find((f) => f.id === formData.flavorId);
  const selectedSize = SIZES.find((s) => s.id === formData.sizeId);
  const basePrice = selectedFlavor?.price || 0;
  const estimatedPrice = Math.round(
    basePrice * (selectedSize?.multiplier || 1),
  );

  // --- Handlers ---

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleOptionSelect = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNextStep = () => {
    if (!formData.deliveryDate) {
      Swal.fire({
        icon: "warning",
        title: "Missing Date",
        text: "Please select a delivery date first.",
      });
      return;
    }
    setStep(2);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePrevStep = () => {
    setStep(1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();

    if (
      !formData.phone ||
      !formData.address ||
      !formData.city ||
      !formData.zip
    ) {
      Swal.fire({
        icon: "error",
        title: "Missing Info",
        text: "Please fill in all delivery details.",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // 1. Create the custom item object
      const selectedFlavor = CAKE_FLAVORS.find((f) => f.id === formData.flavorId);
      const selectedSize = SIZES.find((s) => s.id === formData.sizeId);
      const selectedCream = CREAM_TYPES.find((c) => c.id === formData.creamId);

      const customItem = {
        id: `custom-${Date.now()}`,
        name: `Custom ${selectedFlavor.name}`,
        image: "/images/custom-cake-placeholder.jpg", // A generic placeholder
        basePrice: estimatedPrice,
        quantity: 1,
        isCustom: true,
        details: {
          flavor: selectedFlavor.name,
          size: selectedSize.label,
          cream: selectedCream.name,
          message: formData.message,
          deliveryDate: formData.deliveryDate,
          notes: formData.notes,
        },
      };

      // 2. Add to global cart
      addToCart(customItem);

      // 3. Save delivery info to localStorage for the payment page to pick up
      const deliveryInfo = {
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        zip: formData.zip,
      };
      localStorage.setItem(
        "creamAndCo_deliveryInfo",
        JSON.stringify(deliveryInfo)
      );

      // 4. Also optionally notify the server about the custom details
      await submitCustomOrder(formData);

      // 5. Redirect to payment
      router.push("/payment");
    } catch (error) {
      console.error("Submission failed:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to process your order. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <div className="min-h-screen bg-base-100">
      {/* Hero Section */}
      <section className="py-16 sm:py-24 bg-primary/5 dark:bg-primary/10 border-b border-base-200">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <SectionHeading
              eyebrow={step === 1 ? "Design Your Own" : "Delivery Details"}
              title={step === 1 ? "Build Your Perfect Cake" : "Where should we send it?"}
              align="center"
            />
            <p className="mt-6 text-sm sm:text-base text-base-content/70 leading-relaxed font-light">
              {step === 1 
                ? "Craft a celebration as unique as your story. Choose from our premium flavors, sizes, and finishes to create a handcrafted masterpiece tailored just for you."
                : "Provide your contact and delivery information so we can ensure your handcrafted creation arrives perfectly on time."}
            </p>
          </div>
        </Container>
      </section>

      {/* Main Builder Section */}
      <section className="py-12 sm:py-20">
        <Container>
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
            {step === 1 ? (
              <div className="flex-1 space-y-12 animate-in slide-in-from-left duration-500">
                {/* Step A: Cake Type */}
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
                      1
                    </div>
                    <h3 className="text-xl font-serif font-bold">
                      Choose Your Flavor
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {CAKE_FLAVORS.map((flavor) => (
                      <div
                        key={flavor.id}
                        onClick={() => handleOptionSelect("flavorId", flavor.id)}
                        className={`cursor-pointer p-5 rounded-2xl border-2 transition-all duration-300 flex items-center gap-4 ${
                          formData.flavorId === flavor.id
                            ? "border-primary bg-primary/5 shadow-md"
                            : "border-base-300 bg-base-200 hover:border-base-content/20"
                        }`}
                      >
                        <div
                          className={`p-3 rounded-xl ${formData.flavorId === flavor.id ? "bg-primary text-white" : "bg-base-300 text-base-content/40"}`}
                        >
                          <HiOutlineCake className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                          <p className="font-bold text-sm sm:text-base">
                            {flavor.name}
                          </p>
                          <p className="text-xs text-base-content/50 uppercase tracking-widest mt-1">
                            Starting ৳{flavor.price}
                          </p>
                        </div>
                        {formData.flavorId === flavor.id && (
                          <HiCheckCircle className="w-6 h-6 text-primary" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Step B: Size Selection */}
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
                      2
                    </div>
                    <h3 className="text-xl font-serif font-bold">Select Size</h3>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {SIZES.map((size) => (
                      <button
                        key={size.id}
                        type="button"
                        onClick={() => handleOptionSelect("sizeId", size.id)}
                        className={`px-8 py-4 rounded-xl font-bold transition-all duration-300 border-2 ${
                          formData.sizeId === size.id
                            ? "bg-primary border-primary text-white shadow-lg shadow-primary/20"
                            : "bg-base-200 border-base-300 text-base-content hover:border-base-content/20"
                        }`}
                      >
                        {size.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Step C: Filling / Cream Type */}
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
                      3
                    </div>
                    <h3 className="text-xl font-serif font-bold">
                      Choose Filling Type
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {CREAM_TYPES.map((cream) => (
                      <div
                        key={cream.id}
                        onClick={() => handleOptionSelect("creamId", cream.id)}
                        className={`cursor-pointer p-5 rounded-2xl border-2 transition-all duration-300 flex items-center gap-4 ${
                          formData.creamId === cream.id
                            ? "border-primary bg-primary/5 shadow-md"
                            : "border-base-300 bg-base-200 hover:border-base-content/20"
                        }`}
                      >
                        <div
                          className={`p-3 rounded-xl ${formData.creamId === cream.id ? "bg-primary text-white" : "bg-base-300 text-base-content/40"}`}
                        >
                          <HiOutlineSparkles className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                          <p className="font-bold text-sm sm:text-base">
                            {cream.name}
                          </p>
                        </div>
                        {formData.creamId === cream.id && (
                          <HiCheckCircle className="w-6 h-6 text-primary" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Step D & E: Message & Date */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-primary text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
                        4
                      </div>
                      <label className="text-lg font-serif font-bold">
                        Custom Message
                      </label>
                    </div>
                    <div className="relative">
                      <input
                        type="text"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        maxLength={40}
                        placeholder="e.g. Happy Birthday Akash"
                        className="input input-bordered w-full rounded-xl bg-base-200 focus:outline-none focus:border-primary px-5 h-14"
                      />
                      <div className="absolute right-4 bottom-[-24px] text-[10px] uppercase font-bold text-base-content/30 tracking-widest">
                        {formData.message.length}/40 Characters
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-primary text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
                        5
                      </div>
                      <label className="text-lg font-serif font-bold">
                        Delivery Date
                      </label>
                    </div>
                    <div className="relative">
                      <HiCalendar className="absolute left-5 top-1/2 -translate-y-1/2 text-primary w-5 h-5 pointer-events-none" />
                      <input
                        type="date"
                        name="deliveryDate"
                        value={formData.deliveryDate}
                        min={new Date().toISOString().split("T")[0]}
                        onChange={handleChange}
                        required
                        className="input input-bordered w-full rounded-xl bg-base-200 focus:outline-none focus:border-primary pl-14 h-14 transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* Step F: Notes */}
                <div className="space-y-4 pt-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
                      6
                    </div>
                    <label className="text-lg font-serif font-bold">
                      Additional Special Requests
                    </label>
                  </div>
                  <div className="relative">
                    <HiChatAlt className="absolute left-5 top-5 text-primary w-5 h-5 pointer-events-none" />
                    <textarea
                      name="notes"
                      value={formData.notes}
                      onChange={handleChange}
                      placeholder="Tell us about decorative elements, color themes, or any allergies..."
                      rows={4}
                      className="textarea textarea-bordered w-full rounded-2xl bg-base-200 focus:outline-none focus:border-primary pl-14 pt-5 resize-none transition-all leading-relaxed"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex-1 space-y-12 animate-in slide-in-from-right duration-500">
                {/* Contact Information */}
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
                      <HiOutlineUser />
                    </div>
                    <h3 className="text-xl font-serif font-bold">
                      Contact Information
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="form-control">
                      <label className="label text-xs font-bold opacity-70 uppercase tracking-widest">
                        Full Name
                      </label>
                      <input
                        type="text"
                        className="input input-bordered w-full rounded-xl bg-base-200/50 cursor-not-allowed text-base-content/70 h-14"
                        value={session?.user?.name || ""}
                        readOnly
                      />
                    </div>
                    <div className="form-control">
                      <label className="label text-xs font-bold opacity-70 uppercase tracking-widest">
                        Phone Number
                      </label>
                      <div className="relative">
                        <HiOutlinePhone className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" />
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="input input-bordered w-full rounded-xl focus:border-primary pl-12 h-14"
                          placeholder="+880 1..."
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Delivery Address */}
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
                      <HiOutlineLocationMarker />
                    </div>
                    <h3 className="text-xl font-serif font-bold">
                      Delivery Address
                    </h3>
                  </div>
                  <div className="space-y-4">
                    <div className="form-control">
                      <label className="label text-xs font-bold opacity-70 uppercase tracking-widest">
                        Street Address
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className="input input-bordered w-full rounded-xl focus:border-primary h-14"
                        placeholder="House #, Road #, Area"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="form-control">
                        <label className="label text-xs font-bold opacity-70 uppercase tracking-widest">
                          City
                        </label>
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          className="input input-bordered w-full rounded-xl focus:border-primary h-14"
                          placeholder="Dhaka"
                          required
                        />
                      </div>
                      <div className="form-control">
                        <label className="label text-xs font-bold opacity-70 uppercase tracking-widest">
                          Zip Code
                        </label>
                        <input
                          type="text"
                          name="zip"
                          value={formData.zip}
                          onChange={handleChange}
                          className="input input-bordered w-full rounded-xl focus:border-primary h-14"
                          placeholder="1212"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Navigation Buttons */}
                <div className="pt-4 flex gap-4">
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    className="btn btn-ghost rounded-full px-8 h-14 gap-2"
                  >
                    <HiChevronLeft className="w-5 h-5" />
                    Back to Design
                  </button>
                </div>
              </div>
            )}

            {/* Right: Order Summary Sidebar */}
            <div className="w-full lg:w-[400px]">
              <div className="sticky top-28 space-y-8">
                <div className="bg-base-200 border border-base-300 rounded-3xl overflow-hidden shadow-xl">
                  {/* Header */}
                  <div className="bg-primary p-6 text-white text-center">
                    <h3 className="text-xl font-serif font-bold italic">
                      Order Summary
                    </h3>
                    <p className="text-xs uppercase tracking-widest opacity-80 mt-1 font-bold">
                      Handcrafted Premium Cake
                    </p>
                  </div>

                  {/* Body */}
                  <div className="p-8 space-y-6">
                    <div className="flex justify-between items-start border-b border-base-300 pb-4">
                      <div className="space-y-1">
                        <p className="text-xs font-bold uppercase text-base-content/40 tracking-widest">
                          Base Flavor
                        </p>
                        <p className="font-serif font-bold text-lg">
                          {selectedFlavor?.name}
                        </p>
                      </div>
                      <p className="font-bold">৳{selectedFlavor?.price}</p>
                    </div>

                    <div className="flex justify-between items-start border-b border-base-300 pb-4">
                      <div className="space-y-1">
                        <p className="text-xs font-bold uppercase text-base-content/40 tracking-widest">
                          Selected Size
                        </p>
                        <p className="font-serif font-bold text-lg">
                          {selectedSize?.label}
                        </p>
                      </div>
                      <p className="text-xs font-bold text-base-content/40 italic">
                        x{selectedSize?.multiplier}
                      </p>
                    </div>

                    <div className="flex justify-between items-start border-b border-base-300 pb-4">
                      <div className="space-y-1">
                        <p className="text-xs font-bold uppercase text-base-content/40 tracking-widest">
                          Cream Finishing
                        </p>
                        <p className="font-semibold">
                          {
                            CREAM_TYPES.find((c) => c.id === formData.creamId)
                              ?.name
                          }
                        </p>
                      </div>
                    </div>

                    {formData.message && (
                      <div className="space-y-1 bg-base-300/50 p-4 rounded-xl border border-dashed border-base-content/10">
                        <p className="text-[10px] font-bold uppercase text-base-content/40 tracking-widest">
                          Decoration Message
                        </p>
                        <p className="italic font-serif text-sm">
                          &quot;{formData.message}&quot;
                        </p>
                      </div>
                    )}

                    {/* Total */}
                    <div className="pt-4 flex justify-between items-center">
                      <p className="text-lg font-serif font-bold">
                        Estimated Total
                      </p>
                      <p className="text-2xl font-serif font-bold text-primary italic">
                        ৳{estimatedPrice.toLocaleString()}
                      </p>
                    </div>

                    {step === 1 ? (
                      <button
                        onClick={handleNextStep}
                        disabled={!formData.deliveryDate}
                        className="btn btn-primary w-full h-16 rounded-full font-bold shadow-lg shadow-primary/20 hover:shadow-xl transition-all duration-300 text-lg flex items-center justify-center gap-3"
                      >
                        <span>Continue to Delivery</span>
                        <HiChevronRight className="w-6 h-6" />
                      </button>
                    ) : (
                      <button
                        onClick={handleSubmit}
                        disabled={isSubmitting || !formData.phone || !formData.address}
                        className="btn btn-primary w-full h-16 rounded-full font-bold shadow-lg shadow-primary/20 hover:shadow-xl transition-all duration-300 text-lg flex items-center justify-center gap-3 disabled:opacity-50"
                      >
                        {isSubmitting ? (
                          <>
                            <span className="loading loading-spinner text-white"></span>
                            <span>Processing...</span>
                          </>
                        ) : (
                          <>
                            <span>Place Custom Order</span>
                            <HiChevronRight className="w-6 h-6" />
                          </>
                        )}
                      </button>
                    )}
                    {!formData.deliveryDate && step === 1 && (
                      <p className="text-[10px] text-center text-error font-bold uppercase tracking-widest">
                        Please select a delivery date
                      </p>
                    )}
                  </div>
                </div>

                {/* Info Card */}
                <div className="p-6 bg-primary/5 border border-primary/20 rounded-2xl flex items-start gap-4">
                  <HiOutlineSparkles className="text-primary w-6 h-6 shrink-0" />
                  <p className="text-xs text-base-content/70 italic leading-relaxed">
                    Custom orders require at least 48 hours notice. Our team
                    will verify flavor availability based on your selected date.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
