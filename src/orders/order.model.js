const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    address: {
        city: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        zipcode: String,
        country: {
            type: String,
            required: true
        },
    },
    phone: {
        type: Number,
        required: true
    },
    productIds: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Books'
        }
    ],
    totalPrice:{
        type: Number,
        required: true
    }
}, {
    timestamps: true
})

const Order = mongoose.model('Orders', orderSchema);
module.exports = Order