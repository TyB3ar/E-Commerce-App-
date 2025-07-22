import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { RootState } from "../app/store";
import { removeFromCart, clearCart } from "../cart/cartSlice";
import { useState } from "react";
import "../css/cart.css"; 

const Cart = () => {
  const cart = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate(); 

  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    dispatch(clearCart());
    setShowModal(true);
  };

  return (
    <div>
      <h2>Shopping Cart</h2>
      {cart.length === 0 ? <p>Your cart is empty.</p> : null}

      {cart.map((item) => (
        <div className="card cart-card" key={item.id}>
          <img src={item.image} alt={item.title} width="50" />
          <p>{item.title}</p>
          <p>Qty: {item.quantity}</p>
          <p>Price: ${item.price}</p>
          <button onClick={() => dispatch(removeFromCart(item.id))}>Remove</button>
        </div>
      ))}

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
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              background: "#fff",
              padding: "2rem",
              borderRadius: "8px",
              textAlign: "center",
              maxWidth: "400px",
            }}
          >
            <h2>🎉 Order Placed Successfully!</h2>
            <p>Thank you for shopping with us.</p>
            <button onClick={() => {setShowModal(false); navigate("/");}}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
