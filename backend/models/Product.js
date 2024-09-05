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

    },
    date: {
        type: String,
        default: function () {
            const currentDate = new Date();
            const minutes = currentDate.getMinutes();
            const hours = currentDate.getHours();
            const day = currentDate.getDate();
            const month = currentDate.getMonth() + 1;
            const year = currentDate.getFullYear();

            return `${hours}:${minutes > 10 ? '' : 0}${minutes} ${day}/${month}/${year}`

        }
    },
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
        type: String,
        default: function () {
            const currentDate = new Date();
            const minutes = currentDate.getMinutes();
            const hours = currentDate.getHours();
            const day = currentDate.getDate();
            const month = currentDate.getMonth() + 1;
            const year = currentDate.getFullYear();

            return `${hours}:${minutes > 10 ? '' : 0}${minutes} ${day}/${month}/${year}`

        }
    },
    bestseller: {
        type: Boolean,
        default: false

    }
});

module.exports = mongoose.model('Product', ProductSchema);
