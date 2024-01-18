const express = require("express") 
const { addToCart, getAllCart, updateCart, deleteCart } = require("../controllers/cartController")
const router = express.Router()
const { isAuthenticate } = require("../middleware/auth")


router.route("/addToCart").put(isAuthenticate,addToCart)
router.route("/getAllCart").get(isAuthenticate, getAllCart)
router.route("/updateCart/:id").post(isAuthenticate, updateCart)
router.route("/deleteCart/:id").delete(isAuthenticate, deleteCart)


module.exports = router