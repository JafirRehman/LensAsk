const express=require('express')

const {GetAllProducts}=require('../handlers/Common_handlers')


const router = express.Router()

router.get("/getallproducts", GetAllProducts)


module.exports = router