require("dotenv").config();
const { FOLDER_NAME } = process.env;
const { mailsender } = require('../utils/mailsender');
const Order = require("../models/Order");
const Product = require("../models/Product");
const { filesendtocloudinary } = require('../utils/filesendtocloudinary')
const Subscriber = require('../models/Subscriber')

// get all orders
exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find({}).sort({ createdAt: -1 }).populate('products.product');
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

//delete Product
exports.DeleteProduct = async (req, res) => {
    try {
        //get data
        const { ProductId } = req.body
        // Find the Product
        const delProduct = await Product.findById(ProductId)
        if (!delProduct) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            })
        }
        // Delete the Product
        await Product.findByIdAndDelete(ProductId)
        //return response
        return res.status(200).json({
            success: true,
            message: "Product deleted successfully",
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong inside deleteProduct try block",
        })
    }
}

// creating product
exports.createProduct = async (req, res) => {
    try {
        //get the data of product
        const {
            title,
            price,
            description,
            category,
        } = req.body;
        if (!req.files || !req.files.image) {
            return res.status(400).json({
                success: false,
                message: "No file was uploaded",
            });
        }
        // Get image from request files
        const image = req.files.image;

        //validate all data
        if (
            !title ||
            !price ||
            !description ||
            !category ||
            !image
        ) {
            return res.status(400).json({
                success: false,
                message: "All Fields are required",
            });
        }
        //upload image to cloudinary
        const result = await filesendtocloudinary(image, FOLDER_NAME)
        //create course
        const newProduct = await Product.create({
            title,
            price,
            description,
            image: result.secure_url,
            category,
        });
        //send mail to all subscribers
        try {
            const subscribers = await Subscriber.find({});
            for (let subscriber of subscribers) {
                await mailsender(subscriber.email, 'New product available', `<div style="background-color: #fff; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); border-radius: 0.5rem; padding: 1.5rem; margin: 1rem 0.5rem; max-width: 20rem; margin: auto;">
                <img alt="New Product Arrived" src=${newProduct.image} style="display: block; width:200px; height:200px"/>
                <h2 style="font-size: 1.25rem; font-weight: bold; color: #333; margin-bottom: 0.5rem;">Exciting News!</h2>
                <p style="color: #666; margin-bottom: 1rem;">We are thrilled to announce that a new product has arrived. Check it out now!</p>
                <a href="http://localhost:5173/products" style="text-decoration:none; background-color: #3490dc; color: #fff; padding: 0.5rem 1rem; border-radius: 0.25rem; display: block; text-align: center;"> Explore Now</a>
              </div>`);
            }
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Cant Send Mail"
            })
        }
        // Return the new Product and a success message
        return res.status(200).json({
            success: true,
            data: newProduct,
            message: "Product Created Successfully",
        });

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "server error"
        })
    }
}