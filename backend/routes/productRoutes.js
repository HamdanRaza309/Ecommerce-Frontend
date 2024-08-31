const express = require('express');
const Product = require('../models/Product');
const router = express.Router();

// Route: Add a new product
router.post('/addproduct', async (req, res) => {
    try {
        const { name } = req.body;

        // Check if a product with the same name, description or images already exists
        const existingProduct = await Product.findOne({
            name,
        });

        if (existingProduct) {
            return res.status(400).json({ message: 'A product with the same name already exists' });
        }

        // If no duplicate is found, save the new product
        const product = new Product(req.body);
        await product.save();
        res.status(201).json({ message: 'Product added successfully' });
    } catch (error) {
        res.status(400).json({ message: 'Error adding product', error });
    }
});



// Route: Delete a product by ID
router.delete('/deleteproduct/:id', async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'Product deleted successfully', product });
    } catch (error) {
        res.status(400).json({ message: 'Error deleting product', error });
    }
});

// Route: Update a product by ID
router.put('/updateproduct/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updatedProduct = await Product.findByIdAndUpdate(id, req.body, { new: true });

        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json({ message: 'Product updated successfully', updatedProduct });
    } catch (error) {
        res.status(400).json({ message: 'Error updating product', error });
    }
});

module.exports = router;
