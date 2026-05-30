const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const connectDB = require("./config/db");
const Product = require("./models/Product");
const User = require("./models/User");
const Order = require("./models/Order");
dotenv.config();
connectDB();
const app = express();
app.use(express.json());
app.use(cors());
// --- AUTHENTICATION MIDDLEWARE ---
const protect = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET || "fallback_secret");
            req.user = await User.findById(decoded.id).select("-password");
            next();
        } catch (error) {
            res.status(401).json({ message: "Not authorized, token failed" });
        }
    }
    if (!token) res.status(401).json({ message: "Not authorized, no token" });
};
// --- PRODUCT ROUTES ---
app.get("/api/products", async (req, res) => {
    const products = await Product.find({});
    res.json(products);
});
app.get("/api/products/:id", async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) res.json(product);
    else res.status(404).json({ message: "Product not found" });
});
// --- USER ROUTES (REGISTRATION & LOGIN) ---
app.post("/api/users/register", async (req, res) => {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "User already exists" });
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await User.create({ name, email, password: hashedPassword });
    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: jwt.sign({ id: user._id }, process.env.JWT_SECRET || "fallback_secret", { expiresIn: "30d" })
        });
    } else {
        res.status(400).json({ message: "Invalid user data" });
    }
});
app.post("/api/users/login", async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: jwt.sign({ id: user._id }, process.env.JWT_SECRET || "fallback_secret", { expiresIn: "30d" })
        });
    } else {
        res.status(401).json({ message: "Invalid email or password" });
    }
});
// --- ORDER ROUTE ---
app.post("/api/orders", protect, async (req, res) => {
    const { orderItems, shippingAddress, totalPrice } = req.body;
    if (orderItems && orderItems.length === 0) {
        return res.status(400).json({ message: "No order items" });
    }
    const order = new Order({
        user: req.user._id,
        orderItems,
        shippingAddress,
        totalPrice
    });
    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
