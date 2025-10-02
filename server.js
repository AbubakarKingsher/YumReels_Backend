const app = require("./src/app");
const winston = require("winston");

const PORT = process.env.PORT || 5000;

app.get("/favicon.ico", (req, res) => res.status(204));

app.listen(PORT, (err) => {
  if (err) return winston.error("PORT DISCONNECTED");
});
