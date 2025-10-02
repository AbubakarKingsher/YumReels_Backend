const express = require("express")
const router = express.Router()
const { foodPartnerMiddleware, userMiddleware } = require("../middlewares/auth.middleware")
const { foodPartnerProfile, editProfile, foodPartnerPosts } = require("../controllers/foodPartner.controller")
const multer = require("multer")
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

router.get("/profile", foodPartnerMiddleware, foodPartnerProfile)
router.post("/editProfile", foodPartnerMiddleware, upload.single("picture"), editProfile)
router.get("/posts/:id", userMiddleware, foodPartnerPosts)

module.exports = router