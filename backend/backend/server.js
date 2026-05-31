const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const connectDB = require("../config/db");
const Product = require("../models/Product");
const User = require("../models/User");
const Order = require("../models/Order");
dotenv.config();
connectDB();
const app = express();
app.use(express.json());
app.use(cors());
// --- AUTOMATIC DATABASE IMAGE SEEDER ---
const seedProducts = async () => {
    try {
        const count = await Product.countDocuments();
        // If your database is empty or still has old local data, we wipe and seed clean web images
        if (count === 0 || count <= 3) {
            await Product.deleteMany({}); // Clears old broken data records
            const sampleProducts = [
                {
                    name: "Premium Headphones",
                    price: 99,
                    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
                    description: "High-fidelity sound with noise-canceling glassmorphic panels.",
                    countInStock: 10
                },
                {
                    name: "Minimalist Watch",
                    price: 149,
                    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
                    description: "Sleek and modern aesthetic to fit any design professional.",
                    countInStock: 7
                },
                {
                    name: "Mechanical Keyboard",
                    price: 89,
                    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500",
                    description: "Tactile clicks complete with RGB backlighting presets.",
                    countInStock: 5
                }
            ];
            await Product.insertMany(sampleProducts);
            console.log("Database successfully seeded with absolute internet image URLs!");
        }
    } catch (error) {
        console.error("Error seeding database:", error);
    }
};
seedProducts();
// Middleware: Check if logged in
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
// Middleware: Check if user is an Admin
const admin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(403).json({ message: "Not authorized as an admin" });
    }
};
// --- ROUTES ---
app.get("/api/products", async (req, res) => {
    const products = await Product.find({});
    res.json(products);
});
app.get("/api/products/:id", async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) res.json(product);
    else res.status(404).json({ message: "Product not found" });
});
app.post("/api/users/register", async (req, res) => {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "User already exists" });
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const isThisAdmin = email === "testadmin@gmail.com";
    const user = await User.create({ name, email, password: hashedPassword, isAdmin: isThisAdmin });
    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
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
            isAdmin: user.isAdmin,
            token: jwt.sign({ id: user._id }, process.env.JWT_SECRET || "fallback_secret", { expiresIn: "30d" })
        });
    } else {
        res.status(401).json({ message: "Invalid email or password" });
    }
});
app.post("/api/orders", protect, async (req, res) => {
    const { orderItems, shippingAddress, totalPrice } = req.body;
    if (orderItems && orderItems.length === 0) return res.status(400).json({ message: "No order items" });
    const order = new Order({ user: req.user._id, orderItems, shippingAddress, totalPrice });
    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
});
app.get("/api/orders", protect, admin, async (req, res) => {
    const orders = await Order.find({});
    res.json(orders);
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
