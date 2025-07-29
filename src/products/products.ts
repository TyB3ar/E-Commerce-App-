import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase/fbConfig";
import type { Product } from "../types/product";
import { getProducts } from "../firebase/products";

// Get all products
export const fetchProducts = async (): Promise<Product[]> => {
  return await getProducts(); 
};

// Get all categories
export const fetchCategories = async (): Promise<string[]> => {
  const products = await getProducts();
  const categoriesSet = new Set(products.map((p) => p.category));
  return Array.from(categoriesSet);
};

// Get products by category
export const fetchProductsByCategory = async (category: string): Promise<Product[]> => {
  const productsRef = collection(db, "products");
  const q = query(productsRef, where("category", "==", category));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ 
    id: doc.id, 
    ...(doc.data() as Omit<Product, "id">) 
  }));
};

