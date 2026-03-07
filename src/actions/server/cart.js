"use server";

import { dbConnect, collections } from "@/lib/dbConnect";

/**
 * Get a user's cart from the database by email
 */
export async function getCartFromDB(email) {
  if (!email) return { success: false, message: "No email provided" };

  try {
    const cartDoc = await dbConnect(collections.cart).findOne({ userId: email });
    return {
      success: true,
      items: cartDoc?.items || [],
    };
  } catch (error) {
    console.error("Error fetching cart from DB:", error);
    return { success: false, message: "Failed to fetch cart", error: error.message };
  }
}

/**
 * Save a user's cart to the database, overwriting any existing cart
 */
export async function saveCartToDB(email, items) {
  if (!email) return { success: false, message: "No email provided" };

  try {
    const collection = dbConnect(collections.cart);
    const now = new Date();

    await collection.updateOne(
      { userId: email },
      {
        $set: {
          items,
          updatedAt: now,
        },
        $setOnInsert: {
          createdAt: now,
        },
      },
      { upsert: true }
    );

    return { success: true, message: "Cart saved successfully" };
  } catch (error) {
    console.error("Error saving cart to DB:", error);
    return { success: false, message: "Failed to save cart", error: error.message };
  }
}

/**
 * Merge local cart items into the database cart
 * Resolves duplicates by summing quantities
 */
export async function syncCartOnLogin(email, localItems) {
  if (!email) return { success: false, message: "No email provided" };

  try {
    const dbResult = await getCartFromDB(email);
    const dbItems = dbResult.success ? dbResult.items : [];

    // If both carts are empty, abort early
    if (localItems.length === 0 && dbItems.length === 0) {
      return { success: true, items: [] };
    }

    // Map by item ID to merge easily
    const itemMap = new Map();

    // Add existing DB items
    for (const item of dbItems) {
      // Use string IDs for reliable keys
      const idKey = item.id.toString(); 
      itemMap.set(idKey, { ...item });
    }

    // Merge in local items
    for (const local of localItems) {
      const idKey = local.id.toString();
      if (itemMap.has(idKey)) {
        // Exists: Add quantities
        const existing = itemMap.get(idKey);
        existing.quantity += local.quantity;
      } else {
        // New item entirely
        itemMap.set(idKey, { ...local });
      }
    }

    const mergedItems = Array.from(itemMap.values());

    // Save back to DB
    await saveCartToDB(email, mergedItems);

    return { success: true, items: mergedItems };
  } catch (error) {
    console.error("Error syncing cart on login:", error);
    return { success: false, message: "Failed to sync cart", error: error.message };
  }
}
