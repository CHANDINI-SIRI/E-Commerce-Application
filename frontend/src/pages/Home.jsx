import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Home = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            // This safely reads the environment variable we will set up in Vercel later
            const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
            const { data } = await axios.get(`${baseUrl}/api/products`);
            setProducts(data);
        };
        fetchProducts();
    }, []);

    const containerStyle = {
        maxWidth: "1200px",
        margin: "40px auto",
        padding: "0 20px"
    };

    const gridStyle = {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
        gap: "30px",
        marginTop: "30px"
    };

    const cardStyle = {
        background: "rgba(255, 255, 255, 0.03)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        border: "1px solid rgba(255, 255, 255, 0.08)",
        borderRadius: "16px",
        padding: "20px",
        textAlign: "center",
        boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.3)"
    };

    const imgStyle = {
        width: "100%",
        height: "200px",
        objectFit: "contain",
        borderRadius: "12px",
        background: "rgba(255,255,255,0.02)",
        padding: "10px",
        marginBottom: "15px"
    };

    const btnStyle = {
        background: "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)",
        color: "#fff",
        border: "none",
        padding: "10px 20px",
        borderRadius: "8px",
        cursor: "pointer",
        fontWeight: "600",
        textDecoration: "none",
        display: "inline-block",
        marginTop: "10px",
        boxShadow: "0 4px 15px rgba(99, 102, 241, 0.3)"
    };

    return (
        <div style={containerStyle}>
            <h2 style={{ textAlign: "left", fontWeight: "300", letterSpacing: "1px" }}>Featured Products</h2>
            <div style={gridStyle}>
                {products.map((product) => (
                    <div key={product._id} style={cardStyle} className="glass-card">
                        <img src={product.image} alt={product.name} style={imgStyle} />
                        <h3 style={{ fontSize: "18px", margin: "10px 0", fontWeight: "500" }}>{product.name}</h3>
                        <p style={{ color: "#cbd5e1", fontWeight: "bold", fontSize: "16px" }}>${product.price}</p>
                        <Link to={`/product/${product._id}`} style={btnStyle}>View Details</Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;