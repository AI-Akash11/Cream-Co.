"use client";

import { createContext, useContext, useState } from "react";

// Create the Cart Context
const CartContext = createContext();

// Cart Provider Component
export function CartProvider({ children }) {
  // Dummy initial cart state with 3 items for demo
  const [cartItems, setCartItems] = useState([
    { id: 1, name: "Chocolate Delight", quantity: 1 },
    { id: 2, name: "Strawberry Dream", quantity: 2 },
  ]);

  // Calculate total cart item count
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  // Add item to cart
  const addToCart = (item) => {
    setCartItems((prev) => {
      const existingItem = prev.find((i) => i.id === item.id);
      if (existingItem) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i,
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  // Remove item from cart
  const removeFromCart = (itemId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  // Update item quantity
  const updateQuantity = (itemId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, quantity } : item)),
    );
  };

  const value = {
    cartItems,
    cartCount,
    addToCart,
    removeFromCart,
    updateQuantity,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// Custom hook to use Cart Context
export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
