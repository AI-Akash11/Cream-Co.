"use client";

import { addToCart } from "@/app/actions/shop-actions";
import { useCart } from "@/context/CartContext";
import { FiCheck } from "react-icons/fi";

import Swal from "sweetalert2";

const CartButton = ({ cake, buttonStyle = "default" }) => {
  const { _id, name, basePrice, images } = cake;
  const { cartItems, addToCart: addClientCart } = useCart();

  const isInCart = cartItems.some((item) => item.id === _id);

  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (isInCart) return;

    // Update client UI & Context (which handles DB/Local sync)
    addClientCart({
      id: _id,
      name,
      basePrice,
      image: images?.[0] || "",
    });

    // Show SweetAlert Toast
    Swal.fire({
      toast: true,
      position: 'bottom-end',
      icon: 'success',
      title: 'Added to cart!',
      text: `${name} has been added to your cart.`,
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      background: 'var(--fallback-b1,oklch(var(--b1)))',
      color: 'var(--fallback-bc,oklch(var(--bc)))',
      iconColor: 'var(--fallback-su,oklch(var(--su)))',
      customClass: {
        popup: 'rounded-2xl border border-base-300 shadow-2xl',
      }
    });
  };

  if (buttonStyle === "overlay") {
    return (
      <button
        onClick={handleAddToCart}
        disabled={isInCart}
        className={`flex-1 flex items-center justify-center gap-2 text-xs font-bold py-3 px-3 rounded-none uppercase tracking-tight transition-all duration-300 ${
          isInCart
            ? "bg-success text-white cursor-default"
            : "bg-white text-black hover:bg-primary hover:text-white"
        }`}
      >
        {isInCart ? (
          <>
            <FiCheck size={16} /> Added to Cart
          </>
        ) : (
          "Add to Cart"
        )}
      </button>
    );
  }

  // Default block style button
  return (
    <button 
      onClick={handleAddToCart}
      disabled={isInCart}
      className={`btn w-full rounded-xl font-bold h-12 shadow-lg hover:-translate-y-1 transition-all flex items-center justify-center gap-2 ${
        isInCart 
          ? "btn-success text-white hover:translate-y-0 cursor-default shadow-none" 
          : "btn-secondary text-white shadow-secondary/20"
      }`}
    >
      {isInCart ? (
        <>
          <FiCheck size={18} /> Added to Cart
        </>
      ) : (
        "Add to Cart"
      )}
    </button>
  );
};

export default CartButton;