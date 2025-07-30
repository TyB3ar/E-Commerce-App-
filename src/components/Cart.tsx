import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { RootState } from "../cart/store";
import { removeFromCart, clearCart } from "../cart/cartSlice";
import { createOrder } from "../firebase/orders";
import { useAuth } from "../hooks/useAuth";
import { useState } from "react";
import "../css/cart.css"; 
import "../css/index.css";

const Cart = () => {
  const cart = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate(); 
  const { user } = useAuth(); 

  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = async () => {
    if(!user) return; 

    const orderData = {
      userId: user.uid,
      products: cart.map((item) => ({
        productId: item.id,
        title: item.title,
        image: item.image,
        quantity: item.quantity,
        price: item.price,
      })),
      totalPrice,
    };

    try {
      await createOrder(orderData);
      dispatch(clearCart());
      setShowModal(true);
    } catch (err) {
      console.error("Failed to place order:", err);
    }
  };

  return (
    <div>
      <h2>Shopping Cart</h2>
      {cart.length === 0 ? <p>Your cart is empty.</p> : null}

    <div className="product-grid">
      {cart.map((item) => (
        <div className="card cart-card" key={item.id}>
          <img src={item.image} alt={item.title} width="50" />
          <p>{item.title}</p>
          <p>Qty: {item.quantity}</p>
          <p>Price: ${item.price}</p>
          <button onClick={() => dispatch(removeFromCart(item.id))}>Remove</button>
        </div>
      ))}
    </div>
      

      {cart.length > 0 && (
        <>
          <hr />
          <p>Total Items: {totalQuantity}</p>
          <p>Total Price: ${totalPrice.toFixed(2)}</p>
          <button onClick={handleCheckout}>Checkout</button>
        </>
      )}

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>🎉 Order Placed Successfully!</h2>
            <p>Thank you for shopping with us.</p>
            <button onClick={() => {setShowModal(false); navigate("/");}}>
              Close
            </button>
            <button onClick={() => {setShowModal(false); navigate("/orders/:orderId")}}>Order Details</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
