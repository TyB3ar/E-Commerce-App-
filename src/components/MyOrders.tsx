import { useEffect, useState } from "react";
import { getUserOrders } from "../firebase/orders";
import type { Order } from "../types/order";
import { useAuth } from "../hooks/useAuth";

const MyOrders = () => {
    const { user } = useAuth();
    const [orders, setOrders] = useState<Order[]>([]);

    useEffect(() => {
        if(user) {
            getUserOrders(user.uid).then(setOrders);
        }
    }, [user]); 

    return (
    <div>
      <h2>My Orders</h2>
      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        <ul>
          {orders.map(order => (
            <li key={order.id}>
              <p><strong>Order ID:</strong> {order.id}</p>
              <p><strong>Date:</strong> {order.createdAt.toLocaleString()}</p>
              <p><strong>Total:</strong> ${order.totalPrice.toFixed(2)}</p>
              <button onClick={() => {/* navigate to order details */}}>
                View Details
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyOrders;
