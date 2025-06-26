import React, { useEffect, useState } from "react";

const getCart = () => {
  try {
    return JSON.parse(localStorage.getItem("cart")) || [];
  } catch {
    return [];
  }
};

const setCart = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

export default function Cart() {
  const [cart, setCartState] = useState([]);

  useEffect(() => {
    setCartState(getCart());
  }, []);

  const total = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const updateQuantity = (id, quantity) => {
    const updated = cart.map((item) =>
      item.id === id ? { ...item, quantity } : item
    );
    setCart(updated);
    setCartState(updated);
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const removeItem = (id) => {
    const updated = cart.filter((item) => item.id !== id);
    setCart(updated);
    setCartState(updated);
    window.dispatchEvent(new Event("cartUpdated"));
  };

  return (
    <main className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Cart</h1>
      {cart.length === 0 ? (
        <div className="text-gray-500">Your cart is empty.</div>
      ) : (
        <div className="space-y-4">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between border-b pb-4 gap-4"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-16 w-16 object-cover rounded-md border"
                />
                <div>
                  <div className="font-semibold">{item.title}</div>
                  <div className="text-sm text-gray-500">₹{item.price}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min={1}
                  value={item.quantity}
                  onChange={(e) =>
                    updateQuantity(item.id, Math.max(1, Number(e.target.value)))
                  }
                  className="w-16 border rounded px-2 py-1 text-center"
                />
                <button
                  className="text-red-500 hover:underline text-sm"
                  onClick={() => removeItem(item.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div className="flex justify-end mt-6">
            <div className="text-xl font-bold">Total: ₹{total.toFixed(2)}</div>
          </div>
        </div>
      )}
    </main>
  );
}
