const express = require("express")
const router = express.Router()
const { userMiddleware } = require("../middlewares/auth.middleware")
const { userProfile } = require("../controllers/user.controller")

router.get("/profile", userMiddleware, userProfile)

module.exports = router