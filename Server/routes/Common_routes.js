
const express=require('express')

const {Subscriberroute, GetAllProducts}=require('../handlers/Common_handlers')

const router = express.Router()

router.get("/getallproducts", GetAllProducts)
router.post("/subscribe", Subscriberroute)

module.exports = router