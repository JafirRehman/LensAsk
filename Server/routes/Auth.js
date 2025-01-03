const express = require("express");
// import handlers
const { signup, login, logout } = require("../Controllers/Auth");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

module.exports = router;
