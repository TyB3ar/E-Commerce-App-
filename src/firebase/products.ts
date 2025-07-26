// Firestore Utilities for Products collection 
import { db } from "./fbConfig";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import type { Product } from "../types/product";

const productsRef = collection(db, "products");

export const getProducts = async () => {
  const snapshot = await getDocs(productsRef);
  return snapshot.docs.map(doc => ({ 
    id: doc.id, 
    ...(doc.data() as Omit<Product, "id">), 
}));
};

export const addProduct = async (product: Omit<Product, "id">) => {
  return await addDoc(productsRef, product);
};

export const updateProduct = async (id: string, product: Partial<Product>) => {
  const productDoc = doc(db, "products", id);
  return await updateDoc(productDoc, product);
};

export const deleteProduct = async (id: string) => {
  const productDoc = doc(db, "products", id);
  return await deleteDoc(productDoc);
};
