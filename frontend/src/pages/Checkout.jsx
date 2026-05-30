import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import axios from "axios";
const Checkout = () => {
    const { cartItems, clearCart } = useCart();
    const navigate = useNavigate();
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
    const handlePlaceOrder = async (e) => {
        e.preventDefault();
        if (cartItems.length === 0) return alert("Your cart is completely empty!");
        setIsSubmitting(true);
        try {
            const userInfo = JSON.parse(localStorage.getItem("userInfo"));
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: userInfo ? `Bearer ${userInfo.token}` : ""
                }
            };
            const formattedOrderItems = cartItems.map(item => ({
                name: item.name,
                qty: item.qty,
                image: item.image,
                price: item.price,
                product: item._id
            }));
            const orderPayload = {
                orderItems: formattedOrderItems,
                shippingAddress: { address, city, postalCode },
                totalPrice: totalPrice
            };
            await axios.post("http://localhost:5000/api/orders", orderPayload, config);
            clearCart();
            alert("Order placed successfully!");
            navigate("/");
        } catch (err) {
            alert(`Order Failed: ${err.response?.data?.message || err.message}`);
        } finally {
            setIsSubmitting(false);
        }
    };
    const glassPanelStyle = {
        maxWidth: "600px",
        margin: "50px auto",
        background: "rgba(255, 255, 255, 0.03)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "1px solid rgba(255, 255, 255, 0.08)",
        padding: "40px",
        borderRadius: "24px",
        boxShadow: "0 10px 40px rgba(0,0,0,0.4)",
        textAlign: "left"
    };
    const inputStyle = {
        background: "rgba(255, 255, 255, 0.05)",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        padding: "12px 16px",
        borderRadius: "10px",
        color: "#fff",
        fontSize: "15px",
        outline: "none",
        width: "100%",
        marginTop: "6px"
    };
    const btnStyle = {
        background: "linear-gradient(135deg, #ec4899 0%, #d946ef 100%)",
        color: "#fff",
        border: "none",
        padding: "14px",
        borderRadius: "12px",
        cursor: "pointer",
        fontWeight: "bold",
        fontSize: "16px",
        marginTop: "20px",
        boxShadow: "0 4px 20px rgba(236, 72, 153, 0.3)"
    };
    return (
        <div style={glassPanelStyle}>
            <h2 style={{ fontWeight: "400", margin: 0 }}>Shipping & Checkout</h2>
            <hr style={{ border: "0", borderTop: "1px solid rgba(255,255,255,0.1)", margin: "20px 0" }} />
            <form onSubmit={handlePlaceOrder} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                <div>
                    <label style={{ fontSize: "14px", color: "#cbd5e1" }}>Delivery Address</label>
                    <input type="text" placeholder="123 Main St" value={address} onChange={(e) => setAddress(e.target.value)} required style={inputStyle} />
                </div>
                <div style={{ display: "flex", gap: "20px" }}>
                    <div style={{ flex: 1 }}>
                        <label style={{ fontSize: "14px", color: "#cbd5e1" }}>City</label>
                        <input type="text" placeholder="New York" value={city} onChange={(e) => setCity(e.target.value)} required style={inputStyle} />
                    </div>
                    <div style={{ flex: 1 }}>
                        <label style={{ fontSize: "14px", color: "#cbd5e1" }}>Postal Code</label>
                        <input type="text" placeholder="10001" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} required style={inputStyle} />
                    </div>
                </div>
                <div style={{ background: "rgba(255, 255, 255, 0.02)", padding: "20px", borderRadius: "14px", border: "1px solid rgba(255,255,255,0.05)", marginTop: "10px" }}>
                    <p style={{ display: "flex", justifyContent: "space-between", margin: 0, fontSize: "18px" }}>
                        <span style={{ color: "#cbd5e1" }}>Total Balance:</span>
                        <span style={{ fontWeight: "bold", color: "#f472b6" }}>${totalPrice.toFixed(2)}</span>
                    </p>
                </div>
                <button type="submit" disabled={isSubmitting} style={btnStyle}>
                    {isSubmitting ? "Processing Payment..." : "Confirm & Pay Now"}
                </button>
            </form>
        </div>
    );
};
export default Checkout;
