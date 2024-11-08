const User = require("../models/User");
const bcrypt = require("bcrypt");
require("dotenv").config();
const jwt = require("jsonwebtoken");

// LOGIN
exports.login = async (req, res) => {
  try {
    //get the data
    const { email, password } = req.body;
    //validate
    if (!email || !password) {
      throw new Error("All fields are required!");
    }
    //check user already exist
    const existeduser = await User.findOne({ email }).populate("cart.product");
    if (!existeduser) {
      throw new Error("User not found!");
    }
    //check password match with hasspassword
    if (await bcrypt.compare(password, existeduser.password)) {
      //create jwt token
      const token = jwt.sign(
        {
          email: existeduser.email,
          id: existeduser._id,
          role: existeduser.role,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "24h",
        }
      );
      //set that token in user object and set password to undefined
      existeduser.password = undefined;
      //create options for cookie
      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
        sameSite: "none",
        secure: true,
        path: "/",
      };
      res.cookie("token", token, options);
      //return res
      return res.status(200).json({
        success: true,
        message: "Login Successfull!",
        existeduser,
      });
    } else {
      throw new Error("Wrong Password!");
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
//logout
exports.logout = (req, res) => {
  try {
    // Clear the cookie that's holding the JWT
    res.clearCookie("token");

    // Return a successful response
    return res.status(200).json({
      success: true,
      message: "Logged out Successfully!",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
//signup
exports.signup = async (req, res) => {
  try {
    //get the data
    const { name, email, password, role } = req.body;
    //validate the data
    if (!name || !password || !email) {
      throw new Error("All fields are required!");
    }
    //check if email already exist in USER
    const findinguser = await User.findOne({ email });
    if (findinguser) {
      throw new Error("User already exist with this email!");
    }
    //secure the password
    const hashedPassword = await bcrypt.hash(password, 10);
    //role of user
    let userrole;
    if (role) {
      userrole = role;
    } else {
      userrole = "Customer";
    }
    //create new USER
    const ournewuser = await User.create({
      name,
      email,
      password: hashedPassword,
      image: `https://api.dicebear.com/6.x/initials/svg?seed=${name}&backgroundColor=00897b,00acc1,039be5,1e88e5,3949ab,43a047,5e35b1,7cb342,8e24aa,c0ca33,d81b60,e53935,f4511e,fb8c00,fdd835,ffb300,ffd5dc,ffdfbf,c0aede,d1d4f9,b6e3f4&backgroundType=solid,gradientLinear&backgroundRotation=0,360,-350,-340,-330,-320&fontFamily=Arial&fontWeight=600`,
      role: userrole,
    });
    //return response
    return res.status(200).json({
      success: true,
      message: "User Created Successfully!",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
