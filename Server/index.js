const express = require("express");
const fileUpload = require("express-fileupload");
//connections for db and cloudinary
const connectDB = require("./config/database");
const { cloudinaryConnect } = require("./config/cloudinary");

const OnlyAdmin_routes = require("./routes/OnlyAdmin");
const Public_routes = require("./routes/Public");
const Auth_routes = require("./routes/Auth");
const OnlyCustomer_routes = require("./routes/OnlyCustomers");
const User_routes = require("./routes/User");

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
app.post("/webhook", express.raw({ type: "application/json" }), (req, res) => {
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

  switch (event.type) {
    case "checkout.session.completed":
      const checkoutSessionCompleted = event.data.object;
      console.log(checkoutSessionCompleted);
      // Then define and call a function to handle the event checkout.session.completed
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.send();
});
app.use(express.json());
const { auth, isCustomer, isAdmin } = require("./middlewares/Auth_middlewares");

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
