import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-green-600 text-white px-6 py-3 shadow-md">
      <div className="flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          🌱 FarmBox
        </Link>
        <div className="space-x-4">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/login" className="hover:underline">Login</Link>
          <Link to="/register" className="hover:underline">Register</Link>
          <Link to="/cart" className="hover:underline">Cart</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
