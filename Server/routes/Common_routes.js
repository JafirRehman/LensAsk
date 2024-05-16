const express=require('express')

const {GetAllProducts}=require('../handlers/Common_handlers')
//const {GetMenProducts,GetWomenProducts}=require('../handlers/Common_handlers')

const router = express.Router()

router.get("/getallproducts", GetAllProducts)
//router.get("/getmenproducts", GetMenProducts)
//router.get("/getwomenproducts", GetWomenProducts)

module.exports = router