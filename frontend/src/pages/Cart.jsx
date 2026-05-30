import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
const Cart = () => {
    const { cartItems, removeFromCart, updateQty } = useCart();
    const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
    const glassPanelStyle = {
        maxWidth: "800px",
        margin: "40px auto",
        background: "rgba(255, 255, 255, 0.03)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "1px solid rgba(255, 255, 255, 0.08)",
        padding: "30px",
        borderRadius: "20px",
        boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
        textAlign: "left"
    };
    const itemRowStyle = {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "15px 0",
        borderBottom: "1px solid rgba(255, 255, 255, 0.05)"
    };
    const selectStyle = {
        background: "rgba(255, 255, 255, 0.05)",
        color: "#fff",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        padding: "5px 10px",
        borderRadius: "6px",
        outline: "none"
    };
    const btnStyle = {
        background: "linear-gradient(135deg, #ec4899 0%, #d946ef 100%)",
        color: "#fff",
        border: "none",
        padding: "12px 24px",
        borderRadius: "10px",
        cursor: "pointer",
        fontWeight: "bold",
        textDecoration: "none",
        display: "inline-block",
        textAlign: "center",
        marginTop: "20px",
        boxShadow: "0 4px 15px rgba(236, 72, 153, 0.3)"
    };
    return (
        <div style={glassPanelStyle}>
            <h2 style={{ fontWeight: "400", margin: 0 }}>Shopping Cart</h2>
            <hr style={{ border: "0", borderTop: "1px solid rgba(255,255,255,0.1)", margin: "20px 0" }} />
            {cartItems.length === 0 ? (
                <p style={{ color: "#cbd5e1" }}>Your cart is empty. <Link to="/" style={{ color: "#a5b4fc" }}>Go Shopping</Link></p>
            ) : (
                <div>
                    {cartItems.map((item) => (
                        <div key={item._id} style={itemRowStyle}>
                            <img src={item.image} alt={item.name} style={{ width: "60px", height: "60px", objectFit: "contain", borderRadius: "8px", background: "rgba(255,255,255,0.02)" }} />
                            <div style={{ flex: 1, marginLeft: "20px" }}>
                                <h4 style={{ margin: "0 0 5px 0", fontWeight: "500" }}>{item.name}</h4>
                                <span style={{ color: "#cbd5e1", fontWeight: "bold" }}>${item.price}</span>
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                                <select value={item.qty} onChange={(e) => updateQty(item._id, Number(e.target.value))} style={selectStyle}>
                                    {[...Array(5).keys()].map((x) => (
                                        <option key={x + 1} value={x + 1} style={{ background: "#1e1b4b" }}>{x + 1}</option>
                                    ))}
                                </select>
                                <button onClick={() => removeFromCart(item._id)} style={{ background: "none", border: "none", color: "#f87171", cursor: "pointer", fontSize: "14px" }}>Remove</button>
                            </div>
                        </div>
                    ))}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "30px", paddingTop: "20px", borderTop: "1px solid rgba(255,255,255,0.1)" }}>
                        <h3>Subtotal: <span style={{ color: "#f472b6" }}>${totalPrice.toFixed(2)}</span></h3>
                        <Link to="/checkout" style={btnStyle}>Proceed to Checkout</Link>
                    </div>
                </div>
            )}
        </div>
    );
};
export default Cart;
