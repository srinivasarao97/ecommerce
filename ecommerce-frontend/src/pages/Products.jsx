import React, { useEffect, useState } from 'react';
import api from '../api/axios';

function Products() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get('/api/products');
        setProducts(response.data);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to load products. Please login or try again.');
        setProducts([
          {
            id: 1,
            name: 'Demo Product 1',
            description: 'This is a fallback product.',
            price: 399,
            imageUrl: 'https://m.media-amazon.com/images/I/61u1VALn6JL._SX679_.jpg',
          },
          {
            id: 2,
            name: 'Demo Product 2',
            description: 'This is another fallback product.',
            price: 499,
            imageUrl: 'https://m.media-amazon.com/images/I/813sVzTfvaL._SX679_.jpg',
          },
        ]);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
    existingCart.push(product);
    localStorage.setItem('cart', JSON.stringify(existingCart));
    alert(`${product.name} added to cart!`);
  };

  return (
    <div className="min-h-screen w-screen bg-gradient-to-r from-green-400 to-blue-500 p-8 flex flex-col items-center">
      <h2 className="text-4xl font-bold text-white mb-6">Our Products</h2>

      {error && <p className="text-red-200 font-semibold mb-4">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full max-w-6xl">
        {products.map((item, idx) => (
          <div
            key={item.id || idx}
            className="bg-white p-6 rounded-lg shadow-xl hover:scale-105 transform transition duration-300"
          >
            <img
              src={
                item.imageUrl?.startsWith('http')
                  ? item.imageUrl
                  : `https://via.placeholder.com/300x200?text=Product+${idx + 1}`
              }
              alt={item.name}
              className="w-full h-40 object-cover rounded-md mb-4"
              onError={(e) => {
                e.target.src = `https://via.placeholder.com/300x200?text=Image+Not+Found`;
              }}
            />
            <h3 className="text-xl font-semibold text-gray-800">{item.name}</h3>
            <p className="text-gray-600 mt-2">{item.description}</p>
            <p className="text-lg text-green-600 font-bold mt-2">₹{item.price}</p>
            <button
              onClick={() => handleAddToCart(item)}
              className="mt-4 bg-indigo-500 text-white py-2 px-4 rounded hover:bg-indigo-600"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;
