const express = require("express");
// import handlers
const { getAllOrders, createProduct } = require("../Controllers/OnlyAdmin");

const router = express.Router();

router.post("/createproduct", createProduct);
router.get("/getallorders", getAllOrders);

module.exports = router;
