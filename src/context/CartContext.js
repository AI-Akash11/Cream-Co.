"use client";

import { createContext, useContext, useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { getCartFromDB, saveCartToDB, syncCartOnLogin } from "@/actions/server/cart";

// Create the Cart Context
const CartContext = createContext();

// Cart Provider Component
export function CartProvider({ children }) {
  const { data: session, status } = useSession();
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  
  // Track previous auth state to detect login events
  const prevAuthStatus = useRef("loading");

  // Load and merge logic on mount and auth changes
  useEffect(() => {
    let isMounted = true;

    async function initCart() {
      // Don't act until session is resolved
      if (status === "loading") return;

      const localCartStr = localStorage.getItem("creamAndCo_cart");
      let localCart = [];
      try {
        if (localCartStr) localCart = JSON.parse(localCartStr);
      } catch (e) {
        console.error("Failed to parse local cart data", e);
      }

      const isDirty = localStorage.getItem("creamAndCo_cart_dirty") === "true";

      if (status === "authenticated" && session?.user?.email) {
        if (isDirty && localCart.length > 0) {
          // Immediately wipe the dirty flag so React Strict Mode (or concurrent rerenders) doesn't fire this twice
          localStorage.setItem("creamAndCo_cart_dirty", "false");
          
          // Merge local cart into DB
          const res = await syncCartOnLogin(session.user.email, localCart);
          if (res.success && isMounted) {
            setCartItems(res.items);
          }
        } else {
          // Just fetch the DB cart
          const res = await getCartFromDB(session.user.email);
          if (res.success && isMounted) {
            setCartItems(res.items);
          }
        }
      } else if (status === "unauthenticated") {
        // Guest mode - just load local cart (which could be the last DB state if they logged out)
        if (isMounted) setCartItems(localCart);
      }

      if (isMounted) setIsHydrated(true);
      prevAuthStatus.current = status;
    }

    initCart();

    return () => {
      isMounted = false;
    };
  }, [status, session?.user?.email]);

  // Sync to database or localStorage on change
  useEffect(() => {
    if (!isHydrated) return;

    // ALWAYS keep localStorage in sync with the current active cart
    localStorage.setItem("creamAndCo_cart", JSON.stringify(cartItems));

    if (status === "authenticated" && session?.user?.email) {
      // Sync to Database
      saveCartToDB(session.user.email, cartItems).catch(err => console.error(err));
    }
  }, [cartItems, isHydrated, status, session?.user?.email]);

  const markDirtyIfGuest = () => {
    if (status === "unauthenticated") {
      localStorage.setItem("creamAndCo_cart_dirty", "true");
    }
  };

  // Calculate total cart item count
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  // Add item to cart
  const addToCart = (item) => {
    markDirtyIfGuest();
    const qtyToAdd = item.quantity || 1;
    
    setCartItems((prev) => {
      const existingItem = prev.find((i) => i.id === item.id);
      if (existingItem) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + qtyToAdd } : i,
        );
      }
      return [...prev, { ...item, quantity: qtyToAdd }];
    });
  };

  // Remove item from cart
  const removeFromCart = (itemId) => {
    markDirtyIfGuest();
    setCartItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  // Update item quantity
  const updateQuantity = (itemId, quantity) => {
    markDirtyIfGuest();
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, quantity } : item)),
    );
  };

  // Clear cart entirely (called after successful payment)
  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("creamAndCo_cart");
    localStorage.removeItem("creamAndCo_cart_dirty");
    if (status === "authenticated" && session?.user?.email) {
      saveCartToDB(session.user.email, []).catch(err => console.error(err));
    }
  };

  // Calculate total cart price
  const cartTotal = cartItems.reduce(
    (total, item) => total + (item.basePrice || 0) * item.quantity,
    0,
  );

  const value = {
    cartItems,
    cartCount,
    cartTotal,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    isCartOpen,
    setIsCartOpen,
    isHydrated,
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
