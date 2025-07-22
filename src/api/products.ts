import axios from "axios";
import type { Product } from "../types/product";

const BASE_URL = "https://fakestoreapi.com";

// Get all products
export const fetchProducts = async (): Promise<Product[]> => {
  const res = await axios.get(`${BASE_URL}/products`);
  return res.data;
};

// Get all categories
export const fetchCategories = async (): Promise<string[]> => {
  const res = await axios.get(`${BASE_URL}/products/categories`);
  return res.data;
};

// Get products by category
export const fetchProductsByCategory = async (category: string): Promise<Product[]> => {
  const res = await axios.get(`${BASE_URL}/products/category/${category}`);
  return res.data;
};
