const catchAsyncError = require("../middleware/catchAsyncError");
const Product = require("../models/Product")
const ErrorHandlar = require("../utils/ErrorHandler")

// Get all products
exports.getAllProduct = catchAsyncError(async (req, res, next) => {
    try {
         const { name, description, minPrice, maxPrice, rating, category, numOfReviews, createAt, sort } = req.query;
        const urlQuery = {}

        if (name) urlQuery.name = { $regex: name, $options: 'i' }
        if (description) urlQuery.description = { $regex: description, $options: 'i' }
        if (category) urlQuery.category = { $regex: category, $options: 'i' }
        if (rating) urlQuery.rating = { "$gte": rating }

        if (maxPrice && minPrice) {
            urlQuery.price = { "$gte": minPrice, "$lte": maxPrice }
        }

        let myQuery = Product.find(urlQuery)

        if (sort) {
            const sortFix = sort.split(",").join(" ")
            myQuery = myQuery.sort(sortFix)
        }

        let page = Number(req.query.pageNo) || 1
        let limit = Number(req.query.limit) || 10

        let skip = (page - 1) * limit

        myQuery = myQuery.skip(skip).limit(limit)

        const getAllProduct = await myQuery
        const totalProduct = await Product.find({}).countDocuments()

        res.status(200).json({ data: getAllProduct, totalProduct })

        next()
    } catch (err) {
        return next(ErrorHandlar("Product not found", 404))
    }

})

// Get a single product details
exports.getProductDetails = catchAsyncError( async (req, res, next) => {
    try{
        const product = await Product.findById(req.params.id)
        console.log(req.params.id)

        if(!product) {
            return next(new ErrorHandlar("Product Not Found", 404))
        }
        res.status(200).json({success: true, product})
next()
    }
    catch (error) {
        return next(new ErrorHandlar(error.message, 500));
      }
})

exports.createProduct = catchAsyncError(async (req, res, next) => {
    try{
        const product = await Product.create(req.body)
        res.status(200).json({success: true, product})
        next()
    } catch (error) {
        return next(new ErrorHandlar(error.message, 500));
      }
})



const techs = [
    "laptops",
    "smartphones",
    "lighting",
"motorcycle",
"sunglasses",
]

const others = ["automotive",
"fragrances",
"furniture",
"groceries",
"home-decoration",
"skincare",
"tops"]

const mens = ["men's clothing",
"mens-shirts",
"mens-shoes",
"mens-watches"]

const womens = [  "women's clothing",
"womens-bags",
"womens-dresses",
"womens-jewellery",
"womens-shoes",
"womens-watches"]


exports.getCategoryProduct = catchAsyncError( async (req, res)=> {
    try{
       let myProductCategory = {}
   
   
       
       let mensProduct = []
       for (let men of mens){
           let myproduct = await Product.find({category:men})
               for (let myPct of myproduct){
                   mensProduct.push(myPct)
               }
       }
       let womensProduct = []
       for (let women of womens){
           let myproduct = await Product.find({category:women})
           for (let myPct of myproduct){
               womensProduct.push(myPct)
   
           }
       }
       let techProduct = []
       for (let tech of techs){
           let myproduct = await Product.find({category:tech})
           for (let myPct of myproduct){
               techProduct.push(myPct)
   
           }
       }
       let otherProduct = []
       for (let other of others){
           let myproduct = await Product.find({category:other})
           for (let myPct of myproduct){
               otherProduct.push(myPct)
   
           }
       }
       myProductCategory = {mensProduct, womensProduct, techProduct, otherProduct}  
   
   
   
   
       res.json({ mensResult: mensProduct.length, womensResult: womensProduct.length,techResult: techProduct.length,otherResult: otherProduct.length,status:"done", myProductCategory})
       // res.json({status:"ok", mensProduct, womensProduct}) 
   }
   catch (error) {
    return next(ErrorHandlar(error.message, 400))
}
   
   })
   
   