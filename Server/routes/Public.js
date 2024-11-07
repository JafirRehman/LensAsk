const express = require("express");

const {
  Subscriberroute,
  GetAllProducts,
  GetProductById,
} = require("../Controllers/Public");

const router = express.Router();

router.get("/getallproducts", GetAllProducts);
router.get("/getproduct/:id", GetProductById);
router.post("/subscribe", Subscriberroute);

module.exports = router;
