const express = require("express");
const fileUpload = require("express-fileupload");
//connections for db and cloudinary
const connectDB = require("./config/database");
const { cloudinaryConnect } = require("./config/cloudinary");

const User = require("./models/User");
const Order = require("./models/Order");

const OnlyAdmin_routes = require("./routes/OnlyAdmin");
const Public_routes = require("./routes/Public");
const Auth_routes = require("./routes/Auth");
const OnlyCustomer_routes = require("./routes/OnlyCustomers");
const User_routes = require("./routes/User");

const { auth, isCustomer, isAdmin } = require("./middlewares/Auth_middlewares");

const cookieParser = require("cookie-parser");
const cors = require("cors");

require("dotenv").config();

const app = express();
// Connecting to database and cloudinary
connectDB();
cloudinaryConnect();
// Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);
const corsOptions = {
  origin: true,
  optionsSuccessStatus: 200,
  credentials: true,
};
app.use(cors(corsOptions));
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// Webhook
app.post(
  "/webhook",
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

app.use(express.json());
// Testing the server

app.use("/admin", auth, isAdmin, OnlyAdmin_routes);
app.use("/common", Public_routes);
app.use("/auth", Auth_routes);
app.use("/authCommon", auth, User_routes);
app.use("/customer", auth, isCustomer, OnlyCustomer_routes);

// Setting up port number
const PORT = process.env.PORT;

// Listening to the server
app.listen(PORT, () => {
  console.log(`App is running at ${PORT}`);
});
