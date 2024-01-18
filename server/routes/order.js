const express = require("express")  
const router = express.Router()
const { isAuthenticate, isAdmin } = require("../middleware/auth")
const { createOrder, allOrders, getAllOrders, updateOrder, getaOrder } = require("../controllers/orderController")


router.route("/createOrder").post(isAuthenticate,createOrder)

router.route("/allOrder").get(isAuthenticate, allOrders)

router.route("/singleOrder/:id").get( getaOrder)

router.route("/admin-all-orders").get(isAuthenticate, isAdmin("Admin"), getAllOrders)

router.route("/admin-update-order/:id").put(isAuthenticate, isAdmin("Admin"), updateOrder)


// router.route("/updateCart/:id").post(isAuthenticate, updateCart)
// router.route("/deleteCart/:id").delete(isAuthenticate, deleteCart)


module.exports = router