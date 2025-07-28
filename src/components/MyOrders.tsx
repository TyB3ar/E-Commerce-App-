import { useEffect, useState } from "react";
import { getUserOrders } from "../firebase/orders";
import type { Order } from "../types/order";
import { useAuth } from "../hooks/useAuth";
import {  useNavigate } from "react-router-dom";
import '../css/orders.css'; 

const MyOrders = () => {
    const { user } = useAuth();
    const [orders, setOrders] = useState<Order[]>([]);
    const navigate = useNavigate(); 

    useEffect(() => {
        if(user) {
          console.log("Loading orders for UID:", user.uid); 
            getUserOrders(user.uid).then(setOrders);
        }
    }, [user]); 

    return (
    <div className="order-details">
      <h2>My Orders</h2>
      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        <ul>
          {orders.map(order => (
            <li key={order.id}>
              <p><strong>Order ID:</strong> {order.id}</p>
              {order.products.map((product, index) => (
                <div key={index}>
                  <img src={product.image} alt={product.title} />
                  <p><strong>{product.title}</strong></p>
                  <p>Quantity: {product.quantity}</p>
                  <p>Price: ${product.price.toFixed(2)}</p>
                  <hr />
                </div>
              ))}
              <p><strong>Date:</strong> {order.createdAt.toLocaleString()}</p>
              <p><strong>Total:</strong> ${order.totalPrice.toFixed(2)}</p>
              <button onClick={() => {navigate(`/orders/${order.id}`)}}>
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
