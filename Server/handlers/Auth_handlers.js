const User = require("../models/User");
const bcrypt = require("bcrypt");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const Product = require("../models/Product");
const { mailsender } = require("../utils/mailsender");
// LOGIN
exports.login = async (req, res) => {
  try {
    //get the data
    const { email, password } = req.body;
    //validate
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "all feilds are required",
      });
    }
    //check user already exist
    const existeduser = await User.findOne({ email }).populate("cart.product");
    if (!existeduser) {
      return res.status(401).json({
        success: false,
        message: "user does not exist",
      });
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
        sameSite: "lax",
      };
      res.cookie("token", token, options);
      //return res
      return res.status(200).json({
        success: true,
        message: "user login successfully",
        existeduser,
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "wrong login password",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "server error",
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
      message: "logged out successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
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
      return res.status(403).json({
        success: false,
        message: "all feilds are required",
      });
    }
    //check if email already exist in USER
    const findinguser = await User.findOne({ email });
    if (findinguser) {
      return res.status(400).json({
        success: false,
        message: "user already exist",
      });
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
    //send mail
    try {
      await mailsender(
        ournewuser.email,
        "Successful Signup",
        `<div style="max-width: 32rem; margin: 0 auto; padding: 1.5rem; background-color: #fff; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); border-radius: 0.5rem; color: #333333;">
            <h1 style="font-size: 1.25rem; font-weight: 700; color: #333333;">Welcome to our platform!</h1>
            <p style="color: #666666; margin-top: 0.5rem;">Dear ${ournewuser.name},</p>
            <p style="color: #666666; margin-top: 0.5rem;">Thank you for signing up with us. Your account has been successfully created.</p>
            <p style="color: #666666; margin-top: 0.5rem;">Feel free to explore our platform and let us know if you have any questions.</p>
            <a href="http://localhost:5173/login" style="background-color: #3490dc; text-decoration:none; color: #ffffff; padding: 0.5rem 1rem; border-radius: 0.25rem; margin-top: 1rem; display: inline-block;">Get Started</a>
            <p style="color: #666666; margin-top: 0.5rem;">Best regards,</p>
            <p style="color: #666666;">LensAsk</p>
            </div>`
      );
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Cant Send Mail",
      });
    }
    //return response
    return res.status(200).json({
      success: true,
      message: "User registered successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "server catch a issue",
    });
  }
};
