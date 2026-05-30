import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setError("");
            await axios.post("http://localhost:5000/api/users/register", { name, email, password });
            navigate("/login");
        } catch (err) {
            setError(`Error: ${err.response?.data?.message || err.message}`);
        }
    };
    return (
        <div style={{ maxWidth: "400px", margin: "50px auto", background: "#fff", padding: "30px", borderRadius: "8px", boxShadow: "0 2px 5px rgba(0,0,0,0.1)", textAlign: "center" }}>
            <h2>Create an Account</h2>
            {error && <p style={{ color: "red", fontWeight: "bold", background: "#ffebee", padding: "10px", borderRadius: "4px" }}>{error}</p>}
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} required style={{ padding: "10px", borderRadius: "4px", border: "1px solid #ccc" }} />
                <input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ padding: "10px", borderRadius: "4px", border: "1px solid #ccc" }} />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required style={{ padding: "10px", borderRadius: "4px", border: "1px solid #ccc" }} />
                <button type="submit" style={{ background: "#28a745", color: "#fff", border: "none", padding: "12px", borderRadius: "4px", cursor: "pointer", fontWeight: "bold" }}>Sign Up</button>
            </form>
            <p style={{ marginTop: "20px", fontSize: "14px" }}>Already have an account? <Link to="/login" style={{ color: "#007bff", textDecoration: "none" }}>Log In</Link></p>
        </div>
    );
};
export default Register;
