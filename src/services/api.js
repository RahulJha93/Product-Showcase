const API_BASE = import.meta.env.VITE_API_BASE;

export async function fetchProducts(limit = 100) {
  const res = await fetch(`${API_BASE}/products?limit=${limit}`);
  if (!res.ok) throw new Error("Failed to fetch products");
  const data = await res.json();
  return data.products;
}

export async function fetchProductById(id) {
  const res = await fetch(`${API_BASE}/products/${id}`);
  if (!res.ok) throw new Error("Product not found");
  return res.json();
}

export async function fetchCommentsByProductId(id) {
  const res = await fetch(`${API_BASE}/comments?postId=${id}`);
  if (!res.ok) throw new Error("Failed to fetch comments");
  const data = await res.json();
  return data.comments;
}

