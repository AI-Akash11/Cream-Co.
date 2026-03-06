"use server";

/**
 * Dummy server action to add a cake to the cart.
 * @param {string} cakeId - The ID of the cake to add.
 * @returns {Promise<{success: boolean, message: string}>}
 */
export async function addToCart(cakeId) {
  console.log(`[DUMMY ACTION] Adding cake ${cakeId} to cart.`);

  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  return {
    success: true,
    message: "Cake added to cart successfully (Mock).",
  };
}

/**
 * Dummy server action to toggle a cake in the wishlist.
 * @param {string} cakeId - The ID of the cake to toggle.
 * @returns {Promise<{success: boolean, message: string}>}
 */
export async function toggleWishlist(cakeId) {
  console.log(`[DUMMY ACTION] Toggling wishlist for cake ${cakeId}.`);

  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  return {
    success: true,
    message: "Wishlist updated successfully (Mock).",
  };
}
