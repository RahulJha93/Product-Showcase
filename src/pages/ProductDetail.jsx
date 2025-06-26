import React, { useEffect, useState } from "react";
import { fetchProductById } from "../services/api";
import { useParams } from "react-router-dom";
import { Star } from "lucide-react";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cartAdded, setCartAdded] = useState(false);
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetchProductById(id)
      .then(data => {
        let images = Array.isArray(data.images) && data.images.length > 0 ? data.images : [];
        if (data.thumbnail && !images.includes(data.thumbnail)) images.unshift(data.thumbnail);
        setProduct({ ...data, images });
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="text-center py-20">Loading...</div>;
  if (error) return <div className="text-center py-20 text-red-500">{error}</div>;
  if (!product) return null;

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 gap-10">
      {/* Left: Product Images */}
      <div className="flex flex-col gap-4">
        <img
          src={product.images[selectedImageIdx] || product.images[0]}
          alt={product.title}
          className="rounded-lg bg-gray-100 object-cover aspect-[4/5] w-full"
        />
        <div className="flex gap-2">
          {product.images.map((img, i) => (
            <img
              key={i}
              src={img}
              alt={product.title + " " + (i + 1)}
              className={`h-16 w-16 rounded-md object-cover border-2 cursor-pointer transition-all duration-150 ${selectedImageIdx === i ? 'border-[#FF3E6C] ring-2 ring-[#FF3E6C]' : 'border-gray-200'}`}
              onClick={() => setSelectedImageIdx(i)}
            />
          ))}
        </div>
      </div>

      {/* Right: Product Info */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.title}</h1>
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xl font-semibold text-gray-800">₹{product.price}</span>
          <span className="flex items-center gap-1 text-yellow-500">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={i < Math.round(product.rating || 0) ? "fill-yellow-400" : "fill-gray-200"} size={18} />
            ))}
            <span className="ml-2 text-sm text-gray-600">({product.rating || 0} / 5)</span>
          </span>
        </div>
        <p className="text-gray-700 mb-6">{product.description}</p>

        {/* Add to Cart button */}
        <button
          onClick={() => {
            // Add to localStorage cart
            let cart = [];
            try {
              cart = JSON.parse(localStorage.getItem("cart")) || [];
            } catch { cart = []; }
            const idx = cart.findIndex(item => item.id === product.id);
            if (idx > -1) {
              cart[idx].quantity += 1;
            } else {
              cart.push({
                id: product.id,
                title: product.title,
                price: product.price,
                image: product.images[0],
                quantity: 1
              });
            }
            localStorage.setItem("cart", JSON.stringify(cart));
            window.dispatchEvent(new Event("cartUpdated"));
            setCartAdded(true);
            setTimeout(() => setCartAdded(false), 1200);
          }}
          className="w-full mt-8 py-3 px-6 rounded-md text-white font-bold text-lg shadow-md transition-colors"
          style={{ backgroundColor: "#FF3E6C" }}
          disabled={cartAdded}
        >
          {cartAdded ? "Added!" : "Add to Cart"}
        </button>

        {/* Reviews */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-2">Reviews</h2>
          {product.reviews && product.reviews.length > 0 ? (
            <div className="space-y-4">
              {product.reviews.slice(0, 5).map((review, idx) => (
                <div key={idx} className="border-b pb-2">
                  <div className="flex items-center gap-2 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300 fill-gray-200"}
                        size={16}
                      />
                    ))}
                    <span className="font-medium text-gray-900">{review.reviewerName || 'User'}</span>
                  </div>
                  <p className="text-gray-700 text-sm">{review.comment}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-gray-500 text-sm">No reviews yet.</div>
          )}
        </div>
      </div>
    </div>
  );
}

