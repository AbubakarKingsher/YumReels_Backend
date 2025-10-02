const express = require("express")
const router = express.Router()
const { userRegister, userLogin, userLogout, foodPartnerRegister, foodPartnerLogin, foodPartnerLogout } = require("../controllers/auth.controller")

router.post("/user/register", userRegister)
router.post("/user/login", userLogin)
router.get("/user/logout", userLogout)

router.post("/foodPartner/register", foodPartnerRegister)
router.post("/foodPartner/login", foodPartnerLogin)
router.get("/foodPartner/logout", foodPartnerLogout)

module.exports = router