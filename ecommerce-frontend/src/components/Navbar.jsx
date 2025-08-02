import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between">
      <div className="font-bold text-lg">E-Commerce</div>
      <div className="space-x-4">
        <Link to="/home" className="hover:text-yellow-300">Home</Link>
        <Link to="/products" className="hover:text-yellow-300">Products</Link>
        <Link to="/login" className="hover:text-yellow-300">Login</Link>
        <Link to="/register" className="hover:text-yellow-300">Register</Link>
       <Link to="/cart" className="hover:text-yellow-300">Cart</Link>
       <Link to="/order-history" className="hover:text-yellow-300">Order History</Link>

      </div>
    </nav>
  );
}

export default Navbar;
