const User = require("../models/User"); // import your User model
const Order = require("../models/Order");
const { mailsender } = require("../utils/mailsender");
const validator = require("validator");

require("dotenv").config();

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.cartsession = async (req, res) => {
  const { id } = req.user;
  try {
    //get user cart
    const user = await User.findById(id).populate("cart.product");
    //validate
    if (!user) {
      throw new Error("User not found");
    }
    const usercart = user.cart.map((item) => {
      return {
        price_data: {
          currency: "pkr",
          product_data: {
            name: item.product.title,
            images: [item.product.image],
          },
          unit_amount: item.product.price * 100,
        },
        quantity: item.quantity,
      };
    });
    const session = await stripe.checkout.sessions.create({
      submit_type: "pay",
      payment_method_types: ["card"],
      line_items: usercart,
      billing_address_collection: "auto",
      mode: "payment",
      client_reference_id: id,
      success_url: `${process.env.FRONTEND_BASE_URL}/success`,
      cancel_url: `${process.env.FRONTEND_BASE_URL}/cancel`,
    });
    //return session id
    return res.status(200).json({
      success: true,
      id: session.id,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Server error",
    });
  }
};

//get orders of user
exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userid: req.user.id })
      .sort({ createdAt: -1 })
      .populate("products.product");
    return res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Add to cart
exports.addToCart = async (req, res) => {
  const { productId } = req.body;
  const { id } = req.user;
  try {
    const user = await User.findById(id);
    if (!user) {
      throw new Error("User not found!");
    }
    const productInCart = user.cart.find(
      (item) => item.product.toString() === productId
    );
    //push product in cart
    if (productInCart) {
      productInCart.quantity += 1;
    } else {
      user.cart.push({ product: productId, quantity: 1 });
    }
    await user.save();

    const updatedUser = await User.findById(id).populate("cart.product");
    updatedUser.password = undefined;

    return res.status(200).json({
      success: true,
      message: "Product Added Successfully!",
      existeduser: updatedUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// remove from cart
exports.removeFromCart = async (req, res) => {
  const { productId } = req.body;
  const { id } = req.user;
  //const trimproid = productId.trim();
  try {
    const user = await User.findByIdAndUpdate(
      id,
      {
        $pull: { cart: { product: productId } },
      },
      { new: true }
    ).populate("cart.product");

    if (!user) {
      throw new Error("User not found!");
    }

    return res.status(200).json({
      success: true,
      message: "Product removed Successfully!",
      existeduser: user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// reduce quantity
exports.reduceQuantity = async (req, res) => {
  const { productId } = req.body;
  const { id } = req.user;

  try {
    // Find the user and the product in the cart
    const user = await User.findOne({ _id: id });

    if (!user) {
      throw new Error("User not found");
    }
    // Find the cart item
    const item = user.cart.find(
      (item) => item.product.toString() === productId
    );

    if (item.quantity > 1) {
      item.quantity -= 1;
      await user.save();
    } else {
      user.cart.pull({ product: productId });
      await user.save();
    }

    //get updated User
    const updatedUser = await User.findById(id).populate("cart.product");

    return res.status(200).json({
      success: true,
      existeduser: updatedUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ------------------------------------------------------------------------------------------>
//create order
exports.createOrder = async (req, res) => {
  const { receiverName, email, address, phoneNumber } = req.body;
  const { id } = req.user;
  try {
    const user = await User.findById(id).populate("cart.product");
    const totalPrice = user.cart.reduce(
      (previous, item) =>
        previous + parseInt(item.product.price) * item.quantity,
      0
    );
    //validate data
    if (!receiverName || !email || !address || !phoneNumber) {
      throw new Error("All fields are required!");
    }
    //validate number
    if (!validator.isMobilePhone(phoneNumber)) {
      throw new Error("Invalid phone number!");
    }
    //create order
    const ourneworder = await Order.create({
      userid: id,
      receiverName,
      email,
      address,
      phoneNumber,
      totalPrice,
      products: user.cart,
    });
    //send order confirmation mail to user
    try {
      await mailsender(
        ourneworder.email,
        "Order Confirmation",
        `<div style="max-width: 32rem; margin: 0 auto; padding: 1rem; background-color: #ffffff; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); border-radius: 0.5rem; color: #374151;">
                <h1 style="font-size: 1.25rem; font-weight: 700; color: #374151;">Order Confirmation</h1>
                <p style="font-size: 0.875rem; color: #6B7280; margin-top: 0.5rem;">Hi ${ourneworder.receiverName},</p>
                <p style="font-size: 0.875rem; color: #6B7280; margin-top: 0.5rem;">Thank you for your order. We are happy to confirm that your order has been received and is being processed.</p>
                <div style="margin-top: 1rem;">
                    <p style="font-size: 0.875rem; color: #6B7280;">Order Details:</p>
                    <ul style="font-size: 0.875rem; color: #6B7280; list-style-type: disc; list-style-position: inside; margin-top: 0.5rem;">
                        <li>Order ID: ${ourneworder._id}</li>
                        <li>Address: ${ourneworder.address}</li>
                        <li>Total: Rs.${ourneworder.totalPrice}</li>
                    </ul>
                </div>
                <p style="font-size: 0.875rem; color: #6B7280; margin-top: 1rem;">You will receive a shipping confirmation email once your order has been dispatched.</p>
                <p style="font-size: 0.875rem; color: #6B7280; margin-top: 1rem;">Thank you for shopping with us!</p>
                <p style="font-size: 0.875rem; color: #6B7280; margin-top: 0.5rem;">Best Regards,</p>
                <p style="font-size: 0.875rem; color: #6B7280;">LensAsk</p>
            </div>`
      );
    } catch (error) {
      console.error(error.message);
    }
    //update user cart
    const existeduser = await User.findByIdAndUpdate(
      id,
      { $set: { cart: [] } },
      { new: true }
    ).populate("cart.product");

    //return response
    return res.status(200).json({
      success: true,
      message: "Order Created Successfully!",
      existeduser,
      order: ourneworder,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
//get cart of user
exports.getCart = async (req, res) => {
  const { id } = req.user;

  try {
    const user = await User.findById(id).populate("cart.product");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      cart: user.cart,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
