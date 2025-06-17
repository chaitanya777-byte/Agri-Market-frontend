import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import FarmerDashboard from "./components/FarmerDashboard";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/farmer" element={<FarmerDashboard />} />
            </Routes>
        </Router>
    );
}

export default App;
