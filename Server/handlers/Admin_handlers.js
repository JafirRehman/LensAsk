require("dotenv").config();
const { FOLDER_NAME } = process.env;

const Order = require("../models/Order");
const Product = require("../models/Product");

const { filesendtocloudinary } = require('../utils/filesendtocloudinary')

// get all orders
exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find({}).sort({ createdAt: -1 }).populate('products');
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
        // Return the new course and a success message
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