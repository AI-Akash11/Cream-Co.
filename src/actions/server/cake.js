"use server";

import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";
const { dbConnect, collections } = require("@/lib/dbConnect");

/**
 * Get cakes with server-side pagination, filtering, and sorting
 */
export const getCake = async (params = {}) => {
    const { 
        search = "", 
        category = "All", 
        sortBy = "default", 
        page = 1, 
        limit = 12 
    } = params;

    const query = {};
    
    // Search logic
    if (search) {
        query.$or = [
            { name: { $regex: search, $options: "i" } },
            { description: { $regex: search, $options: "i" } },
            { shortDescription: { $regex: search, $options: "i" } }
        ];
    }

    // Category logic
    if (category && category !== "All") {
        query.category = category;
    }

    // Sorting logic
    let sort = {};
    switch (sortBy) {
        case "price-low":
            sort = { basePrice: 1 };
            break;
        case "price-high":
            sort = { basePrice: -1 };
            break;
        case "name":
            sort = { name: 1 };
            break;
        default:
            sort = { featured: -1, createdAt: -1 };
            break;
    }

    const skip = (page - 1) * limit;

    try {
        const collection = dbConnect(collections.cakes);
        const total = await collection.countDocuments(query);
        const cakesData = await collection
            .find(query)
            .sort(sort)
            .skip(skip)
            .limit(limit)
            .toArray();

        // Stringify Objectids for client components
        const cakes = cakesData.map(cake => ({ ...cake, _id: cake._id.toString() }));

        return {
            success: true,
            cakes,
            total,
            page,
            totalPages: Math.ceil(total / limit)
        };
    } catch (error) {
        console.error("Error fetching cakes:", error);
        return { success: false, error: error.message };
    }
}

export const getSingleCake = async (id) => {
    if (!id || id.length !== 24) {
        return null;
    }
    const query = { _id: new ObjectId(id) };
    const cakeData = await dbConnect(collections.cakes).findOne(query);
    if (!cakeData) return null;
    return { ...cakeData, _id: cakeData._id.toString() };
}

export const addCake = async (cakeData) => {
    try {
        const { stock, ...rest } = cakeData;
        const result = await dbConnect(collections.cakes).insertOne({
            ...rest,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        
        revalidatePath("/shop");
        revalidatePath("/");
        
        return { success: true, id: result.insertedId.toString() };
    } catch (error) {
        console.error("Error adding cake:", error);
        return { success: false, error: error.message };
    }
}

export const updateCake = async (id, updatedData) => {
    try {
        if (!id || id.length !== 24) throw new Error("Invalid ID");
        const { stock, ...rest } = updatedData;
        const query = { _id: new ObjectId(id) };
        const result = await dbConnect(collections.cakes).updateOne(query, {
            $set: {
                ...rest,
                updatedAt: new Date(),
            }
        });

        revalidatePath("/shop");
        revalidatePath("/");
        revalidatePath(`/shop/${id}`);
        
        return { success: true, modifiedCount: result.modifiedCount };
    } catch (error) {
        console.error("Error updating cake:", error);
        return { success: false, error: error.message };
    }
}

export const deleteCake = async (id) => {
    try {
        if (!id || id.length !== 24) throw new Error("Invalid ID");
        const query = { _id: new ObjectId(id) };
        const result = await dbConnect(collections.cakes).deleteOne(query);
        
        revalidatePath("/shop");
        revalidatePath("/");
        
        return { success: true, deletedCount: result.deletedCount };
    } catch (error) {
        console.error("Error deleting cake:", error);
        return { success: false, error: error.message };
    }
}