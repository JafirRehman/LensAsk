const User = require("../models/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// This middleware is used to check if user is authenticated or not
exports.auth = async (req, res, next) => {
  try {
    const token = await req.cookies.token;

    if (!token) {
      throw new Error("Login First!");
    }
    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decode;
    } catch (error) {
      throw new Error("Invalid Token!");
    }
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

// This middleware is used to check if user is customer or not
exports.isCustomer = async (req, res, next) => {
  try {
    const userDetails = await User.findOne({ email: req.user.email });
    if (userDetails.role !== "Customer") {
      throw new Error("Protected Route for customers");
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// This middleware is used to check if user is admin or not
exports.isAdmin = async (req, res, next) => {
  try {
    const userDetails = await User.findOne({ email: req.user.email });
    if (userDetails.role !== "Admin") {
      throw new Error("Protected Route for Admin");
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
