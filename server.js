const app = require("./src/app");
const express = require("express")
const winston = require("winston");

app.use(express.json());

const PORT = process.env.PORT || 5000;

app.listen(PORT, (err) => {
  if (err) return winston.error("PORT DISCONNECTED");
});
