const express = require('express');
const Product = require('../models/Product');
const fetchuser = require('../middleware/fetchuser');
const router = express.Router();

const isAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        return res.status(403).json({ message: 'Access denied: Admins only' });
    }
};

// Route: Get all products (Public)
router.get('/products', async (req, res) => {
    try {
        const products = await Product.find();
        return res.status(200).json(products);
    } catch (error) {
        return res.status(500).json({ message: 'Error fetching products', error: error.message });
    }
});

// Route: Get a single product by ID (Public)
router.get('/product/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        return res.status(200).json(product);
    } catch (error) {
        return res.status(500).json({ message: 'Error fetching product', error: error.message });
    }
});

// Route: Add a new product (Admin only)
router.post('/addproduct', fetchuser, isAdmin, async (req, res) => {
    const { name, ...otherDetails } = req.body;

    try {
        const existingProduct = await Product.findOne({ name });

        if (existingProduct) {
            return res.status(400).json({ message: 'A product with the same name already exists' });
        }

        const newProduct = new Product({ name, ...otherDetails });
        await newProduct.save();

        return res.status(201).json({ message: 'Product added successfully', product: newProduct });
    } catch (error) {
        return res.status(500).json({ message: 'Error adding product', error: error.message });
    }
});

// Route: Delete a product by ID (Admin only)
router.delete('/deleteproduct/:id', fetchuser, isAdmin, async (req, res) => {
    const { id } = req.params;

    try {
        const deletedProduct = await Product.findByIdAndDelete(id);

        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        return res.status(200).json({ message: 'Product deleted successfully', product: deletedProduct });
    } catch (error) {
        return res.status(500).json({ message: 'Error deleting product', error: error.message });
    }
});

// Route: Update a product by ID (Admin only)
router.put('/updateproduct/:id', fetchuser, isAdmin, async (req, res) => {
    const { id } = req.params;

    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, req.body, { new: true });

        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        return res.status(200).json({ message: 'Product updated successfully', product: updatedProduct });
    } catch (error) {
        return res.status(500).json({ message: 'Error updating product', error: error.message });
    }
});

module.exports = router;
