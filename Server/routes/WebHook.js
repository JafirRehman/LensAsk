const express = require("express");
const User = require("../models/User");
const Order = require("../models/Order");

const router = express.Router();

// Webhook
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
router.post(
  "/",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    const endpointSecret = process.env.STRIPE_SIGNING_SECRET;

    const payload = req.body;
    const sig = req.headers["stripe-signature"];

    let event;
    try {
      event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
    } catch (err) {
      res.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }
    if (event.type === "checkout.session.completed") {
      const checkoutSession = event.data.object;
      const customerAddress = checkoutSession.customer_details?.address;
      const customerName = checkoutSession.customer_details?.name;
      const customerEmail = checkoutSession.customer_details?.email;
      const id = checkoutSession.client_reference_id;
      const totalPrice = parseFloat(
        checkoutSession.amount_total / 100
      ).toString();
      const addressString = `${customerAddress.city || ""} ${
        customerAddress.line2 || ""
      } ${customerAddress.line1 || ""} ${customerAddress.country || ""}
        `.trim();

      const user = await User.findById(id).populate("cart.product");

      await Order.create({
        userid: id,
        receiverName: customerName,
        email: customerEmail,
        address: addressString,
        totalPrice: totalPrice,
        products: user.cart,
      });

      await User.findByIdAndUpdate(id, {
        $set: { cart: [] },
      });
    }
    res.send();
  }
);

module.exports = router;
