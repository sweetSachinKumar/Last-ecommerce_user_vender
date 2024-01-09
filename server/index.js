const express = require("express")
const app = express()
const port = process.env.PORT || 4000

app.get("/", (req, res) => {
    res.send("this is sachin")
})

app.listen(port, ()=> console.log("this is running on port: ",port))