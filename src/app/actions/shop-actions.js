"use server";

/**
 * Dummy server action to add a product to the cart.
 * @param {string} productId - The ID of the product to add.
 * @returns {Promise<{success: boolean, message: string}>}
 */
export async function addToCart(productId) {
  console.log(`[DUMMY ACTION] Adding product ${productId} to cart.`);

  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  return {
    success: true,
    message: "Product added to cart successfully (Mock).",
  };
}

/**
 * Dummy server action to toggle a product in the wishlist.
 * @param {string} productId - The ID of the product to toggle.
 * @returns {Promise<{success: boolean, message: string}>}
 */
export async function toggleWishlist(productId) {
  console.log(`[DUMMY ACTION] Toggling wishlist for product ${productId}.`);

  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  return {
    success: true,
    message: "Wishlist updated successfully (Mock).",
  };
}
