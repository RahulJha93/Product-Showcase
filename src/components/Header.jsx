import React, { useEffect, useState } from "react";
import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    function updateCount() {
      try {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        setCartCount(cart.reduce((sum, item) => sum + (item.quantity || 0), 0));
      } catch {
        setCartCount(0);
      }
    }
    updateCount();
    window.addEventListener("storage", updateCount);
    // Listen for custom event in case cart is updated in same tab
    window.addEventListener("cartUpdated", updateCount);
    return () => {
      window.removeEventListener("storage", updateCount);
      window.removeEventListener("cartUpdated", updateCount);
    };
  }, []);

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <Link to="/">
          <div className="font-bold text-2xl text-gray-800 tracking-wide cursor-pointer">
            Product Showcase
          </div>
        </Link>
        <Link to="/cart" className="relative bg-transparent border-none cursor-pointer p-0" aria-label="View cart">
          <ShoppingCart size={28} color="#333" />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-[#FF3E6C] text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center shadow">
              {cartCount}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
};

export default Header;
