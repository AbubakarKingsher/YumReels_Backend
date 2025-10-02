const foodPartnerModel = require("../models/foodPartner.model")
const jwt = require("jsonwebtoken")
const userModel = require("../models/user.model")

const foodPartnerMiddleware = async (req, res, next) => {
    const token = req.cookies.token

    if (!token) return res.status(401).json({ message: "Please login first" })


    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const foodPartner = await foodPartnerModel.findById(decoded.id)

        if (!foodPartner) {
            return res.status(404).json({ message: "Account not found" });
        }

        req.foodPartner = foodPartner
        next()

    } catch (err) {
        res.status(401).json({ message: "Invalid token" })
    }

}

const userMiddleware = async (req, res, next) => {
    const token = req.cookies.token

    if (!token) return res.status(401).json({ message: "Please login first" })

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await userModel.findById(decoded.id)

        req.user = user
        next()

    } catch (err) {
        res.status(401).json({ message: "Invalid token" })
    }

}

module.exports = { foodPartnerMiddleware, userMiddleware }