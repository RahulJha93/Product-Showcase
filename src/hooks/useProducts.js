import { useEffect, useState } from "react";
import { fetchProducts } from "../services/api";

export default function useProducts() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);

  useEffect(() => {
    fetchProducts(100).then(productsData => {
      setProducts(productsData);
      const cats = Array.from(new Set(productsData.map(p => p.category)));
      setCategories(cats);
      const prices = productsData.map(p => p.price);
      setMinPrice(0);
      setMaxPrice(Math.max(...prices));
    });
  }, []);

  return { products, categories, minPrice, maxPrice };
}
