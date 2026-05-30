import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
const Navbar = () => {
    const { cartItems } = useCart();
    const navigate = useNavigate();
    const userInfo = localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null;
    const handleLogout = () => {
        localStorage.removeItem("userInfo");
        navigate("/login");
    };
    const navStyle = {
        position: "sticky",
        top: 0,
        zIndex: 1000,
        background: "rgba(255, 255, 255, 0.05)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
        padding: "15px 30px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
    };
    const logoStyle = {
        color: "#fff",
        textDecoration: "none",
        fontSize: "22px",
        fontWeight: "bold",
        letterSpacing: "1px",
        textShadow: "0 0 10px rgba(255,255,255,0.2)"
    };
    const linkStyle = {
        color: "rgba(255,255,255,0.8)",
        textDecoration: "none",
        marginRight: "20px",
        fontSize: "15px",
        fontWeight: "500"
    };
    const btnStyle = {
        background: "rgba(255, 255, 255, 0.1)",
        color: "#fff",
        border: "1px solid rgba(255, 255, 255, 0.2)",
        padding: "6px 14px",
        borderRadius: "20px",
        cursor: "pointer",
        backdropFilter: "blur(4px)"
    };
    return (
        <nav style={navStyle}>
            <Link to="/" style={logoStyle}>? E-Shop</Link>
            <div style={{ display: "flex", alignItems: "center" }}>
                <Link to="/cart" style={linkStyle}>
                    Cart <span style={{ background: "#ff007f", color: "#fff", padding: "2px 8px", borderRadius: "10px", fontSize: "12px", marginLeft: "4px" }}>{cartItems.reduce((acc, item) => acc + item.qty, 0)}</span>
                </Link>
                {userInfo ? (
                    <>
                        <span style={{ color: "#a5b4fc", marginRight: "15px", fontSize: "14px" }}>Hi, {userInfo.name}</span>
                        <button onClick={handleLogout} style={btnStyle}>Logout</button>
                    </>
                ) : (
                    <Link to="/login" style={linkStyle}>Sign In</Link>
                )}
            </div>
        </nav>
    );
};
export default Navbar;
