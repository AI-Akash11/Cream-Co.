"use client";

import { useState } from "react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/about/SectionHeading";

const SUBJECTS = [
  { value: "", label: "Select a subject…" },
  { value: "order-inquiry", label: "Order Inquiry" },
  { value: "custom-cake", label: "Custom Cake Design" },
  { value: "feedback", label: "Feedback" },
  { value: "other", label: "Other" },
];

const initialState = {
  fullName: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};

export default function ContactForm() {
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  function validate(data) {
    const newErrors = {};
    if (!data.fullName.trim()) newErrors.fullName = "Full name is required.";
    if (!data.email.trim()) {
      newErrors.email = "Email address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!data.subject) newErrors.subject = "Please select a subject.";
    if (!data.message.trim()) {
      newErrors.message = "Message cannot be empty.";
    } else if (data.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters.";
    }
    return newErrors;
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    const validationErrors = validate(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    // TODO: Integrate API endpoint here
    console.log("Form submitted:", formData);
    setSubmitted(true);
    setFormData(initialState);
    setErrors({});
  }

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-base-100">
      <Container>
        <div className="flex flex-col gap-8 sm:gap-10">
          <SectionHeading
            eyebrow="Drop us a message"
            title="Send Us a Note"
            align="center"
          />

          <div className="max-w-2xl mx-auto w-full">
            {submitted ? (
              <div
                role="status"
                className="flex flex-col items-center gap-5 py-16 text-center"
              >
                <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-success/15 text-success">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-8 w-8"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M9.5 16.5 5.75 12.75 7.2 11.3 9.5 13.6 16.8 6.3 18.25 7.75Z" />
                  </svg>
                </span>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-primary">
                  Message Sent!
                </h3>
                <p className="text-sm sm:text-base text-base-content/75 max-w-sm">
                  Thank you for reaching out. Our team will get back to you
                  within 24 hours. We can&apos;t wait to bake something special
                  for you.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="btn btn-outline btn-sm border-primary text-primary hover:bg-primary hover:text-primary-content"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                aria-label="Contact form"
                noValidate
                className="card bg-base-200 shadow-lg border border-base-200/80 dark:border-base-300/30 rounded-2xl"
              >
                <div className="card-body gap-5 p-6 sm:p-8">
                  {/* Full Name */}
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="fullName"
                      className="text-xs font-semibold uppercase tracking-[0.18em] text-base-content/60"
                    >
                      Full Name <span className="text-error">*</span>
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="e.g. Farhan Islam"
                      autoComplete="name"
                      className={`input input-bordered w-full bg-base-200/50 dark:bg-base-200/30 focus:border-primary focus:outline-none transition-colors ${
                        errors.fullName ? "input-error" : ""
                      }`}
                    />
                    {errors.fullName && (
                      <p role="alert" className="text-xs text-error mt-0.5">
                        {errors.fullName}
                      </p>
                    )}
                  </div>

                  {/* Email & Phone Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-1.5">
                      <label
                        htmlFor="email"
                        className="text-xs font-semibold uppercase tracking-[0.18em] text-base-content/60"
                      >
                        Email Address <span className="text-error">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        autoComplete="email"
                        className={`input input-bordered w-full bg-base-200/50 dark:bg-base-200/30 focus:border-primary focus:outline-none transition-colors ${
                          errors.email ? "input-error" : ""
                        }`}
                      />
                      {errors.email && (
                        <p role="alert" className="text-xs text-error mt-0.5">
                          {errors.email}
                        </p>
                      )}
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label
                        htmlFor="phone"
                        className="text-xs font-semibold uppercase tracking-[0.18em] text-base-content/60"
                      >
                        Phone{" "}
                        <span className="text-base-content/40 normal-case font-normal tracking-normal">
                          (optional)
                        </span>
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+880 1700-000000"
                        autoComplete="tel"
                        className="input input-bordered w-full bg-base-200/50 dark:bg-base-200/30 focus:border-primary focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  {/* Subject */}
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="subject"
                      className="text-xs font-semibold uppercase tracking-[0.18em] text-base-content/60"
                    >
                      Subject <span className="text-error">*</span>
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className={`select select-bordered w-full bg-base-200/50 dark:bg-base-200/30 focus:border-primary focus:outline-none transition-colors ${
                        errors.subject ? "select-error" : ""
                      }`}
                    >
                      {SUBJECTS.map((opt) => (
                        <option
                          key={opt.value}
                          value={opt.value}
                          disabled={opt.value === ""}
                        >
                          {opt.label}
                        </option>
                      ))}
                    </select>
                    {errors.subject && (
                      <p role="alert" className="text-xs text-error mt-0.5">
                        {errors.subject}
                      </p>
                    )}
                  </div>

                  {/* Message */}
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="message"
                      className="text-xs font-semibold uppercase tracking-[0.18em] text-base-content/60"
                    >
                      Message <span className="text-error">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      placeholder="Tell us about your order, celebration, or any questions you have…"
                      className={`textarea textarea-bordered w-full bg-base-200/50 dark:bg-base-200/30 focus:border-primary focus:outline-none transition-colors resize-none text-sm leading-relaxed ${
                        errors.message ? "textarea-error" : ""
                      }`}
                    />
                    {errors.message && (
                      <p role="alert" className="text-xs text-error mt-0.5">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  {/* Submit */}
                  <div className="pt-1">
                    <button
                      type="submit"
                      className="btn btn-primary w-full sm:w-auto min-w-40 font-semibold"
                    >
                      Send Message
                      <svg
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                        className="h-4 w-4 ml-1"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M22 2 11 13" />
                        <path d="m22 2-7 20-4-9-9-4 20-7Z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
