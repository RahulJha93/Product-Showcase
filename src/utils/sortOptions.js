import { ArrowDownWideNarrow, ArrowUpWideNarrow, Star, ArrowDownAZ, ArrowUpAZ } from "lucide-react";

export const sortOptions = [
  { value: "price-desc", label: "Price: High to Low", icon: ArrowUpWideNarrow },
  { value: "price-asc", label: "Price: Low to High", icon: ArrowDownWideNarrow },
  { label: "Popularity", value: "popularity", icon: Star },
  { label: "Name: A-Z", value: "name-asc", icon: ArrowDownAZ },
  { label: "Name: Z-A", value: "name-desc", icon: ArrowUpAZ },
];
