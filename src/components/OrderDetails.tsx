import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getOrderById } from '../firebase/orders';
import type { Order } from '../types/order';
import '../css/orders.css'; 

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
    <div className='order-details'>
      <h1>Order #{order.id}</h1>
      <p><strong>Date:</strong> {order.createdAt.toLocaleString()}</p>
      <p><strong>Total Price:</strong> ${order.totalPrice.toFixed(2)}</p>

      <h2>Products</h2>
      <ul>
        {order.products.map((item, idx) => (
          <li key={idx}>
            <img src={item.image} alt={item.title}/>
            <p><strong>{item.title}</strong></p>
            <p>Quantity: {item.quantity}</p>
            <p>Price per Item: ${item.price.toFixed(2)}</p>
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderDetails;