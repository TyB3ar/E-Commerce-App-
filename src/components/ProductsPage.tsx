import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useProducts, useCategories, useProductsByCategory } from "../hooks/useProducts";
import ProductCard from "../products/ProductCard";
import ProductForm from "../products/ProductForm";
import type { Product } from "../types/product";
import { addProduct, updateProduct, deleteProduct } from "../firebase/products";

const ProductsPage = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const queryClient = useQueryClient(); 

  // Fetch all products or filtered products
  const {
    data: products,
    isLoading: productsLoading,
    error: productsError,
  } = selectedCategory ? useProductsByCategory(selectedCategory) : useProducts();

  // Fetch categories for filter dropdown
  const {
    data: categories,
    isLoading: categoriesLoading,
    error: categoriesError,
  } = useCategories();

  if (productsLoading || categoriesLoading) return <p>Loading...</p>;
  if (productsError || categoriesError) return <p>Error loading data</p>;

  // Firestore mutation handlers: 
  const handleSave = async (product: Product | Omit<Product, "id">) => {
    if ("id" in product) {
      await updateProduct(product.id, product);
    } else {
      await addProduct(product);
    }
    setShowForm(false);
    setSelectedProduct(null);
    await queryClient.invalidateQueries({ queryKey: ["products"] });
    await queryClient.invalidateQueries({ queryKey: ["products", selectedCategory] });
  };

  const handleDelete = async (id: string) => {
    await deleteProduct(id);
    await queryClient.invalidateQueries({ queryKey: ["products"] });
    await queryClient.invalidateQueries({ queryKey: ["products", selectedCategory] });
  };

  return (
    <div>
      <h1>Product Management</h1>

      {/* Category filter */}
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        <option value="">All Categories</option>
        {categories?.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      <button onClick={() => setShowForm(true)}>Add Product</button>

      {/* Product form modal */}
      {showForm && (
        <ProductForm
          product={selectedProduct}
          onSave={handleSave}
          onClose={() => {
            setShowForm(false);
            setSelectedProduct(null);
          }}
        />
      )}

      {/* Products grid */}
      <div className="grid">
        {products?.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onEdit={(p) => {
              setSelectedProduct(p);
              setShowForm(true);
            }}
            onDelete={handleDelete} 
            showAddToCart={false}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
