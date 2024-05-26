const express=require('express')

const {cartsession,reduceQuantity,getUserOrders,createOrder,addToCart,removeFromCart,getCart}=require('../handlers/Customer_handlers')

const router = express.Router()

router.post("/addtocart", addToCart)
router.post("/removefromcart", removeFromCart)
router.post("/reducequantity", reduceQuantity)
router.get("/getcart", getCart)
router.post("/createorder", createOrder)
router.get("/getuserorders", getUserOrders)
router.post("/cartsession",cartsession )


module.exports = router