import React, { useState } from "react";
import axios from "axios";

function Auth() {
    const [isLogin, setIsLogin] = useState(true); // toggle form
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "FARMER",
    });
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setResponse(null);
        setError(null);

        const url = isLogin
            ? "http://localhost:8080/api/auth/login"
            : "http://localhost:8080/api/auth/register";

        // Prepare payload based on form
        const payload = isLogin
            ? { email: formData.email, password: formData.password }
            : formData;

        try {
            const res = await axios.post(url, payload);
            setResponse(res.data);
        } catch (err) {
            if (err.response) {
                setError(err.response.data);
            } else {
                setError("Network error");
            }
        }
    };

    return (
        <div style={{ maxWidth: 400, margin: "auto", padding: 20 }}>
            <h2>{isLogin ? "Login" : "Register"}</h2>
            <form onSubmit={handleSubmit}>
                {!isLogin && (
                    <>
                        <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            style={{ width: "100%", marginBottom: 10, padding: 8 }}
                        />
                        <select
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            style={{ width: "100%", marginBottom: 10, padding: 8 }}
                        >
                            <option value="FARMER">Farmer</option>
                            <option value="DISTRIBUTOR">Distributor</option>
                            <option value="CUSTOMER">Customer</option>
                        </select>
                    </>
                )}
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    style={{ width: "100%", marginBottom: 10, padding: 8 }}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    style={{ width: "100%", marginBottom: 10, padding: 8 }}
                />

                <button
                    type="submit"
                    style={{
                        width: "100%",
                        padding: 10,
                        backgroundColor: "#4CAF50",
                        color: "white",
                        border: "none",
                    }}
                >
                    {isLogin ? "Login" : "Register"}
                </button>
            </form>

            <button
                onClick={() => {
                    setIsLogin(!isLogin);
                    setResponse(null);
                    setError(null);
                }}
                style={{
                    marginTop: 10,
                    background: "none",
                    border: "none",
                    color: "blue",
                    cursor: "pointer",
                }}
            >
                {isLogin ? "Create an account" : "Have an account? Login"}
            </button>

            <div style={{ marginTop: 20 }}>
                {response && (
                    <pre
                        style={{
                            backgroundColor: "#f4f4f4",
                            padding: 10,
                            whiteSpace: "pre-wrap",
                            wordWrap: "break-word",
                        }}
                    >
            {JSON.stringify(response, null, 2)}
          </pre>
                )}
                {error && (
                    <pre
                        style={{
                            backgroundColor: "#fdd",
                            padding: 10,
                            whiteSpace: "pre-wrap",
                            wordWrap: "break-word",
                            color: "red",
                        }}
                    >
            {typeof error === "string" ? error : JSON.stringify(error, null, 2)}
          </pre>
                )}
            </div>
        </div>
    );
}

export default Auth;
