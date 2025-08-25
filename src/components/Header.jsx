import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaHome, FaShoppingCart, FaUserAlt, FaUserPlus, FaSearch } from "react-icons/fa";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [cartCount, setCartCount] = useState(0);
  const navigate = useNavigate();

  // Poll localStorage every second to update the cart count.
  useEffect(() => {
    const interval = setInterval(() => {
      const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
      setCartCount(storedCart.length);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // When Enter is pressed, navigate using the DummyJSON search endpoint.
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      navigate(`https://dummyjson.com/products/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="bg-blue-600 text-[#333] p-4 flex items-center justify-between">
      <div className="flex items-center">
        {/* Replace the placeholder image with your logo */}
        <img
          src="https://via.placeholder.com/100x40?text=Flipkart"
          alt="Flipkart Logo"
          className="mr-4"
        />
        {/* Enhanced Search Box */}
        <div className="relative">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search for products, brands and more"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="pl-10 pr-4 py-2 rounded w-96 text-black transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
      </div>
      <nav>
        <ul className="flex space-x-4">
          <li className="cursor-pointer">
            <Link to="/">
              <FaHome className="text-[#333]" />
            </Link>
          </li>
          <li className="cursor-pointer">
            <Link to="/login" className="flex items-center space-x-1 text-[#333]">
              <FaUserAlt className="text-[#333]" />
              <span>Login</span>
            </Link>
          </li>
          <li className="cursor-pointer">
            <Link to="/signup" className="flex items-center space-x-1 text-[#333]">
              <FaUserPlus className="text-[#333]" />
              <span>Signup</span>
            </Link>
          </li>
          <li className="relative cursor-pointer">
            <Link to="/cart">
              <FaShoppingCart className="text-[#333] text-2xl" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 rounded-full text-xs w-4 h-4 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;