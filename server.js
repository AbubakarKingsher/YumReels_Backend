const app = require("./src/app");
// const winston = require("winston");

// const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Hello from Vercel + Express!");
});

// app.listen(PORT, (err) => {
//   if (err) return winston.error("PORT DISCONNECTED");
// });

module.exports = app;
