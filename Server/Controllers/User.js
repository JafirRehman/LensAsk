const User = require("../models/User");
//get user details
exports.userDetails = async (req, res) => {
  const { id } = req.user;
  try {
    const finduser = await User.findById(id).populate("cart.product");
    if (!finduser) {
      throw new Error("User not found!");
    }

    return res.status(200).json({
      success: true,
      existeduser: finduser,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
