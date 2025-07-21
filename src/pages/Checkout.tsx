import { useDispatch } from "react-redux";
import { clearCart } from "../cart/cartSlice";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [orderComplete, setOrderComplete] = useState(false);

  useEffect(() => {
    dispatch(clearCart());              // Clear Redux cart
    sessionStorage.removeItem("cart");  // Just in case (already handled by reducer)
    setOrderComplete(true);

    // Optional redirect after a few seconds
    const timeout = setTimeout(() => {
      navigate("/");
    }, 4000);

    return () => clearTimeout(timeout);
  }, [dispatch, navigate]);

  return (
    <div className="checkout-confirmation">
      {orderComplete ? (
        <div>
          <h2>🎉 Order Placed Successfully!</h2>
          <p>Thank you for shopping with us.</p>
        </div>
      ) : (
        <p>Processing your order...</p>
      )}
    </div>
  );
};

export default Checkout;
