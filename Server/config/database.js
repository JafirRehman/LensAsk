const mongoose = require("mongoose");
require("dotenv").config();
// mongo db url
const { MONGODB_URL } = process.env;

// connect function
const connectDB = () => {
  mongoose
    .connect(MONGODB_URL)
    .then(console.log(`DB CONNECTED SUCCESSFULLY!`))
    .catch((error) => {
      console.log(`DB CONNECTION FAILED`);
      console.log(error);
      process.exit(1);
    });
};

// export connect function
module.exports = connectDB;
