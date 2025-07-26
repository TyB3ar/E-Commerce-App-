import { useQuery } from "@tanstack/react-query";
import { fetchProducts, fetchCategories, fetchProductsByCategory } from "../api/products";
import { useState } from "react";
import ProductCard from "../products/ProductCard";
import type { Product } from "../types/product";

const Home = () => {
  const [category, setCategory] = useState("");

  const { data: categories, isLoading: catLoading, error: catError } = useQuery<string[]>({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  const {
    data: products,
    isLoading: prodLoading,
    error: prodError,
  } = useQuery<Product[]>({
    queryKey: ["products", category],
    queryFn: () => (category ? fetchProductsByCategory(category) : fetchProducts()),
    placeholderData: [],
  });

  if (catLoading || prodLoading) return <p>Loading...</p>;
  if (catError || prodError) return <p>Error loading products or categories.</p>;

  return (
    <div className="category-container">
      <select onChange={(e) => setCategory(e.target.value)} value={category}>
        <option value="">All</option>
        {categories?.map((cat) => (
          <option key={cat} value={cat}>
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </option>
        ))}
      </select>

      <div className="product-grid">
        {products?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Home;
