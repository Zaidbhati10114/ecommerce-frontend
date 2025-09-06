import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const { getCartItemsCount } = useCart();
  const location = useLocation();

  const handleLogout = () => {
    logout();
  };

  if (!user) return null;

  return (
    <nav className="bg-white shadow-lg border-b">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/home" className="text-2xl font-bold text-blue-600">
            ShopEasy
          </Link>

          <div className="flex items-center space-x-6">
            <Link
              to="/home"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                location.pathname === "/home"
                  ? "text-blue-600 bg-blue-50"
                  : "text-gray-700 hover:text-blue-600"
              }`}
            >
              Products
            </Link>

            <Link
              to="/cart"
              className={`relative px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                location.pathname === "/cart"
                  ? "text-blue-600 bg-blue-50"
                  : "text-gray-700 hover:text-blue-600"
              }`}
            >
              Cart
              {getCartItemsCount() > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {getCartItemsCount()}
                </span>
              )}
            </Link>

            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-700">
                Welcome, {user.name}
              </span>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
