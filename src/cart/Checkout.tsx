import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from './store';  
import { createOrder } from '../firebase/orders';
import { useAuth } from '../hooks/useAuth';
import { clearCart } from './cartSlice'; 

const Checkout = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart);

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handlePlaceOrder = async () => {
    if (!user) {
      alert('You must be logged in to place an order.');
      return;
    }

    try {
      const orderId = await createOrder({
        userId: user.uid,
        products: cartItems.map(item => ({
          productId: item.id,
          quantity: item.quantity,
          price: item.price,
          image: item.image,
          title: item.title
        })),
        totalPrice,
      });

      dispatch(clearCart());
      navigate(`/orders/${orderId}`); // Go to order details
    } catch (err) {
      console.error('Failed to place order:', err);
      alert('There was an error placing your order.');
    }
  };

  return (
    <div>
      <h1>Checkout</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <ul>
            {cartItems.map(item => (
              <li key={item.id}>
                {item.title} x {item.quantity} - ${item.price.toFixed(2)}
              </li>
            ))}
          </ul>
          <p>
            Total: ${totalPrice.toFixed(2)}
          </p>
          <button onClick={handlePlaceOrder}>
            Place Order
          </button>
        </div>
      )}
    </div>
  );
};

export default Checkout;