
const Product = require('../models/Product')

//GetWomenProducts
exports.GetWomenProducts = async (req, res) => {
    try {
        const allWomenProducts = await Product.find({category:'women'});
        //return response
        return res.status(200).json({
            success: true,
            data: allWomenProducts,
        });
    } catch (error) {
        return res.status(404).json({
            success: false,
            message: "something went wrong in GetWomenProducts try block",
        });
    }
};
//GetMenProducts
exports.GetMenProducts = async (req, res) => {
    try {
        const allMenProducts = await Product.find({category:'men'});
        //return response
        return res.status(200).json({
            success: true,
            data: allMenProducts,
        });
    } catch (error) {
        return res.status(404).json({
            success: false,
            message: "something went wrong in GetMenProducts try block",
        });
    }
};


//getAllProducts
exports.GetAllProducts = async (req, res) => {
    try {
        const allProducts = await Product.find({});
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
