import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getOrderById } from '../firebase/orders';
import type { Order } from '../types/order';

const OrderDetails = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    if (orderId) {
      getOrderById(orderId).then(setOrder);
    }
  }, [orderId]);

  if (!order) return <p>Loading order details...</p>;

  return (
    <div>
      <h1>Order #{order.id}</h1>
      <p><strong>Date:</strong> {order.createdAt.toLocaleString()}</p>
      <p><strong>Total Price:</strong> ${order.totalPrice.toFixed(2)}</p>

      <h2>Products</h2>
      <ul>
        {order.products.map((item, idx) => (
          <li key={idx}>
            Product ID: {item.productId} — Qty: {item.quantity} — ${item.price.toFixed(2)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderDetails;