const express = require("express")
const router = express.Router()
const multer = require("multer")
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })
const { foodPartnerMiddleware, userMiddleware } = require("../middlewares/auth.middleware")
const { createFood, getFoodItems, addLikes, addBookmarks, addComments, getComments } = require("../controllers/food.controller")

router.post("/create", foodPartnerMiddleware, upload.single("video"), createFood)
router.post("/create/comments/:id", userMiddleware, addComments)
router.get("/comments/:id", userMiddleware, getComments)
router.get("/likes/:id", userMiddleware, addLikes)
router.get("/bookmarkes/:id", userMiddleware, addBookmarks)
router.get("/foodItems", userMiddleware, getFoodItems)

module.exports = router