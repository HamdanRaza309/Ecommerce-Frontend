const mongoose = require('mongoose');
const { Schema } = mongoose;

const ReviewSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    name: {
        type: String
    },
    ratings: {
        type: Number,
        required: true
    },
    comment: {
        type: String,
        required: true

    }
});

const ProductSchema = new Schema({
    name: {
        type: String,
        required: true

    },
    description: {
        type: String,
        required: true

    },
    price: {
        type: Number,
        required: true

    },
    images: [{
        type: String,
        required: true

    }],
    category: {
        type: String,
        required: true

    },
    subCategory: {
        type: String,
        required: true

    },
    sizes: [{
        type: String,
        required: true

    }],
    numOfReviews: {
        type: Number,
        default: 0

    },
    reviews: [ReviewSchema],
    ratings: {
        type: Number,
        default: 0

    },
    date: {
        type: Date,
        default: Date.now

    },
    bestseller: {
        type: Boolean,
        default: false

    }
});

module.exports = mongoose.model('Product', ProductSchema);
