require("dotenv").config();
const mongoose = require("mongoose");
const winston = require("winston");

mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => winston.info("✅ MongoDB Atlas Connected!"))
  .catch((err) => winston.error("❌ Connection Error:", err));

module.exports = mongoose.connection;
