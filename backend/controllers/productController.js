const Product = require("../models/Product");
// @desc    Fetch all products
// @route   GET /api/products
const getProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};
// @desc    Create a product (Admin only later)
// @route   POST /api/products
const createProduct = async (req, res) => {
    try {
        const { name, description, price, image, category, countInStock } = req.body;
        const product = new Product({ name, description, price, image, category, countInStock });
        const createdProduct = await product.save();
        res.status(201).json(createdProduct);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};
module.exports = { getProducts, createProduct };
