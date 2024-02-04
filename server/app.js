const express = require("express")
const app = express()
const ErrorHandler = require("./middleware/error")
const cookieParser = require("cookie-parser")
const bodyParser = require("body-parser")
const cors = require("cors")

app.use(express.json({limit: '50mb'}));
app.use(cookieParser());

app.use(cors({
    origin: ['https://last-ecommerce-user-vender.vercel.app',],
    credentials: true
  }));
// app.use(cors({
//     origin: ['http://localhost:5173'],
//     credentials: true
//   }));

app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({
    limit: '50mb',
    extended: false
}))


// routes
const user = require("./routes/user")
const product = require("./routes/product")
const event = require("./routes/event")
const cart = require("./routes/cart")
const order = require("./routes/order")

app.use("/event", event)
app.use("/user", user)
app.use("/product", product)
app.use("/cart", cart)
app.use("/order", order)

app.get("/", (req, res) => {
    res.send("this is sachin kumar")
})



app.use(ErrorHandler)

module.exports = app 
