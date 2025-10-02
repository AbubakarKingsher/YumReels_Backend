const app = require("./src/app")

app.listen(3000, (err) => {
    if (err) return console.log("PORT: NOT CONNECTED")
})