const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    receiverName: {
        type: String,
        required: true
    },
    email:{
        type:String,
        required:true
    },
    address: {
        type: String,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }]
});

const Order = mongoose.model('Order', OrderSchema);
module.exports = Order;