const express = require("express")
const { getAllProduct, getProductDetails, getCategoryProduct } = require("../controllers/productController")
const router = express.Router()

router.route("/getAllProducts").get(getAllProduct)
router.route("/getCategoryProduct").get(getCategoryProduct)
router.route("/productDetail/:id").get(getProductDetails)

module.exports = router
