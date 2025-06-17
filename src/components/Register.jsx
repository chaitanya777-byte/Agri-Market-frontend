import React, { useState } from "react";
import api from "../api/api";

export default function Register() {
    const [form, setForm] = useState({ username: "", password: "", role: "FARMER" });

    const handleSubmit = async (e) => {
        e.preventDefault();
        await api.post("/auth/register", form);
        alert("Registered! Please login.");
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Register</h2>
            <input placeholder="Username" onChange={e => setForm({ ...form, username: e.target.value })} />
            <input type="password" placeholder="Password" onChange={e => setForm({ ...form, password: e.target.value })} />
            <select onChange={e => setForm({ ...form, role: e.target.value })}>
                <option>FARMER</option>
                <option>DISTRIBUTOR</option>
                <option>CUSTOMER</option>
            </select>
            <button type="submit">Register</button>
        </form>
    );
}
