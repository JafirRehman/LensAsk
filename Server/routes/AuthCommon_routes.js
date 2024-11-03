
const express=require('express')

const {userDetails}=require('../handlers/AuthCommon_handlers')

const router = express.Router()

router.get("/userdetails", userDetails)

module.exports = router