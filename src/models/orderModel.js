const mongoose = require('mongoose');
const {Schema} = mongoose;
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
        }
    },

    tables: {
        id: {
            type: Number,
            required: required
        },
        date: {
            type: Date,
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
        id: {
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
        rating: {
            type: Number,
            default: 3
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
    }
}, 
{collection: 'orders'}
);

module.exports = mongoose.model('Order', OrderSchema);