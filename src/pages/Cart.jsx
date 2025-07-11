import { useEffect, useState } from "react";
import axios from "../api/axiosInstance";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success"); // success or error

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
    calculateTotal(storedCart);
  }, []);

  const calculateTotal = (items) => {
    const sum = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setTotal(sum);
  };

  const handleCheckout = async () => {
    if (cart.length === 0) {
      setMessage("❌ Your cart is empty.");
      setMessageType("error");
      return;
    }

    try {
      await axios.post("/buyer/checkout", cart);
      setMessage("✅ Order placed successfully!");
      setMessageType("success");
      localStorage.removeItem("cart");
      setCart([]);
      setTotal(0);
    } catch (err) {
      setMessage("❌ Checkout failed. Try again.");
      setMessageType("error");
    }
  };

  const removeFromCart = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCart(updatedCart);
    calculateTotal(updatedCart);
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">🛒 Your Cart</h2>

      {message && (
        <div
          className={`mb-4 text-center font-medium ${
            messageType === "success" ? "text-green-600" : "text-red-600"
          }`}
        >
          {message}
        </div>
      )}

      {cart.length === 0 ? (
        <p className="text-center text-gray-500">Your cart is empty.</p>
      ) : (
        <>
          <table className="w-full mb-4">
            <thead>
              <tr className="border-b text-left">
                <th className="py-2">Product</th>
                <th>Qty</th>
                <th>Price</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.id} className="border-b">
                  <td className="py-2">{item.name}</td>
                  <td>{item.quantity}</td>
                  <td>₹{(item.price * item.quantity).toFixed(2)}</td>
                  <td>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:underline"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="text-right font-semibold mb-4">
            Total: ₹{total.toFixed(2)}
          </div>

          <button
            onClick={handleCheckout}
            className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700 transition"
          >
            Checkout
          </button>
        </>
      )}
    </div>
  );
};

export default Cart;
