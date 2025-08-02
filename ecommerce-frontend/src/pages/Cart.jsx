import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
function Cart() {
  const [cartItems, setCartItems] = useState([]);
 const navigate = useNavigate();

  const handlePayment = () => {
    navigate('/payment', { state: { totalAmount: getTotal() } });
  };
  // Load cart items from localStorage on mount
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(savedCart);
  }, []);

  // ✅ Remove item by index
  const handleRemove = (indexToRemove) => {
    const updatedCart = cartItems.filter((_, idx) => idx !== indexToRemove);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };
const handleAddToCart = (product) => {
  const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
  existingCart.push(product);
  localStorage.setItem('cart', JSON.stringify(existingCart));
  alert(`${product.name} added to cart`);
};
  const getTotal = () =>
    cartItems.reduce((acc, item) => acc + (item.price || 0), 0);

  return (
    <div className="min-h-screen w-screen bg-gradient-to-r from-purple-400 to-pink-500 p-8 flex flex-col items-center">
      <h2 className="text-4xl font-bold text-white mb-6">Your Cart</h2>

      {cartItems.length === 0 ? (
        <p className="text-white text-lg">Your cart is empty.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
            {cartItems.map((item, idx) => (
              <div key={idx} className="bg-white p-4 rounded shadow-md relative">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="h-32 w-full object-cover rounded mb-2"
                />
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p>{item.description}</p>
                <p className="font-bold text-green-600 mt-1">₹{item.price}</p>
                <button
                  onClick={() => handleRemove(idx)}
                  className="mt-3 bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <h3 className="text-white text-2xl mt-6">
            Total: ₹{getTotal()}
          </h3>
<button
  className="mt-6 bg-green-600 text-white py-2 px-6 rounded hover:bg-green-700"
  onClick={() => navigate('/payment', { state: { totalAmount: getTotal() } })}
>
  Proceed to Payment
</button>

        </>
      )}
    </div>
  );
}

export default Cart;
