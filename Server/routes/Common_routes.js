const express = require("express");

const {
  Subscriberroute,
  GetAllProducts,
  GetProductById,
} = require("../handlers/Common_handlers");

const router = express.Router();

router.get("/getallproducts", GetAllProducts);
router.get("/getproduct/:id", GetProductById);
router.post("/subscribe", Subscriberroute);

module.exports = router;
