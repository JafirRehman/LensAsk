const mongoose = require('mongoose');

// product schema
const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Product Name is required'],
        trim: true,
        maxlength: [120, 'Product Name Must Be Less Than 120 characters!'],
    },
    price: {
        type: String,
        required: [true, 'Product Price is required'],
    },
    description: {
        type: String,
        required: [true, 'Please Provide Description Of Product!'],
    },
    image:{
        type:String,
        required:[true,'please provide image of product']
    },
    category: {
        type: String,
        required: [true, 'Please Select A Catgory Of Product'],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// export model
const Product = mongoose.model('Product', productSchema);
module.exports = Product;
