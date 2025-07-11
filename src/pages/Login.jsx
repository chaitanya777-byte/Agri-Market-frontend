import { useState } from "react";
import axios from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import { saveAuth } from "../utils/auth";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "", role: "BUYER" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("/auth/login", formData);
      saveAuth(response.data.token, formData.role);

      // Navigate to respective dashboard
      if (formData.role === "BUYER") {
        navigate("/buyer/dashboard");
      } else {
        navigate("/farmer/dashboard");
      }
    } catch (err) {
      setError("Invalid credentials or server error");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-md p-6 mt-10 rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
      {error && <div className="text-red-500 mb-2">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="BUYER">Buyer</option>
          <option value="FARMER">Farmer</option>
        </select>
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          className="w-full p-2 border rounded"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          className="w-full p-2 border rounded"
          value={formData.password}
          onChange={handleChange}
        />
        <button type="submit" className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700 transition">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
