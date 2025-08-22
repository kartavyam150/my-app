import React from 'react';

const ProductCard = ({ product, addToCart }) => {
  // Conversion factor: 1 USD = 80 INR (adjust as needed)
  const conversionFactor = 80;
  const priceInINR = (product.price * conversionFactor).toFixed(2);

  return (
    <div className="border p-4 rounded shadow hover:shadow-lg transition flex flex-col">
      <img 
        src={product.thumbnail} 
        alt={product.title} 
        className="w-full h-40 object-cover mb-4 rounded" 
      />
      <h3 className="text-lg font-semibold mb-1">{product.title}</h3>
      <p className="text-gray-600 mb-1 text-sm">{product.brand}</p>
      <p className="text-blue-500 font-bold mb-2">${product.price}</p>
      <p className="text-blue-500 font-bold mb-2">₹{priceInINR}</p>
      <p className="text-gray-500 text-xs mb-3">Rating: {product.rating} ⭐</p>
      <button
        onClick={() => addToCart(product)}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition mt-auto"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;