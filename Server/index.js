const express = require("express");
const fileUpload = require("express-fileupload");
//connections for db and cloudinary
const connectDB = require("./config/database");
const { cloudinaryConnect } = require("./config/cloudinary");

const cookieParser = require("cookie-parser");
const cors = require("cors");

const Admin_routes = require("./routes/Admin_routes");
const Common_routes = require("./routes/Common_routes");
const Auth_routes = require("./routes/Auth_routes");
const Customer_routes = require("./routes/Customer_routes");
const AuthCommon_routes = require("./routes/AuthCommon_routes");

require("dotenv").config();

const app = express();
// Connecting to database and cloudinary
connectDB();
cloudinaryConnect();

// Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
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

const { auth, isCustomer, isAdmin } = require("./middlewares/Auth_middlewares");

// Testing the server

app.use("/admin", auth, isAdmin, Admin_routes);
app.use("/common", Common_routes);
app.use("/Auth", Auth_routes);
app.use("/AuthCommon", auth, AuthCommon_routes);
app.use("/customer", auth, isCustomer, Customer_routes);

// Setting up port number
const PORT = process.env.PORT;

// Listening to the server
app.listen(PORT, () => {
  console.log(`App is running at ${PORT}`);
});
