import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
const Header = () => {
    const { cartItems } = useCart();
    const navigate = useNavigate();
    // Check if a user is logged in by reading browser memory
    const userInfo = localStorage.getItem("userInfo") 
        ? JSON.parse(localStorage.getItem("userInfo")) 
        : null;
    const handleLogout = () => {
        localStorage.removeItem("userInfo"); // Wipe out the session token
        navigate("/login");
    };
    const cartCount = cartItems.reduce((acc, item) => acc + item.qty, 0);
    return (
        <header style={{ background: "#222", padding: "15px 30px", display: "flex", justifyContent: "space-between", alignItems: "center", color: "#fff" }}>
            <Link to="/" style={{ color: "#fff", textDecoration: "none", fontSize: "20px", fontWeight: "bold" }}>
                E-Shop
            </Link>
            <nav style={{ display: "flex", gap: "20px", alignItems: "center" }}>
                <Link to="/cart" style={{ color: "#fff", textDecoration: "none", display: "flex", alignItems: "center", gap: "5px" }}>
                    Cart <span style={{ background: "#dc3545", color: "#fff", borderRadius: "50%", padding: "2px 8px", fontSize: "12px", fontWeight: "bold" }}>{cartCount}</span>
                </Link>
                {userInfo ? (
                    <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
                        <span style={{ color: "#ffc107", fontWeight: "bold" }}>Hi, {userInfo.name}</span>
                        <button onClick={handleLogout} style={{ background: "transparent", color: "#fff", border: "1px solid #fff", padding: "5px 10px", borderRadius: "4px", cursor: "pointer" }}>
                            Logout
                        </button>
                    </div>
                ) : (
                    <Link to="/login" style={{ color: "#fff", textDecoration: "none" }}>Login</Link>
                )}
                <Link to="/admin" style={{ color: "#fff", textDecoration: "none" }}>Admin</Link>
            </nav>
        </header>
    );
};
export default Header;
