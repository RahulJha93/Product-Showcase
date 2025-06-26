import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ id, image, title, price, rating }) => {
  return (
    <div className="group relative bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
      <img
        alt={title}
        src={image}
        className="aspect-square w-full object-contain bg-gray-100 group-hover:opacity-90 lg:h-60"
      />
      <div className="p-4">
        <h3 className="text-base font-semibold text-gray-900 mb-1 line-clamp-2 min-h-[48px]">{title}</h3>
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-900">₹{price}</span>
          <span className="flex items-center text-yellow-500 text-sm font-medium">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.388 2.46a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.388-2.46a1 1 0 00-1.175 0l-3.388 2.46c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.045 9.394c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-.69l1.286-3.967z"/></svg>
            {rating}
          </span>
        </div>
        <Link
          to={`/product/${id}`}
          className="block mt-4 w-full text-center rounded-md py-2 px-4 text-white font-semibold transition-colors"
          style={{ backgroundColor: '#FF3E6C' }}
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
