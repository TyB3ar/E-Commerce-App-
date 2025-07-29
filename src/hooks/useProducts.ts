import { useQuery } from "@tanstack/react-query";
import { fetchProducts, fetchCategories, fetchProductsByCategory } from "../products/products";

export const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });
};

export const useCategories = () => {
  return useQuery<string[]>({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });
};

export const useProductsByCategory = (category: string) => {
  return useQuery({
    queryKey: ["products", category],
    queryFn: () => fetchProductsByCategory(category),
    enabled: !!category,
  });
};

