import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import SortDropdown from "../components/SortDropdown";
import ProductCard from "../components/ProductCard";
import useProducts from "../hooks/useProducts";
import useFilters from "../hooks/useFilters";

const PRODUCTS_PER_PAGE = 10;

const Home = () => {
  const { products, categories, minPrice, maxPrice } = useProducts();
  const {
    filtered,
    selectedCategories,
    priceRange,
    sort,
    handleCategoryChange,
    handlePriceChange,
    handleSortChange,
    sortOptions
  } = useFilters(products, categories, minPrice, maxPrice);

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(filtered.length / PRODUCTS_PER_PAGE);
  const paginated = filtered.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE
  );

  const handleNext = () => setCurrentPage((p) => Math.min(p + 1, totalPages));
  const handlePrev = () => setCurrentPage((p) => Math.max(p - 1, 1));

  // Reset to first page when filters change
  React.useEffect(() => { setCurrentPage(1); }, [filtered.length]);

  return (
    <>
      <main className="max-w-7xl mx-auto px-4 py-8 flex">
        <Sidebar
          categories={categories}
          selectedCategories={selectedCategories}
          onCategoryChange={handleCategoryChange}
          minPrice={minPrice}
          maxPrice={maxPrice}
          priceRange={priceRange}
          onPriceChange={handlePriceChange}
        />
        <div className="flex-1">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
            <h1 className="text-3xl font-bold text-gray-900">Products</h1>
            <div className="flex items-center gap-2">
              <span className="text-gray-700 text-sm font-medium mr-2">Sort by:</span>
              <SortDropdown
                options={sortOptions}
                value={sort}
                onChange={handleSortChange}
              />
            </div>
          </div>
          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {paginated.map(product => (
              <ProductCard
                key={product.id}
                id={product.id}
                image={product.thumbnail}
                title={product.title}
                price={product.price}
                rating={product.rating}
              />
            ))}
            {paginated.length === 0 && (
              <div className="col-span-full text-center text-gray-500 py-20">Loading...</div>
            )}
          </div>
          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-center gap-4 mt-8">
              <button
                onClick={handlePrev}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded bg-gray-200 font-semibold ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-300'}`}
              >
                Prev
              </button>
              <span className="px-2 py-2 text-gray-700 font-medium">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 rounded bg-gray-200 font-semibold ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-300'}`}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default Home;
