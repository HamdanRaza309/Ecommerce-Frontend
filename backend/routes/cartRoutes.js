const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const fetchuser = require('../middleware/fetchuser');

// Add an item to the cart
router.post('/add-to-cart', fetchuser, async (req, res) => {
    const { productId, productName, productSize, quantity, price } = req.body;
    const userId = req.user.id;

    try {
        let cartItem = await Cart.findOne({ productId, userId, productSize });

        if (cartItem) {
            cartItem.quantity += quantity;
            cartItem.price = (cartItem.price / (cartItem.quantity - quantity)) * cartItem.quantity;
        } else {
            cartItem = new Cart({
                userId,
                productId,
                productName,
                productSize,
                quantity,
                price: price * quantity,
            });
        }

        await cartItem.save();
        res.status(201).json(cartItem);
    } catch (error) {
        console.error('Failed to add item to cart:', error);
        res.status(500).json({ message: 'Failed to add item to cart', error });
    }
});

// Retrieve all cart items
router.get('/cart-items', fetchuser, async (req, res) => {
    const userId = req.user.id;

    try {
        const cartItems = await Cart.find({ userId }).populate('productId');
        res.status(200).json(cartItems);
    } catch (error) {
        console.error('Failed to retrieve cart items:', error);
        res.status(500).json({ message: 'Failed to retrieve cart items', error });
    }
});

// Update a cart item
router.put('/cart-item/update', fetchuser, async (req, res) => {
    const { cartItemId, quantity } = req.body;
    const userId = req.user.id;

    try {
        const cartItem = await Cart.findOne({ userId, _id: cartItemId });

        if (cartItem) {
            if (quantity > 0) {
                const unitPrice = cartItem.price / cartItem.quantity;
                cartItem.quantity = quantity;
                cartItem.price = unitPrice * quantity;

                const updatedItem = await cartItem.save();
                res.status(200).json({ message: 'Cart item updated successfully', updatedItem });
            } else {
                await cartItem.remove();
                res.status(200).json({ message: 'Cart item removed successfully' });
            }
        } else {
            res.status(404).json({ message: 'Cart item not found' });
        }
    } catch (error) {
        console.error('Error updating cart item:', error);
        res.status(500).json({ message: 'Failed to update cart item', error });
    }
});

// Delete a cart item
router.delete('/cart-item/delete/:id', fetchuser, async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;

    try {
        const cartItem = await Cart.findOneAndDelete({ _id: id, userId });

        if (cartItem) {
            res.status(200).json({ message: 'Cart item deleted successfully' });
        } else {
            res.status(404).json({ message: 'Cart item not found' });
        }
    } catch (error) {
        console.error('Failed to delete cart item:', error);
        res.status(500).json({ message: 'Failed to delete cart item', error });
    }
});

module.exports = router;
