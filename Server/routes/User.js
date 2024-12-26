const express = require("express");
// import handlers
const { userDetails } = require("../Controllers/User");

const router = express.Router();

router.get("/userdetails", userDetails);

module.exports = router;
