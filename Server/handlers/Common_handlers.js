
const Product = require('../models/Product')

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
