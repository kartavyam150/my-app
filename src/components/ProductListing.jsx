import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import ProductCard from './ProductCard';

const ProductListing = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetch("https://dummyjson.com/products?limit=0")
      .then(res => res.json())
      .then(data => {
        setProducts(data.products);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  }, []);

  const addToCart = (product) => {
    setCart(prev => {
      const updatedCart = [...prev, product];
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
    console.log("Added to cart:", product);
    alert(`${product.title} added to cart`);
  };

  if (loading) {
    return (
      <>
        <Header />
        <div className="p-6">Loading products...</div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Products</h2>
        <div className="grid grid-cols-4 gap-4">
          {products.map(product => (
            <ProductCard key={product.id} product={product} addToCart={addToCart} />
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductListing;