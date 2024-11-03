const Subscriber = require("../models/Subscriber");
const Product = require("../models/Product");

//subscribe
exports.Subscriberroute = async (req, res) => {
  const { email } = req.body;
  try {
    const findsubcriber = await Subscriber.findOne({ email });
    if (findsubcriber) {
      return res.status(400).json({
        success: false,
        message: "User Already Registered!",
      });
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
      message: "Server error",
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
      message: "something went wrong in GetAllProducts try block",
    });
  }
};

//getProductById
exports.GetProductById = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    return res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "something went wrong in GetProductById try block",
    });
  }
};
