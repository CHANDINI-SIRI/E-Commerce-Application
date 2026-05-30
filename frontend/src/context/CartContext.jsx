import React, { createContext, useState, useContext } from "react";
const CartContext = createContext();
export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    // Function to add item to cart
    const addToCart = (product) => {
        setCartItems((prevItems) => {
            const itemExists = prevItems.find((item) => item._id === product._id);
            if (itemExists) {
                // If item exists, increase its quantity
                return prevItems.map((item) =>
                    item._id === product._id ? { ...item, qty: item.qty + 1 } : item
                );
            }
            // If item is new, add it to the array with a qty of 1
            return [...prevItems, { ...product, qty: 1 }];
        });
    };
    // Function to clear cart after checkout
    const clearCart = () => setCartItems([]);
    return (
        <CartContext.Provider value={{ cartItems, addToCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};
// Custom hook to make using cart context easy in other files
export const useCart = () => useContext(CartContext);
