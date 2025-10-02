const express = require("express");
const app = express();

// MIDDLEWARE_REQUIRES
const cookieParser = require("cookie-parser");
const cors = require("cors");

// ROUTES_REQUIRES
const authRoutes = require("./routes/Auth.routes");
const foodRoutes = require("./routes/Food.routes");
const foodPartnerRoutes = require("./routes/FoodPartner.routes");
const userRoutes = require("./routes/User.routes");

// DATA_BASE_CONNECTION
require("./config/db");

// MIDDLEWARES
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// APIS
app.use("/api/auth", authRoutes);
app.use("/api/food", foodRoutes);
app.use("/api/foodPartner", foodPartnerRoutes);
app.use("/api/user", userRoutes);

module.exports = app;
