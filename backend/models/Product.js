const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProductSchema = new Schema({
    _id: {
        type: String,
        required: true
    },
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
    // image: [{
    //     type: String,
    //     required: true
    // }],
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