const express = require('express');
const Product = require('../models/Product');
const fetchuser = require('../middleware/fetchuser');
const router = express.Router();

router.get('/products/:id/fetchreviews', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        res.status(200).json({ success: true, reviews: product.reviews });
    } catch (error) {
        console.error("Error occurred:", error);
        if (error.name === 'CastError') {
            res.status(400).json({ success: false, message: "Invalid Product ID" });
        } else {
            res.status(500).json({ success: false, message: "Server Error", error: error.message });
        }
    }
});

router.post('/products/:id/addreview', fetchuser, async (req, res) => {
    try {
        const { id } = req.params;
        const { ratings, comment } = req.body;

        // Validate input
        if (!ratings || !comment || !id) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        if (ratings < 1 || ratings > 5) {
            return res.status(400).json({ success: false, message: "Ratings should be between 1 and 5" });
        }

        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        const review = {
            user: req.user.id,
            name: req.user.name,
            ratings: Number(ratings),
            comment: comment
        };

        const existingReviewIndex = product.reviews.findIndex(
            (r) => r.user.toString() === req.user.id.toString()
        );

        if (existingReviewIndex > -1) {
            // Update the existing review
            product.reviews[existingReviewIndex] = review;
        } else {
            // Add the new review
            product.reviews.push(review);
            product.numOfReviews = product.reviews.length;
        }

        // Calculate the new average rating
        const totalRatings = product.reviews.reduce((acc, item) => item.ratings + acc, 0);
        product.ratings = product.reviews.length > 0 ? totalRatings / product.reviews.length : 0;

        await product.save();
        res.status(200).json({ success: true, message: "Review submitted successfully", review: review });
    } catch (error) {
        console.error("Error occurred:", error);
        if (error.name === 'CastError') {
            res.status(400).json({ success: false, message: "Invalid Product ID" });
        } else {
            res.status(500).json({ success: false, message: "Server Error", error: error.message });
        }
    }
});

router.put('/products/:id/updatereview/:reviewId', fetchuser, async (req, res) => {
    try {
        const { ratings, comment } = req.body;

        // Validate input
        if (!ratings || !comment) {
            return res.status(400).json({ success: false, message: "Ratings and comment are required" });
        }

        if (ratings < 1 || ratings > 5) {
            return res.status(400).json({ success: false, message: "Ratings should be between 1 and 5" });
        }

        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        const reviewIndex = product.reviews.findIndex(
            (r) => r._id.toString() === req.params.reviewId.toString() && r.user.toString() === req.user.id.toString()
        );

        if (reviewIndex === -1) {
            return res.status(404).json({ success: false, message: "Review not found or you're not authorized" });
        }

        product.reviews[reviewIndex].ratings = Number(ratings);
        product.reviews[reviewIndex].comment = comment;

        // Recalculate the average rating
        const totalRatings = product.reviews.reduce((acc, item) => item.ratings + acc, 0);
        product.ratings = product.reviews.length > 0 ? totalRatings / product.reviews.length : 0;

        await product.save();
        res.status(200).json({ success: true, message: "Review updated successfully" });
    } catch (error) {
        console.error("Error occurred:", error);
        if (error.name === 'CastError') {
            res.status(400).json({ success: false, message: "Invalid Product ID or Review ID" });
        } else {
            res.status(500).json({ success: false, message: "Server Error", error: error.message });
        }
    }
});


router.delete('/products/:id/deletereview/:reviewId', fetchuser, async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        const reviewIndex = product.reviews.findIndex(
            (r) => r._id.toString() === req.params.reviewId.toString() && r.user.toString() === req.user.id.toString()
        );

        if (reviewIndex === -1) {
            return res.status(404).json({ success: false, message: "Review not found or you're not authorized" });
        }

        product.reviews.splice(reviewIndex, 1);
        product.numOfReviews = product.reviews.length;

        // Recalculate the average rating
        const totalRatings = product.reviews.reduce((acc, item) => item.ratings + acc, 0);
        product.ratings = product.reviews.length > 0 ? totalRatings / product.reviews.length : 0;

        await product.save();
        res.status(200).json({ success: true, message: "Review deleted successfully" });
    } catch (error) {
        console.error("Error occurred:", error);
        if (error.name === 'CastError') {
            res.status(400).json({ success: false, message: "Invalid Product ID or Review ID" });
        } else {
            res.status(500).json({ success: false, message: "Server Error", error: error.message });
        }
    }
});


module.exports = router;