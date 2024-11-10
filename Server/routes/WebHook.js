const express = require("express");
const User = require("../models/User");
const Order = require("../models/Order");
const mailsender = require("../utils/mailsender");

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

      const ourneworder = await Order.create({
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
    }
    res.send();
  }
);

module.exports = router;
