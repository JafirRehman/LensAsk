const express = require("express");

const {
  getAllOrders,
  createProduct,
  DeleteProduct,
} = require("../handlers/Admin_handlers");

const router = express.Router();

router.post("/createproduct", createProduct);
router.get("/getallorders", getAllOrders);

module.exports = router;
