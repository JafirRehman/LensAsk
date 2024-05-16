const express=require('express')

const {signup,login,logout}=require('../handlers/Auth_handlers')

const router = express.Router()

router.post("/signup", signup)
router.post("/login", login)
router.post("/logout",logout)

module.exports = router