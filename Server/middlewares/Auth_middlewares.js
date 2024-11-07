const User = require("../models/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// This middleware is used to check if user is authenticated or not
exports.auth = async (req, res, next) => {
  try {
    //get cookie
    const token = await req.cookies.token;

    // validate token
    if (!token) {
      throw new Error("Login First!");
    }
    try {
      //verify token
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      //store token to user
      req.user = decode;
    } catch (error) {
      throw new Error("Invalid Token!");
    }
    // move to next work
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
    //find user
    const userDetails = await User.findOne({ email: req.user.email });
    //validate user
    if (userDetails.role !== "Customer") {
      throw new Error("Protected Route for customers");
    }
    //move to next work
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
exports.isAdmin = async (req, res, next) => {
  try {
    //find user
    const userDetails = await User.findOne({ email: req.user.email });
    //validate user
    if (userDetails.role !== "Admin") {
      throw new Error("Protected Route for Admin");
    }
    //move to next work
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
