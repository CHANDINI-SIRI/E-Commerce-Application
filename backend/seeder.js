const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./models/Product");
const connectDB = require("./config/db");
dotenv.config();
connectDB();
const sampleProducts = [
    {
        name: "Premium Wireless Headphones",
        description: "High-quality sound with active noise cancellation and 30-hour battery life.",
        price: 199.99,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
        category: "Electronics",
        countInStock: 10
    },
    {
        name: "Minimalist Leather Watch",
        description: "Elegant quartz watch with a genuine leather strap and scratch-resistant glass.",
        price: 149.50,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
        category: "Accessories",
        countInStock: 7
    },
    {
        name: "Ergonomic Mechanical Keyboard",
        description: "RGB backlit mechanical keyboard with tactile switches for ultimate typing comfort.",
        price: 89.99,
        image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500",
        category: "Electronics",
        countInStock: 5
    }
];
const importData = async () => {
    try {
        await Product.deleteMany();
        await Product.insertMany(sampleProducts);
        console.log("Data successfully imported to MongoDB!");
        process.exit();
    } catch (error) {
        console.error(`Error importing data: ${error.message}`);
        process.exit(1);
    }
};
importData();
