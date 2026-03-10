import { z } from "zod";

export const cakeSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters").max(100),
  slug: z.string().min(3).max(120).optional(),
  shortDescription: z.string().min(10).max(200).optional(),
  description: z.string().min(20, "Description must be at least 20 characters"),
  basePrice: z.number().positive("Price must be a positive number"),
  category: z.string().min(1, "Please select a category"),
  images: z.array(z.string().url()).min(1, "At least one image is required"),
  featured: z.boolean().optional().default(false),
  popular: z.boolean().optional().default(false),
});

export const orderSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  deliveryInfo: z.object({
    address: z.string().min(5, "Address is too short"),
    phone: z.string().min(10, "Invalid phone number"),
    city: z.string().optional(),
    notes: z.string().optional(),
  }),
  cartItems: z.array(z.object({
    id: z.string(),
    name: z.string(),
    quantity: z.number().int().positive(),
    basePrice: z.number().positive(),
    image: z.string().url().optional(),
    details: z.any().optional(),
  })).min(1, "Cart cannot be empty"),
  cartTotal: z.number().positive(),
});
