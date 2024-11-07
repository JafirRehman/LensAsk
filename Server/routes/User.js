const express = require("express");

const { userDetails } = require("../Controllers/User");

const router = express.Router();

router.get("/userdetails", userDetails);

module.exports = router;
