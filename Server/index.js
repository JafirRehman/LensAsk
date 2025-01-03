const express = require("express");
const fileUpload = require("express-fileupload");

const connectDB = require("./config/database");
const { cloudinaryConnect } = require("./config/cloudinary");

const OnlyAdmin_routes = require("./routes/OnlyAdmin");
const Public_routes = require("./routes/Public");
const Auth_routes = require("./routes/Auth");
const OnlyCustomer_routes = require("./routes/OnlyCustomers");
const User_routes = require("./routes/User");
const WebHook_route = require("./routes/WebHook");

const { auth, isCustomer, isAdmin } = require("./middlewares/Auth_middlewares");

const cookieParser = require("cookie-parser");
const cors = require("cors");

require("dotenv").config();

const app = express();
// Connet database and cloudinary
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

// Use webhook route
app.use("/webhook", WebHook_route);

// Use JSON middleware for all other routes
app.use(express.json());

app.use("/admin", auth, isAdmin, OnlyAdmin_routes);
app.use("/common", Public_routes);
app.use("/auth", Auth_routes);
app.use("/authCommon", auth, User_routes);
app.use("/customer", auth, isCustomer, OnlyCustomer_routes);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`App is running at ${PORT}`);
});
