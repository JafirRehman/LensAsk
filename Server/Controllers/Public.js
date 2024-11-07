const Subscriber = require("../models/Subscriber");
const Product = require("../models/Product");
const mongoose = require("mongoose");

//subscribe
exports.Subscriberroute = async (req, res) => {
  const { email } = req.body;
  try {
    const findsubcriber = await Subscriber.findOne({ email });
    if (findsubcriber) {
      throw new Error("Already Subscribed!");
    }

    await Subscriber.create({ email });

    return res.status(200).json({
      success: true,
      message: "Subscribed Successfully",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//getAllProducts
exports.GetAllProducts = async (req, res) => {
  try {
    const allProducts = await Product.find({}).sort({ createdAt: -1 });
    //return response
    return res.status(200).json({
      success: true,
      data: allProducts,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

//getProductById
exports.GetProductById = async (req, res) => {
  try {
    const productId = req.params.id;
    if (!mongoose.isValidObjectId(productId)) {
      throw new Error("Invalid Product Id!");
    }
    const product = await Product.findById(productId);
    if (!product) {
      throw new Error("Product not found!");
    }
    return res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
