const userModel = require("../models/user.model");

const userProfile = async (req, res) => {
    const userData = await userModel.findOne({ _id: req.user._id })
    res.json(userData)
}

module.exports = {
    userProfile
}