"use server"

import { collections, dbConnect } from "@/lib/dbConnect"
import bcrypt from "bcryptjs"

export const postUser = async (payload) => {
  const { name, email, password } = payload;

  try {
    // 1. Validation check
    if (!email || !password || !name) {
      return { success: false, message: "Missing required fields" };
    }

    // 2. Check if user exists
    const isExist = await dbConnect(collections.users).findOne({ email });
    if (isExist) {
      return { success: false, message: "User already exists with this email" };
    }

    // 3. Create user
    const newUser = {
      provider: "credentials",
      name,
      email,
      password: await bcrypt.hash(password, 10),
      role: "user",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await dbConnect(collections.users).insertOne(newUser);

    if (result.acknowledged) {
      return {
        success: true,
        message: "User created successfully",
        insertedId: result.insertedId.toString(),
      };
    }

    return { success: false, message: "Database insertion failed" };
  } catch (error) {
    console.error("POST_USER_ERROR:", error);
    return { success: false, message: error.message || "Internal server error" };
  }
};