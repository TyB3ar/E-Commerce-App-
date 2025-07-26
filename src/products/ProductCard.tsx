import { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../cart/cartSlice";
import type { Product } from "../types/product";
import "../css/ProductCard.css"; 

interface ProductCardProps {
  product: Product;
  onEdit?: (product: Product) => void;
  onDelete?: (id: string) => void;
  showAddToCart?: boolean;
}

const ProductCard = ({ product, onEdit, onDelete, showAddToCart = true }: ProductCardProps) => {
  const dispatch = useDispatch();
  const [showPopup, setShowPopup] = useState(false); 

  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, quantity: 1 }));
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 1000); // Hide after 2 seconds 
  };

  return (
    <div className="card">
      <img src={product.image} alt={product.title || "Product Image"} />
      <h3>{product.title}</h3>
      <p>{product.category}</p>
      <p>${product.price}</p>

      {showAddToCart && <button onClick={handleAddToCart}>Add to Cart</button>}
      {showPopup && <div className="popup">🛒 Added to cart!</div>}

      {onEdit && onDelete && (
        <div className="admin-controls">
          <button onClick={() => onEdit(product)} className="btn btn-edit">Edit</button>
          <button onClick={() => onDelete(product.id)} className="btn btn-delete">Delete</button>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
