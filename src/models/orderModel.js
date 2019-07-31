const mongoose = require('mongoose');
const { Schema } = mongoose;
const required = 'has to be filled';

const OrderSchema = new Schema({
    restaurants: {
        _id: {
            type: mongoose.Types.ObjectId,
            required: required
        },
        name: {
            type: String,
            required: required
        },
        location: {
            type: String,
            required: 'location must be'
        },
        imageSrc: {
            type: String,
            required: 'image cannot be blank'
        }
    },

    tables: {
        id: {
            type: String,
            required: required
        },
        date: {
            type: String,
            required: required
        },
        time: {
            type: String,
            required: required
        },
        guests: {
            type: Number,
            default: 1
        }
    },
    dishes: [{
        _id: {
            type: mongoose.Types.ObjectId,
            required: required
        },
        name: {
            type: String,
            required: required,
        },
        image: {
            type: String,
            required: required
        },
        price: {
            type: Number,
            required: required
        },
        stars: {
            type: Number,
            default: 3
        },
        ratingUser: {
            type: Number,
            default: 0
        },
        totalPrice: {
            type: Number,
            default: 0
        },
        amount: {
            type: Number,
            default: 1
        }
    }],

    totalPrice: {
        type: Number,
        required: required
    },

    payment: {
        type: Boolean,
        required: required
    },

    userEmail: {
        type: String,
        default: null
    }
},
    { collection: 'orders' }
);

module.exports = mongoose.model('Order', OrderSchema);