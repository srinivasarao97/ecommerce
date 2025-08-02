import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const handleCheckout = async () => {
  const token = localStorage.getItem('token'); // 👈 get the stored JWT
   const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  try {
    const response = await axios.post(
      'http://localhost:8090/api/payment/checkout',
      {cartItems}, // POST body is empty, as backend gets user from token
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      }
    );

    console.log('Payment Success:', response.data);
    alert(response.data.message);
  } catch (error) {
    console.error('Payment Failed:', error.response?.data || error.message);
    alert(`Payment Failed: ${error.response?.data || 'Unknown error'}`);
  }
};


function Payment() {
  const navigate = useNavigate();
  const location = useLocation();

  const totalAmount = location.state?.totalAmount || 0;

  const [name, setName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');

  const handlePayment = async (e) => {
    e.preventDefault();

    if (!name || !cardNumber || !expiry || !cvv) {
      alert('Please fill all fields');
      return;
    }

    if (cardNumber.length < 16 || cvv.length !== 3) {
      alert('Invalid card details');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
      await axios.post(
        'http://localhost:8090/api/payment/checkout',
        {cartItems},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          },
        }
      );

      alert('✅ Payment successful! Order placed.');
      localStorage.removeItem('cart');
      navigate('/order-history');
    } catch (error) {
      console.error('❌ Error during checkout:', error);
      const msg = error?.response?.data || 'Unknown error';
      alert("Payment failed: " + (error.response?.data?.message || "Unknown error"));
    }
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-green-400">
      <form onSubmit={handlePayment} className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Payment Details</h2>

        {/* ✅ Show amount received from cart */}
        <p className="text-lg text-gray-600 font-medium mb-4">
          Total Amount:{' '}
          <span className="font-bold text-green-700">₹{totalAmount.toFixed(2)}</span>
        </p>

        <input
          type="text"
          placeholder="Cardholder Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 mb-4 border rounded focus:outline-none"
          required
        />

        <input
          type="text"
          placeholder="Card Number (16 digits)"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
          maxLength="16"
          className="w-full px-4 py-2 mb-4 border rounded focus:outline-none"
          required
        />

        <div className="flex gap-4 mb-4">
          <input
            type="text"
            placeholder="MM/YY"
            value={expiry}
            onChange={(e) => setExpiry(e.target.value)}
            className="w-1/2 px-4 py-2 border rounded focus:outline-none"
            required
          />
          <input
            type="text"
            placeholder="CVV"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
            maxLength="3"
            className="w-1/2 px-4 py-2 border rounded focus:outline-none"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition"
        >
          Pay Now
        </button>
      </form>
    </div>
  );
}

export default Payment;
