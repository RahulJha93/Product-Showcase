import { useMemo, useState } from "react";
import { sortOptions } from "../utils/sortOptions";

export default function useFilters(products, categories, minPrice, maxPrice) {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState([minPrice, maxPrice]);
  const [sort, setSort] = useState(sortOptions[0].value);

  // Keep price range in sync with min/max
  useMemo(() => {
    setPriceRange([minPrice, maxPrice]);
  }, [minPrice, maxPrice]);

  const filtered = useMemo(() => {
    let filtered = products;
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(p => selectedCategories.includes(p.category));
    }
    filtered = filtered.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);
    switch (sort) {
      case "price-asc":
        filtered = [...filtered].sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        filtered = [...filtered].sort((a, b) => b.price - a.price);
        break;
      case "popularity":
        filtered = [...filtered].sort((a, b) => b.rating - a.rating);
        break;
      case "name-asc":
        filtered = [...filtered].sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "name-desc":
        filtered = [...filtered].sort((a, b) => b.title.localeCompare(a.title));
        break;
      default:
        break;
    }
    return filtered;
  }, [products, selectedCategories, priceRange, sort]);

  const handleCategoryChange = (cat) => {
    setSelectedCategories(prev =>
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  const handlePriceChange = (range) => {
    setPriceRange(range);
  };

  const handleSortChange = (val) => setSort(val);

  return {
    filtered,
    selectedCategories,
    priceRange,
    sort,
    handleCategoryChange,
    handlePriceChange,
    handleSortChange,
    sortOptions
  };
}
