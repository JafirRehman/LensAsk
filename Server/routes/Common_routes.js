const express=require('express')

const {subscriber, GetAllProducts}=require('../handlers/Common_handlers')


const router = express.Router()

router.get("/getallproducts", GetAllProducts)
router.post("/subscribe", subscriber)

module.exports = router