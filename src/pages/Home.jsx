import { useEffect, useState } from "react";
import axios from "../api/axiosInstance";

const Home = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("/products/all"); // Make sure this endpoint is correct in Spring Boot
      setProducts(res.data);
    } catch (err) {
      console.error("Error fetching products", err);
    }
  };

  const addToCart = (product) => {
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingItem = existingCart.find((item) => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      existingCart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(existingCart));
    alert(`${product.name} added to cart`);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="mt-4">
      <h1 className="text-3xl font-bold text-center mb-6">🌱 Fresh Produce from Farmers</h1>

      {products.length === 0 ? (
        <p className="text-center text-gray-500">No products available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id} className="border rounded-xl shadow-md p-4 hover:shadow-lg transition">
              <h2 className="text-xl font-semibold">{product.name}</h2>
              <p className="text-sm text-gray-600">By: {product.farmerName}</p>
              <p className="text-green-700 font-bold mt-2">₹ {product.price.toFixed(2)}</p>
              <p className="text-sm text-gray-500">Stock: {product.stock}</p>
              
              <button
                onClick={() => addToCart(product)} // ✅ Hooked correctly here
                className="mt-3 bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700 w-full transition"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
