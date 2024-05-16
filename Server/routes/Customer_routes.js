const express=require('express')

const {getUserOrders,createOrder,addToCart,removeFromCart,getCart}=require('../handlers/Customer_handlers')

const router = express.Router()

router.post("/addtocart", addToCart)
router.post("/removefromcart", removeFromCart)
router.get("/getcart", getCart)
router.post("/createorder", createOrder)
router.get("/getuserorders", getUserOrders)

module.exports = router