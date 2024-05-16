const User = require('../models/User'); // import your User model
const Order = require('../models/Order');

const validator = require('validator');

//get orders of user

exports.getUserOrders = async (req, res) => {
    try {
        const orders = await Order.find({ userid: req.user.id }).populate('products');
        return res.status(200).json({
            success: true,
            orders
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

//create order
exports.createOrder = async (req, res) => {

    const { receiverName, email, address, totalPrice, phoneNumber, products } = req.body;
    const { id } = req.user;
    try {
        //validate data
        if (!id || !receiverName || !email || !address || !totalPrice || !phoneNumber || !products) {
            return res.status(400).json({
                success: false,
                message: 'Please fill all fields'
            });
        }

        //validate number
        if (!validator.isMobilePhone(phoneNumber)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid phone number'
            });
        }
        //create order
        await Order.create({
            userid: id,
            receiverName,
            email,
            address,
            totalPrice,
            phoneNumber,
            products,
        })
        //update user cart
        const existeduser = await User.findByIdAndUpdate(
            id,
            { $set: { cart: [] } },
            { new: true }
        ).populate('cart');

        //return response
        return res.status(201).json({
            success: true,
            message: 'Order created successfully',
            existeduser
        });
    } catch (error) {
        console.error(error);
        return res.status(400).json({
            success: false,
            message: 'server error',
        });
    }
};


// Add to cart
exports.addToCart = async (req, res) => {
    const { productId } = req.body;
    const { id } = req.user;
    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
        //push product in cart
        user.cart.push(productId);

        await user.save();

        const updatedUser = await User.findById(id).populate('cart');
        updatedUser.password = undefined;
        return res.status(200).json({
            success: true,
            message: 'Product added to cart successfully',
            existeduser: updatedUser
        });

    } catch (error) {
        console.error(error);
        //return
        res.status(500).json({
            success: false,
            message: 'server error'
        });
    }
};

// remove from cart
exports.removeFromCart = async (req, res) => {
    const { productId } = req.body;
    const { id } = req.user;
    const trimproid = productId.trim();

    try {
        const user = await User.findByIdAndUpdate(id, {
            $pull: { cart: trimproid }
        }, { new: true }).populate('cart');

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Product removed from cart successfully',
            existeduser: user
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'something went wrong inside removefromCart try block'
        });
    }
};

//get cart of user
exports.getCart = async (req, res) => {
    const { id } = req.user;

    try {
        const user = await User.findById(id).populate('cart');
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        return res.status(200).json({
            success: true,
            cart: user.cart
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};