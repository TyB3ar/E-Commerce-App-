import React from "react"; 
import { useState, useEffect } from "react";
import type { FormEvent } from "react";
import type { Product } from "../types/product";
import styles from "../css/ProductForm.module.css";

interface ProductFormProps {
  product?: Product | null;
  onSave: (product: Product | Omit<Product, "id">) => void | Promise<void>; 
  onClose: () => void;
}

const ProductForm = ({ product, onSave, onClose }: ProductFormProps) => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState<string>(product?.price.toString() || "");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    if (product) {
      setTitle(product.title);
      setPrice(product.price.toString());
      setCategory(product.category);
      setDescription(product.description);
      setImage(product.image);
    }
  }, [product]);

  const handleSubmit = async (e: FormEvent) => {
  e.preventDefault();

  const parsedPrice = parseFloat(price);

  if (isNaN(parsedPrice) || parsedPrice <= 0) {
    alert("Please enter a valid positive price (e.g. 19.99)");
    return;
  }

  const productData = {
    title,
    price: parsedPrice, // convert string to number here
    category,
    description,
    image
  };

  if (product?.id) {
    await onSave({ ...productData, id: product.id });
  } else {
    await onSave(productData);
  }

  if (!title || !category || !description) {
  alert("Please fill in all required fields.");
  return;
}

  onClose();
};

  return (
    <div className={styles.modalOverlay}>
      <form onSubmit={handleSubmit} className={styles.formContainer}>
        <h2>{product ? "Edit Product" : "Add New Product"}</h2>

        <input
          className={styles.input}
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <input
          className={styles.input}
          type="text"
          placeholder="Price (example: 19.99)"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />

        <input
          className={styles.input}
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />

        <textarea
          className={styles.textarea}
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <input
          className={styles.input}
          type="text"
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />

        <div className={styles.buttonGroup}>
          <button type="button" onClick={onClose} className={styles.cancelButton}>
            Cancel
          </button>
          <button type="submit" className={styles.saveButton}>
            {product ? "Update" : "Add"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm; 
