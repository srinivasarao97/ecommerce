import React, { useEffect, useState } from 'react';
import api from '../api/axios'; // Axios instance that includes token

function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await api.get('/api/orders/history');
        setOrders(response.data);
      } catch (err) {
        console.error('Failed to fetch order history:', err);
        setError('Could not fetch order history.');
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="min-h-screen w-screen bg-gradient-to-r from-blue-400 to-indigo-500 p-8 text-white flex flex-col items-center">
      <h2 className="text-4xl font-bold mb-6">Order History</h2>

      {error && <p className="text-red-200 font-semibold mb-4">{error}</p>}

      {orders.length === 0 ? (
        <p className="text-lg">You haven't placed any orders yet.</p>
      ) : (
        <div className="w-full max-w-4xl space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="bg-white text-black p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">
                Order #{order.id} - {new Date(order.orderDate).toLocaleString()}
              </h3>
              <p className="mb-2 font-medium">Total: ₹{order.totalAmount.toFixed(2)}</p>
              <p className="mb-2 text-sm text-gray-700">Ordered by: {order.username}</p>

              <ul className="mt-4 space-y-2">
                {order.orderItems.map((item, idx) => (
                  <li key={idx} className="border-b pb-2">
                    <div className="flex justify-between items-center">
                      <div>
                        <strong>{item.productName}</strong> — ₹{item.price} × {item.quantity}
                      </div>
                      <div className="text-sm text-gray-600">
                        Total: ₹{item.price * item.quantity}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default OrderHistory;
