import { useState } from "react";
import axios from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import { saveAuth } from "../utils/auth";

const Register = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "", role: "BUYER" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("/auth/register", formData);
      saveAuth(response.data.token, formData.role);

      if (formData.role === "BUYER") {
        navigate("/buyer/dashboard");
      } else {
        navigate("/farmer/dashboard");
      }
    } catch (err) {
      setError("Registration failed");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-md p-6 mt-10 rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
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
          type="text"
          name="name"
          placeholder="Full Name"
          required
          className="w-full p-2 border rounded"
          value={formData.name}
          onChange={handleChange}
        />
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
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
