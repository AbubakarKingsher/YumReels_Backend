const jwt = require("jsonwebtoken")

const jsonWebToken = (data) => {
    return jwt.sign({ id: data._id }, process.env.JWT_SECRET)
}

module.exports = jsonWebToken