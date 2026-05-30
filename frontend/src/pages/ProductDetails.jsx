import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import axios from "axios";
const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const { data } = await axios.get(`http://localhost:5000/api/products/${id}`);
                setProduct(data);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);
    const containerStyle = {
        maxWidth: "900px",
        margin: "50px auto",
        padding: "0 20px"
    };
    const glassPanelStyle = {
        background: "rgba(255, 255, 255, 0.03)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "1px solid rgba(255, 255, 255, 0.08)",
        borderRadius: "24px",
        padding: "40px",
        boxShadow: "0 10px 40px rgba(0, 0, 0, 0.4)",
        display: "flex",
        gap: "40px",
        alignItems: "center",
        flexWrap: "wrap",
        textAlign: "left"
    };
    const imgStyle = {
        flex: "1",
        minWidth: "280px",
        height: "350px",
        objectFit: "contain",
        borderRadius: "16px",
        background: "rgba(255, 255, 255, 0.02)",
        padding: "20px",
        border: "1px solid rgba(255, 255, 255, 0.05)"
    };
    const contentStyle = {
        flex: "1.2",
        minWidth: "280px",
        display: "flex",
        flexDirection: "column",
        gap: "15px"
    };
    const btnStyle = {
        background: "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)",
        color: "#fff",
        border: "none",
        padding: "14px 28px",
        borderRadius: "12px",
        cursor: "pointer",
        fontWeight: "bold",
        fontSize: "16px",
        alignSelf: "flex-start",
        marginTop: "10px",
        boxShadow: "0 4px 20px rgba(99, 102, 241, 0.4)"
    };
    const backLinkStyle = {
        color: "#a5b4fc",
        textDecoration: "none",
        display: "inline-block",
        marginBottom: "20px",
        fontSize: "15px"
    };
    if (loading) return <h3 style={{ marginTop: "100px", color: "#fff" }}>Loading item description...</h3>;
    if (!product) return <h3 style={{ marginTop: "100px", color: "red" }}>Product Not Found</h3>;
    return (
        <div style={containerStyle}>
            <Link to="/" style={backLinkStyle}>? Back to Products</Link>
            <div style={glassPanelStyle}>
                <img src={product.image} alt={product.name} style={imgStyle} />
                <div style={contentStyle}>
                    <h2 style={{ fontSize: "28px", margin: 0, fontWeight: "400", letterSpacing: "0.5px" }}>{product.name}</h2>
                    <p style={{ color: "#f472b6", fontSize: "24px", fontWeight: "bold", margin: 0 }}>${product.price}</p>
                    <hr style={{ border: "0", borderTop: "1px solid rgba(255, 255, 255, 0.1)", margin: "10px 0" }} />
                    <p style={{ color: "#cbd5e1", lineHeight: "1.6", margin: 0 }}>
                        Experience premium luxury build quality with our top-tier flagship model. 
                        Designed carefully for maximum comfort, utility durability, and peak efficiency benchmarks.
                    </p>
                    <button 
                        onClick={() => {
                            addToCart(product);
                            alert("Added to shopping cart!");
                            navigate("/cart");
                        }} 
                        style={btnStyle}
                    >
                        Add to Basket
                    </button>
                </div>
            </div>
        </div>
    );
};
export default ProductDetails;
