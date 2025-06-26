import React from "react";
import { Filter, ChevronDown, ChevronUp, Plus, Minus } from "lucide-react";

const Sidebar = ({
  categories = [],
  selectedCategories = [],
  onCategoryChange,
  minPrice,
  maxPrice,
  priceRange,
  onPriceChange,
}) => {
  return (
    <aside className="hidden lg:block w-64 pr-6">
      <div className="mb-8">
        <h2 className="flex items-center gap-2 text-lg font-bold mb-4 text-gray-900">
          <Filter className="w-5 h-5" /> Filters
        </h2>
        <div className="mb-6">
          <div className="flex items-center justify-between cursor-pointer mb-2">
            <span className="font-semibold text-gray-700">Category</span>
          </div>
          <ul className="space-y-1">
            {categories.map(category => (
              <li key={category}>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(category)}
                    onChange={() => onCategoryChange(category)}
                    className="accent-blue-600 w-4 h-4 rounded"
                  />
                  <span className="text-gray-800 text-sm capitalize">{category}</span>
                </label>
              </li>
            ))}
          </ul>
        </div>
        <div className="mb-6">
          <div className="flex items-center justify-between cursor-pointer mb-2">
            <span className="font-semibold text-gray-700">Price Range</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <input
              type="number"
              min={minPrice}
              max={priceRange[1]}
              value={priceRange[0]}
              onChange={e => onPriceChange([Number(e.target.value), priceRange[1]])}
              className="w-16 border border-gray-300 rounded px-2 py-1"
            />
            <span>-</span>
            <input
              type="number"
              min={priceRange[0]}
              max={maxPrice}
              value={priceRange[1]}
              onChange={e => onPriceChange([priceRange[0], Number(e.target.value)])}
              className="w-16 border border-gray-300 rounded px-2 py-1"
            />
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
