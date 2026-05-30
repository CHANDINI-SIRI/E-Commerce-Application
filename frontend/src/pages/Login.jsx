import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Verify profile data match via database verification endpoints
            const { data } = await axios.post("http://localhost:5000/api/users/login", { email, password });
            // Temporarily store our user details session metadata inside the browser
            localStorage.setItem("userInfo", JSON.stringify(data));
            navigate("/"); // Boot them straight back to the Product Catalog dashboard on success!
        } catch (err) {
            setError(err.response?.data?.message || "Invalid email or password");
        }
    };
    return (
        <div style={{ maxWidth: "400px", margin: "50px auto", background: "#fff", padding: "30px", borderRadius: "8px", boxShadow: "0 2px 5px rgba(0,0,0,0.1)", textAlign: "center" }}>
            <h2>Sign In</h2>
            {error && <p style={{ color: "red", fontWeight: "bold" }}>{error}</p>}
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                <input 
                    type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} required
                    style={{ padding: "10px", borderRadius: "4px", border: "1px solid #ccc" }}
                />
                <input 
                    type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required
                    style={{ padding: "10px", borderRadius: "4px", border: "1px solid #ccc" }}
                />
                <button type="submit" style={{ background: "#007bff", color: "#fff", border: "none", padding: "12px", borderRadius: "4px", cursor: "pointer", fontWeight: "bold" }}>
                    Log In
                </button>
            </form>
            <p style={{ marginTop: "20px", fontSize: "14px" }}>
                New Customer? <Link to="/register" style={{ color: "#28a745", textDecoration: "none" }}>Create an Account</Link>
            </p>
        </div>
    );
};
export default Login;
