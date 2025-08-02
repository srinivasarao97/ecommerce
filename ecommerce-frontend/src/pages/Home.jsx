import React from 'react';

function Home() {
  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-r from-purple-500 to-indigo-500">
      <div className="bg-white p-10 rounded-xl shadow-lg text-center max-w-2xl w-full">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to Our E-Commerce Site</h1>
        <p className="text-gray-600 text-lg">Explore our products and enjoy seamless shopping experience!</p>
      </div>
    </div>
  );
}

export default Home;